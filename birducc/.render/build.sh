#!/bin/bash

echo "=== Iniciando build con Maven ==="
mvn clean package

echo "=== Verificando versión de Java ==="
java -version
