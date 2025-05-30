# BirdUcc - Plataforma de Unificación de Mensajería

BirdUcc es una aplicación web que integra múltiples plataformas de mensajería (WhatsApp, Telegram y Discord) en una única interfaz, permitiendo a los usuarios gestionar sus conversaciones de manera centralizada.

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