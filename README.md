# 🐦 BirdUcc - Plataforma de mensajería multiplataforma

**BirdUcc** es un sistema de mensajería modular que busca unificar múltiples plataformas de comunicación como WhatsApp, Telegram, y SMS bajo una misma interfaz lógica.

> 🎯 Proyecto en desarrollo - Estructura inicial basada en patrones de diseño de software (POO en Java)

---

## 🚀 Objetivo

BirdUcc permitirá a los usuarios:

- Enviar y recibir mensajes desde diferentes servicios de mensajería.
- Interactuar desde una única interfaz lógica desacoplada del proveedor.
- Agregar nuevas plataformas fácilmente gracias a su arquitectura extensible. (Quizas)

---

## 🧠 Arquitectura (Patrones de diseño)

Este proyecto aplica 3 patrones principales:

- **Adapter**: Para adaptar APIs externas como WhatsApp, Telegram o servicios SMS al sistema interno.
- **Bridge**: Para separar la lógica de mensajería del front-end o interfaz de control.
- **Abstract Factory**: Para crear familias de objetos (Cliente, Chat, Notificador) según la plataforma objetivo.

> Esta combinación permite mantener un sistema escalable, flexible y fácil de probar.

---

## 🗂️ Estructuras de datos planeadas

- ¿?

---

## 🔧 Tecnologías iniciales

- Lenguaje: **Java** para Backend usando Spring Boot | **typescript** para Frontend usando React 
- Estilo: **Programación Orientada a Objetos (POO)**

---

## 📅 Estado actual

- [x] Idea definida  
- [ ] Esquema de clases inicial  
- [ ] Implementación del núcleo  
- [ ] Adaptadores para plataformas reales  
- [ ] Interfaz gráfica


## 📄 Licencia

Este proyecto es de uso educativo y experimental.  
Licencia a definir.

