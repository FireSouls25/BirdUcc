# 🐦 BirdUcc - Plataforma de Mensajería Multiplataforma

## 📋 Descripción
BirdUcc es un sistema de mensajería modular que unifica múltiples plataformas de comunicación (WhatsApp, Telegram, SMS) bajo una única interfaz. El proyecto está construido siguiendo patrones de diseño de software y una arquitectura modular.

## **Backend 1 (rama main)**

## 🛠️ Tecnologías Utilizadas

### Backend
- Java 17
- Spring Boot 3.2.3
- Spring Security
- Spring Data JPA
- H2 Database
- JWT para autenticación
- Telegram Bots API
- Lombok
- Maven

### Frontend
- React
- TypeScript
- HTML/CSS

### Herramientas de Desarrollo
- Node.js
- npm
- Maven

## 📥 Requisitos Previos

1. Java Development Kit (JDK) 17 o superior
2. Node.js y npm
3. Maven
4. Git

## 🚀 Pasos para Clonar y Ejecutar el Proyecto

### 1. Clonar el Repositorio
```bash
git clone https://github.com/FireSouls25/BirdUcc.git
cd BirdUcc
```

### 2. Configurar el Backend
```bash
cd Backend
mvn clean install
mvn spring-boot:run
```

### 3. Configurar el Frontend
```bash
cd Frontend
npm install
npm run dev
```

## 🔧 Configuración Adicional

### Backend
- El backend utiliza una base de datos H2 en memoria por defecto
- La documentación de la API está disponible en `/swagger-ui.html` cuando el servidor está en ejecución
- Se requiere configurar las credenciales de Telegram Bot en el archivo de propiedades

### Frontend
- El frontend se ejecuta por defecto en `http://localhost:3000`
- Asegúrate de que el backend esté corriendo en el puerto correcto (por defecto 8080)

## 📁 Estructura del Proyecto
```
BirdUcc/
├── Backend/           # Servidor Spring Boot
├── Frontend/         # Aplicación React
└── whatsapp-service/ # Servicio de WhatsApp
```

## 🔐 Variables de Entorno
El proyecto requiere configurar las siguientes variables de entorno en un archivo .env:

- `22768079`: Token para el bot de Telegram
- `a686b8b2577b739fa0d025ad4ed72813`: Clave secreta para la generación de tokens JWT

## 📝 Notas Adicionales
- Se recomienda usar Java 17 o superior para el backend
- Asegúrate de tener todas las dependencias instaladas antes de ejecutar el proyecto

## **Backend 2 (rama backend-alternativa)**

## 🚀 Tecnologías Utilizadas

### Frontend
- React 19
- TypeScript
- Vite
- Axios
- React Icons
- Telegram Web App SDK

### Backend
- Spring Boot 3.5.0
- Spring Security
- Spring Data MongoDB
- Spring WebSocket
- Telegram Bots API
- Discord JDA

## 📋 Prerrequisitos

- Java 17 o superior
- Node.js y npm
- MongoDB
- Maven
- Credenciales de desarrollador para:
  - Telegram Bot
  - Discord Application
  - WhatsApp Business API

(estan puestas en codigo)

## 🔧 Instalación

1. **Clonar el repositorio**
```bash
git clone --branch backend-alternativa --single-branch https://github.com/FireSouls25/BirdUcc.git
cd BirdUcc
```

2. **Configurar el Backend**
```bash
cd birducc
mvn clean install
```

3. **Configurar el Frontend**
```bash
cd birdpage
npm install
```

## 🚀 Ejecución

1. **Iniciar el Backend**
```bash
cd birducc
mvn spring-boot:run
```
El backend estará disponible en `http://localhost:8081`

2. **Iniciar el Frontend**
```bash
cd birdpage
npm run dev
```
El frontend estará disponible en `http://localhost:5173`

## 📱 Características

- Integración con WhatsApp, Telegram y Discord
- Interfaz unificada para todas las plataformas
- Sistema de autenticación y autorización
- Almacenamiento de mensajes en MongoDB
- Comunicación en tiempo real mediante WebSocket
- Soporte para mensajes de texto, imágenes y archivos
- Gestión de contactos y conversaciones

## 🙏 Agradecimientos

- Spring Boot Team
- React Team
- MongoDB Team
- Telegram y Discord