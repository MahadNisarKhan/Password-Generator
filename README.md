# 🔐 Password Generator

A clean, responsive password generator built with **React** and **Vite**. Instantly generate secure, random passwords with full control over length and character types.

---

## ✨ Features

- **Adjustable length** — slide or type a value from 4 to 64 characters
- **Character type toggles** — mix and match uppercase, lowercase, numbers, and symbols
- **Auto-generation** — password updates instantly whenever any setting changes
- **One-click copy** — copies the password to your clipboard and highlights it
- **Auto-resizing display** — the password field grows to fit longer passwords

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| [React 19](https://react.dev/) | UI & state management |
| [Vite 8](https://vitejs.dev/) | Build tool & dev server |
| ESLint | Code linting |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/password-generator.git

# Navigate into the project
cd password-generator

# Install dependencies
npm install
```

### Running locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
```

The output will be in the `dist/` folder.

### Preview the production build

```bash
npm run preview
```

---

## 📁 Project Structure

```
password-generator/
├── public/
├── src/
│   ├── assets/
│   ├── Components/
│   │   ├── PassGen.jsx      # Main password generator component
│   │   └── PassGen.css      # Component styles
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

---

## 🧠 How It Works

The core logic lives in `PassGen.jsx`:

- **`useState`** tracks length, character-type toggles, and the generated password.
- **`useCallback`** memoizes `generatePassword` so it's only recreated when its dependencies (length, toggles) actually change.
- **`useEffect`** calls `generatePassword` automatically whenever any setting changes, keeping the displayed password in sync without causing infinite re-renders.
- The copy button uses the **Clipboard API** (`navigator.clipboard.writeText`) and selects the textarea text for visual feedback.

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
