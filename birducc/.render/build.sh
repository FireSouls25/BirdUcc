#!/bin/bash

echo "=== Entrando al directorio del proyecto ==="
cd /app/birducc

echo "=== Iniciando build con Maven ==="
./mvnw clean package -DskipTests

echo "=== Verificando versión de Java ==="
java -version

echo "=== Ejecutando la aplicación ==="
java -Dserver.port=$PORT -jar target/*.jar
