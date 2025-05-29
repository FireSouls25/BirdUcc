#!/bin/bash

# Da permisos de ejecución al wrapper de Maven
chmod +x ./mvnw

# Usa Java 17 proporcionado por Render
export JAVA_HOME=$JAVA17_HOME

# Ejecuta la build
./mvnw clean package
