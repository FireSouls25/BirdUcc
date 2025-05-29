#!/bin/bash

set -e  # Detiene el script si ocurre un error

echo "=== Entrando al directorio del proyecto ==="
cd birducc

echo "=== Iniciando build con Maven ==="
./mvnw clean package -DskipTests

echo "=== Verificando versión de Java ==="
java -version

echo "=== Ejecutando la aplicación ==="
java -jar target/*.jar
