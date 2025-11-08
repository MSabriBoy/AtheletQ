# 🏃‍♂️ AtheletQ

**Tagline:** Interactive front-end for athlete quizzes and performance visualization using webcam input (Vite + TypeScript).

## 🎯 Overview

**AtheletQ** is a **web-based front-end application** that helps analyze and visualize athlete performance through interactive quizzes and webcam-based input.  
It’s built with **Vite + TypeScript** and uses a **mock API service** for simulating data flow. The app provides real-time performance dashboards and visual analytics using the **Victory** chart library.

Unlike traditional IoT-based systems, AtheletQ uses only the **built-in webcam** for capturing activity — no external hardware or sensors are required.

## ⚙️ Features

- 🖥️ **Frontend:** Built with **Vite + TypeScript**
- 🎥 **Webcam-based input:** Uses browser webcam to capture or analyze athlete activity
- 📊 **Data visualization:** Interactive performance dashboards using **Victory.js**
- 🔄 **Mock API service:** (`services/mockApiService.ts`) simulates backend data
- 🎬 **Demo/reference videos:** Stored in `public/videos/`
- 🚀 **Modular design:** Easy to integrate with a backend or AI motion analysis later

---

## 🧠 Architecture Overview

## text
User + Webcam
       ↓
Frontend (Vite + TypeScript)
       ↓
Mock API Service (Data Simulation)
       ↓
Data Visualization (Victory Charts)
       ↓
Dashboard / Results Display

## 🚀 Quick Start
# 1️⃣ Clone this repository
git clone https://github.com/Sachin4717/AtheletQ.git
cd AtheletQ

# 2️⃣ Install dependencies
npm install
npm i

# 3️⃣ Start the development server
npm run dev

# 4️⃣ Open the app
# Visit the link shown in your terminal (usually http://localhost:3000)
