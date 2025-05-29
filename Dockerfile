# Imagen base con Java 17 y APT (basada en Debian)
FROM eclipse-temurin:17-jdk

# Instala Node.js 22 y herramientas necesarias
RUN apt-get update && apt-get install -y curl gnupg \
  && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
  && apt-get install -y nodejs \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia todos los archivos al contenedor
COPY . .

# Da permisos de ejecución al script de build
RUN chmod +x ./.render/build.sh

# Ejecuta el script
CMD ["./.render/build.sh"]
