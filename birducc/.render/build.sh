#!/bin/bash

echo "=== Entrando al directorio del proyecto ==="
cd /app/birducc

echo "=== Iniciando build con Maven ==="
./mvnw clean package

echo "=== Verificando versión de Java ==="
java -version
