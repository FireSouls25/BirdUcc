# Usa una imagen base con Java 17
FROM eclipse-temurin:17-jdk

# Instala Node.js 22 y Maven
RUN apt-get update && apt-get install -y curl gnupg maven \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY . .

# Permisos para scripts
RUN chmod +x birducc/.render/build.sh

# Ejecuta el build script
CMD ["birducc/.render/build.sh"]
