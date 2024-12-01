# Usar a imagem base do Node.js
FROM node:22-alpine

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar todo o código do projeto
COPY . .

# Expor a porta padrão do servidor Angular
EXPOSE 4200 49153

# Rodar o servidor de desenvolvimento do Angular
CMD ["npm", "start"]
