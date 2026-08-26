# 🍳 Recipe Book

> Your friendly kitchen companion — browse recipes, hunt by ingredients, build a shopping list, and share your favourites. Built with Angular. 💚

<p align="left">
  <img alt="Angular" src="https://img.shields.io/badge/Angular-15-DD0031?logo=angular&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-4.8-3178C6?logo=typescript&logoColor=white">
  <img alt="Node" src="https://img.shields.io/badge/Node-24.x-339933?logo=node.js&logoColor=white">
  <img alt="Firebase Auth" src="https://img.shields.io/badge/Auth-Firebase-FFCA28?logo=firebase&logoColor=black">
</p>

---

## ✨ What you can do

| | Feature | Description |
|---|---|---|
| 📖 | **Browse recipes** | A shelf of demo recipes ready to explore out of the box |
| 🔎 | **Search by ingredient** | Got eggs and flour? Find out what you can cook |
| ⭐ | **Rate & favourite** | Star the ones you love and keep them a tap away |
| 🛒 | **Shopping list** | Send a recipe's ingredients straight to your list |
| 👤 | **Profile & social** | A home feed, uploads, and a profile you can edit |
| 🔐 | **Sign in** | Email/password or Google, powered by Firebase |

---

## 🚀 Get started

You'll need **Node 24** (there's an `.nvmrc`, so `nvm use` does the trick).

```bash
# 1. Install dependencies
npm install

# 2. Fire up the dev server
npm start
```

Then open 👉 **http://localhost:4200/** — the app hot-reloads as you edit. 🔥

---

## 🧰 Handy commands

| Command | What it does |
|---|---|
| `npm start` | Run the dev server at `localhost:4200` |
| `npm run build` | Production build into `dist/` |
| `npm run watch` | Rebuild automatically on every change |

---

## 🗺️ How it's organised

The app is split into lazy-loaded feature modules, so you only download what you visit:

```
src/app/
├── social/         🏠 home feed, profile, uploads, favourites  →  /home
├── recipes/        📖 browse, search, detail, edit             →  /recipes
├── shopping-list/  🛒 your ingredient checklist                →  /shopping-list
├── auth/           🔐 sign in / sign up (Firebase + Google)    →  /auth
└── shared/         🧩 reusable bits: avatars, cards, services
```

---

## 🔑 Configuration

Auth talks to Firebase. Drop your keys into `src/environments/environment.ts`:

```ts
export const environment = {
  production: false,
  firebaseApiKey: 'YOUR_FIREBASE_WEB_API_KEY',
  googleClientId: 'YOUR_GOOGLE_WEB_CLIENT_ID',
};
```

> 💡 Find the Google Client ID under **Firebase Console → Authentication → Sign-in method → Google → Web SDK configuration**.

---

## 🛠️ Scaffolding new pieces

Need a new component or service? Angular CLI has your back:

```bash
ng generate component my-feature
ng generate service my-service
```

---

## 🙌 Contributing

Found a bug or have a tasty idea? Open an issue or a pull request — contributions are always welcome. Happy cooking! 👨‍🍳👩‍🍳
