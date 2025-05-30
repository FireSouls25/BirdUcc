# Usa Java 21
FROM eclipse-temurin:21-jdk

# Instala Node.js 22 y Maven
RUN apt-get update && apt-get install -y curl gnupg maven \
  && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
  && apt-get install -y nodejs \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Define directorio de trabajo
WORKDIR /app/birducc

# Copia todo el proyecto al contenedor
COPY . .

# Da permisos a mvnw y build.sh
RUN chmod +x mvnw build.sh

# Expón el puerto que Spring Boot usará (Render lo mapea internamente)
EXPOSE 8080

# Ejecuta el script
CMD ["./.render/build.sh"]
