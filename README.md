# Video Conferencing Web App

A full-stack real-time Zoom-like video conferencing platform built with **React (Vite)**, **Node.js**, **Express**, **MongoDB**, **JWT Authentication**, **Socket.IO**, and **WebRTC**.  

This app supports a **peer-to-peer architecture**, follows the **MVC pattern**, and provides features like video calling, screen sharing, real-time messaging, and meeting history tracking.

---

## Features

- **Real-Time Video Conferencing** using WebRTC
- **Screen Sharing** capability
- **Audio/Video Toggle** for participants
- **Real-Time Messaging** via Socket.IO
- **Participant List** showing connected users
- **Meeting Join via Meeting Code**
- **JWT-Based Authentication**
- **Login & Signup** with encrypted passwords (bcrypt)
- **Secure HTTP-only Cookies**
- **Meeting History** stored per user in MongoDB

---

## Frontend

- **React + Vite** for fast, modern frontend
- **CSS Modules** & **Tailwind CSS** for styling
- **Axios** for API calls
- **Socket.IO Client** for real-time communication
- **WebRTC APIs**
  - `getUserMedia`
  - `RTCPeerConnection`
  - `MediaStream`

---

## Backend

- **Node.js** & **Express.js**
- **MongoDB** with **Mongoose** for database
- **JWT Authentication** for secure endpoints
- **Cookie-Based Secure Sessions**
- **Socket.IO Server** for real-time messaging
- **Video Call & Screen Sharing Logic** using WebRTC
- **Encrypted Passwords** (bcrypt)
- **Token Verification** on every protected route

---

## Architecture

- **MVC Pattern** for maintainable and scalable code
- **Peer-to-Peer Video Streaming**
- **Real-Time Communication** via WebSocket (Socket.IO)
- **Secure Authentication** using JWT and HTTP-only cookies
- **Persistent Meeting History** per user
