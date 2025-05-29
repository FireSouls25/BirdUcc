# Base con OpenJDK 17
FROM openjdk:17-jdk

# Instala Node.js 22.x
RUN apt-get update && apt-get install -y curl gnupg \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Carpeta de trabajo
WORKDIR /app

# Copia todo tu proyecto
COPY . .

# Da permisos al build.sh
RUN chmod +x ./.render/build.sh

# Expone puerto (ajusta si usas otro)
EXPOSE 8080

# Comando para construir (tu build.sh)
CMD ["./.render/build.sh"]
