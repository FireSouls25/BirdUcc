# Usa una imagen de OpenJDK 17 basada en Debian
FROM eclipse-temurin:17-jdk

# Instala Node.js 22 y herramientas necesarias
RUN apt-get update && apt-get install -y curl gnupg \
  && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
  && apt-get install -y nodejs \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copia todo tu proyecto
COPY . .

# Da permisos de ejecución al script
RUN chmod +x ./.render/build.sh

# Expone el puerto que usa tu app (ajústalo si es distinto)
EXPOSE 8080

# Comando por defecto al correr el contenedor
CMD ["./.render/build.sh"]
