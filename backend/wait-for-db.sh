#!/bin/sh

echo "Aguardando o banco de dados..."

# Loop para verificar se o banco está pronto antes de iniciar o backend
while ! nc -z $MYSQL_HOST 3306; do
  sleep 1
done

echo "Banco de dados disponível. Iniciando o backend..."
exec "$@"
