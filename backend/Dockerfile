# Usar uma imagem mais leve do Python
FROM python:3.9-slim

# Definir diretório de trabalho no container
WORKDIR /app

# Instalar Netcat e remover arquivos desnecessários
RUN apt-get update && apt-get install -y netcat-openbsd \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Copiar apenas o arquivo de dependências primeiro (para melhor cache)
COPY requirements.txt .

# Instalar as dependências do Python
RUN pip install --no-cache-dir -r requirements.txt

# Criar um usuário não root para rodar a aplicação
RUN useradd -m appuser
USER appuser

# Copiar o restante do código
COPY . .

# Expor a porta do FastAPI
EXPOSE 8000

# Comando de execução
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
