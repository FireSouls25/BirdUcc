#!/bin/bash
set -e
echo "=== Entrando al directorio del proyecto ==="
cd /app

echo "=== Iniciando build con Maven ==="
./mvnw clean package -DskipTests

echo "=== Verificando versión de Java ==="
java -version

echo "=== Ejecutando la aplicación ==="
java -jar target/*.jar
