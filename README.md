# ⚔️ AdventureGame

A browser-based RPG where you create a hero, gear up, and battle your way through goblins, skeletons, orcs, and dragons — built with a React frontend and a Spring Boot backend.

![Java](https://img.shields.io/badge/Java-Spring%20Boot-6DB33F?style=flat-square&logo=spring)
![React](https://img.shields.io/badge/React-Vite-61DAFB?style=flat-square&logo=react)
![Status](https://img.shields.io/badge/status-in%20development-yellow?style=flat-square)

---

## 📖 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Overview](#-api-overview)
- [Game Mechanics](#-game-mechanics)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎮 About

**AdventureGame** is a full-stack RPG project where players register an account, forge a character from one of three classes, and step into the Battle Arena to fight monsters, earn XP, level up, and loot equipment. It's built as a learning project combining a **Spring Boot** REST API with a custom-styled **React** frontend designed to feel like an actual game UI rather than a typical web app.

---

## ✨ Features

- 🔐 **Authentication** — Register and log in with JWT-based sessions
- 🧙 **Character Creation** — Choose between Warrior, Mage, and Rogue classes
- ⚔️ **Turn-Based Battle System** — Select a monster, start a battle, and attack until victory
- 🐉 **Multiple Monsters** — Goblin, Skeleton, Orc, and Dragon, each with scaling difficulty
- 🎒 **Inventory System** — Collect weapons, armor, and potions
- 🛡️ **Equipment** — Equip weapons and armor to boost Attack and Defense
- 🧪 **Potions** — Use Health Potions mid-battle to recover HP
- 📈 **Progression** — Earn XP, level up, and grow stronger after each victory
- 📜 **Live Battle Log** — Real-time combat feed with color-coded events
- 🎨 **Custom Dark-Fantasy UI** — Hand-styled RPG interface (not a generic template)

---

## 📸 Screenshots

| Battle Arena | Login | Create Character |
<img width="1527" height="858" alt="Screenshot 2026-06-21 121014" src="https://github.com/user-attachments/assets/828ba939-7ce6-4fcb-b759-eecbe5b77160" /> <img width="1531" height="861" alt="Screenshot 2026-06-21 121158" src="https://github.com/user-attachments/assets/7c9b9d9a-6394-4a3e-a12c-1b99ac7f0eb6" /> <img width="1527" height="851" alt="Screenshot 2026-06-21 121426" src="https://github.com/user-attachments/assets/e65adaf7-6540-4c21-9de9-d53de322890f" /> 

---

## 🛠️ Tech Stack

**Backend**
- Java + Spring Boot
- Spring Web (REST API)
- Spring Security / JWT (authentication)
- PostgresSql

**Frontend**
- React (Vite)
- React Router DOM
- Custom CSS (no UI framework — hand-built dark fantasy theme)
- Google Fonts: Lora + Poppins

---

## 📂 Project Structure

```
AdventureGame/
├── backend/                  # Spring Boot application
│   └── src/main/java/...
│
└── frontend/                 # React (Vite) application
    └── src/
        ├── api/               # Axios calls to the backend
        │   ├── authApi.js
        │   ├── battleApi.js
        │   ├── characterApi.js
        │   └── inventoryApi.js
        ├── assets/            # Character, monster & background art
        ├── pages/             # App pages
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── CreateCharacter.jsx
        │   └── Battle.jsx
        └── styles/            # Page-specific stylesheets
            ├── Auth.css
            └── Battle.css
```

---

## 🚀 Getting Started

### Prerequisites

- **Java 17+** and **Maven** (or Gradle, depending on your setup)
- **Node.js 18+** and **npm**
- A running database instance (if not using an in-memory option)

### Backend Setup

```bash
cd backend

# Configure your database connection in:
# src/main/resources/application.properties

# Run the Spring Boot application
mvn spring-boot:run
```

The backend should start on **`http://localhost:8080`** by default.

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The frontend should start on **`http://localhost:5173`** by default.

> Make sure the frontend's API base URL (in your `api/` files) points to your backend's address.

---

## 🔌 API Overview

| Endpoint Group | Purpose |
|---|---|
| `authApi` | Register and log in users, returns a JWT token |
| `characterApi` | Create and fetch character data (class, level, stats) |
| `inventoryApi` | Fetch inventory, use potions, equip items |
| `battleApi` | Start a battle, attack, and track battle progress |

> Exact endpoint paths and request/response shapes are defined in the corresponding `frontend/src/api/*.js` files and their matching Spring Boot controllers.

---

## 🧙 Game Mechanics

**Classes**
| Class | Icon |
|---|---|
| Warrior | ⚔️ |
| Mage | 🔮 |
| Rogue | 🗡️ |

**Monsters**
| Monster | Difficulty |
|---|---|
| Goblin | Easy |
| Skeleton | Medium |
| Orc | Hard |
| Dragon | Boss-level |

**Core Stats**
- ❤️ Health
- ⚔️ Attack
- 🛡️ Defense
- ✨ XP / Level

**Combat Flow**
1. Select a monster from the dropdown
2. Click **Start Battle**
3. Click **Attack** to trade blows until one side falls
4. Use **Health Potions** from your inventory to heal mid-fight
5. Defeat the monster to earn XP and potentially level up

---

## 🗺️ Roadmap

- [ ] Add more monster types and a proper boss tier
- [ ] Skill/ability system beyond basic attacks
- [ ] Shop / gold economy
- [ ] Multiplayer or PvP battles
- [ ] Sound effects and battle animations
- [ ] Mobile-first responsive polish

---

## 🤝 Contributing

This is currently a solo learning project, but suggestions and pull requests are welcome. If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Open a pull request

---

## 📄 License

No license has been added to this project yet. All rights reserved by the author unless stated otherwise. *(Consider adding an [MIT License](https://choosealicense.com/licenses/mit/) later if you want others to freely use or contribute to this code.)*

---

<p align="center">Built with ⚔️ and a lot of debugging by <a href="https://github.com/aditya28052006">@aditya28052006</a></p>
