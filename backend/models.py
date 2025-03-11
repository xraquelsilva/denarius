from typing import List, Optional
from pydantic import BaseModel

class UserRegister(BaseModel):
    name: str
    email: str
    password: str  # Somente para o registro, não para as informações do usuário

class User(BaseModel):
    id: int
    name: str
    email: str
    xp: int
    coin: int



class LoginRequest(BaseModel):
    email: str
    password: str

class Tag(BaseModel):
    name: str
    color: str
    background: str

class Module(BaseModel):
    id: int
    title: str
    description: str
    imageSrc: str
    backgroundColor: str
    textColorTitle: str
    textColor: str
    tags: Optional[List[Tag]]  # Nova coluna adicionada

class Option(BaseModel):
    text: str

class Question(BaseModel):
    id: Optional[int]
    question: str
    module_id: int
    correct_answer: int
    options: List[Option]  # Lista de opções associadas à pergunta
    image: str

class Config:
    orm_mode = True

class ModuleStatusRequest(BaseModel):
    userId: int
    moduleId: int