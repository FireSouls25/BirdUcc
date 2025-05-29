# Usa Java 21 ya que tu pom.xml lo requiere
FROM eclipse-temurin:21-jdk

# Instala Node.js 22 y Maven
RUN apt-get update && apt-get install -y curl gnupg maven \
  && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
  && apt-get install -y nodejs \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia todos los archivos del contexto (que es birducc/) al contenedor
COPY . .

# Da permisos de ejecución al script
RUN chmod +x .render/build.sh

# Ejecuta el script
CMD ["./.render/build.sh"]
