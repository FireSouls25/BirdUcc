#!/bin/bash

chmod +x ./mvnw

# Si JAVA17_HOME está definido, úsalo, si no intenta usar java instalado por defecto
if [ -z "$JAVA17_HOME" ]; then
  echo "JAVA17_HOME no está definido, buscando java en PATH..."
  JAVA_PATH=$(which java)
  if [ -z "$JAVA_PATH" ]; then
    echo "Error: java no encontrado en PATH"
    exit 1
  fi
  JAVA_HOME=$(dirname $(dirname $JAVA_PATH))
  export JAVA_HOME
else
  export JAVA_HOME=$JAVA17_HOME
fi

echo "JAVA_HOME = $JAVA_HOME"
java -version

./mvnw clean package
