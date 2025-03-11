import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from passlib.context import CryptContext
import jwt
from datetime import datetime, timedelta
import traceback
from typing import List
from database import get_db_connection
from models import User, LoginRequest, Module, UserRegister

# Criando a instância FastAPI
app = FastAPI()

# Configuração de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configurações para hash de senha
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Configuração do segredo para gerar JWT
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Função para gerar o token JWT
def create_access_token(data: dict, expires_delta: timedelta = None):
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode = {**data, "exp": expire}
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# Função para verificar a senha
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# 🔹 Rota de Login
@app.post("/login")
async def login(request: LoginRequest):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute("SELECT * FROM users WHERE email = %s", (request.email,))
        user = cursor.fetchone()

        if not user or not verify_password(request.password, user["password"]):
            raise HTTPException(status_code=401, detail="Invalid credentials")

        access_token = create_access_token(data={"sub": user["email"]})

        cursor.close()
        connection.close()

        return {
            "message": "Login successful",
            "access_token": access_token,
            "user_id": user["id"]  # 🔹 Retornando o ID do usuário
        }

    except Exception as e:
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))

# 🔹 Rota de Registro de Usuário
@app.post("/register")
async def register(user: UserRegister):
    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        # Verifica se o e-mail já está cadastrado
        cursor.execute("SELECT * FROM users WHERE email = %s", (user.email,))
        if cursor.fetchone():
            raise HTTPException(status_code=400, detail="Email already registered")

        # Hash da senha
        hashed_password = pwd_context.hash(user.password)

        # Inserindo novo usuário
        cursor.execute("INSERT INTO users (name, email, password, xp, coin) VALUES (%s, %s, %s, %s, %s)",
                       (user.name, user.email, hashed_password, 0, 0))  # xp e coin podem ser 0 inicialmente
        user_id = cursor.lastrowid  # Obtém o ID do novo usuário

        cursor = connection.cursor(dictionary=True)  # Habilita retorno como dicionário
        cursor.execute("SELECT id FROM modules")
        modules = cursor.fetchall()

        # Inserir módulos na tabela user_modules
        for module in modules:
            module_id = module["id"]
            status = "disponivel" if module_id == 1 else "bloqueado"

            cursor.execute("INSERT INTO user_modules (user_id, module_id, status) VALUES (%s, %s, %s)",
                           (user_id, module_id, status))

        # Confirmar as operações no banco
        connection.commit()
        cursor.close()
        connection.close()

        # 🔹 Gerar token JWT para autenticação automática após o registro
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        token_data = {"sub": str(user_id), "exp": expire}
        token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)

        # 🔹 Retornar userId e token
        return {"message": "User registered successfully", "userId": user_id, "token": token}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 🔹 Rota para Buscar os Módulos
@app.get("/modules", response_model=List[Module])
async def get_modules():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        
        cursor.execute("SELECT * FROM modules")
        modules = cursor.fetchall()

        # Converter JSON de tags para lista de objetos
        for module in modules:
            module["tags"] = json.loads(module["tags"]) if module["tags"] else []

        cursor.close()
        connection.close()
        
        return modules
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/modules/user/{user_id}")
async def get_user_modules(user_id: int):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        query = """
        SELECT m.*, um.status 
        FROM modules m
        JOIN user_modules um ON m.id = um.module_id
        WHERE um.user_id = %s
        """
        cursor.execute(query, (user_id,))
        modules = cursor.fetchall()

        cursor.close()
        connection.close()

        return modules
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/user/{user_id}")
async def get_user(user_id: int):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        
        cursor.execute("SELECT id, name, email FROM users WHERE id = %s", (user_id,))  # <-- Aqui pode estar o erro
        user = cursor.fetchone()

        if not user:
            raise HTTPException(status_code=404, detail="Usuário não encontrado")
        
        return user
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/modules/{module_id}/questions")
async def get_questions_by_module(module_id: int):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        # Buscar perguntas do módulo
        cursor.execute("SELECT * FROM questions WHERE module_id = %s", (module_id,))
        questions = cursor.fetchall()

        # Para cada pergunta, buscar suas opções
        for question in questions:
            cursor.execute("SELECT * FROM options WHERE question_id = %s", (question["id"],))
            options = cursor.fetchall()
            question["options"] = [{"text": option["text"]} for option in options]

        cursor.close()
        connection.close()

        return questions

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

from pydantic import BaseModel

# Definindo um modelo Pydantic para os dados de entrada
class UnlockModuleRequest(BaseModel):
    user_id: int
    module_id: int

@app.post("/unlockModule")
async def unlock_module(request: UnlockModuleRequest):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute("SELECT status FROM user_modules WHERE user_id = %s AND module_id = %s", (request.user_id, request.module_id))
        module = cursor.fetchone()

        if not module:
            raise HTTPException(status_code=404, detail="Módulo não encontrado")

        if module["status"] == "bloqueado":
            cursor.execute("UPDATE user_modules SET status = 'disponivel' WHERE user_id = %s AND module_id = %s", (request.user_id, request.module_id))
            connection.commit()
            return {"success": True}

        return {"success": False, "message": "Módulo já desbloqueado"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        connection.close()



@app.get("/checkModuleStatus")
async def check_module_status(userId: int, moduleId: int):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        # Verifica se o módulo está bloqueado ou disponível
        cursor.execute("SELECT status FROM user_modules WHERE user_id = %s AND module_id = %s", (userId, moduleId))
        module = cursor.fetchone()

        if not module:
            raise HTTPException(status_code=404, detail="Módulo não encontrado")

        return module["status"]  # Retorna "bloqueado" ou "disponivel"
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/updateUserProgress")
async def update_user_progress(user_id: int, xp: int, coin: int):
    print(f"Updating user {user_id} with xp={xp} and coin={coin}")  # Log para depuração
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute("UPDATE users SET xp = xp + %s, coin = coin + %s WHERE id = %s", (xp, coin, user_id))
        connection.commit()

        return {"success": True}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/users", response_model=List[User])
async def get_all_users():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        
        cursor.execute("SELECT id, name, email, xp, coin FROM users")
        users = cursor.fetchall()

        cursor.close()
        connection.close()

        return users
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@app.get("/module_status/{user_id}/{module_id}")
async def get_module_status(user_id: int, module_id: int):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        # Consulta para verificar o status do módulo para o usuário
        cursor.execute("""
            SELECT status FROM user_modules 
            WHERE user_id = %s AND module_id = %s
        """, (user_id, module_id))
        module = cursor.fetchone()

        # Verifica se o módulo existe para o usuário
        if not module:
            raise HTTPException(status_code=404, detail="Module not found for this user")

        # Retorna o status do módulo
        return {"user_id": user_id, "module_id": module_id, "status": module["status"]}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        connection.close()