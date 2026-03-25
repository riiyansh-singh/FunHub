# 🎮 FunHub v2.0

> **Play. Laugh. Explore. Discover.**
> A retro-arcade browser playground — no installs, no logins, just fun.

---

## ✨ What's New in v2.0

| Feature | Status |
|---|---|
| 🧠 Memory Match Game | 🆕 New |
| 🎯 Trivia Quiz (live API) | 🆕 New |
| 💬 Inspiration Quote Engine | 🆕 New |
| 🎨 Color Palette Generator | 🆕 New |
| 🤖 Tic-Tac-Toe AI Opponent (Minimax) | 🆕 Upgraded |
| 🏆 Tic-Tac-Toe Score Tracker | 🆕 Upgraded |
| ⌨️ Calculator Keyboard Support | 🆕 Upgraded |
| 🔢 Calculator Power & Percent buttons | 🆕 Upgraded |
| 🖼️ Full retro-neon UI redesign | 🆕 Upgraded |
| 📱 Improved mobile responsiveness | 🆕 Upgraded |

---

## 🕹️ Features

### ⭕ Tic-Tac-Toe *(Upgraded)*
- Win detection with highlighted winning line
- Score tracker across rounds (X Wins / O Wins / Draws)
- **AI opponent** powered by the Minimax algorithm — plays perfectly
- Toggle between 2-player and vs-computer mode
- Reset board or clear all scores independently

### 🖩 Calculator *(Upgraded)*
- Full keyboard support (`Enter` = calculate, `Esc` = clear, `Backspace` = delete)
- New buttons: Power (`x²`), Percent (`%`), Negate (`+/−`)
- Uses `Function()` constructor instead of `eval()` for safer evaluation

### 😂 Programming Jokes
- Fetches live jokes from [JokeAPI](https://v2.jokeapi.dev/)
- Pulls from Programming + General categories

### 🧠 Memory Match *(New)*
- 16-card emoji grid (8 pairs)
- Move counter + live timer
- Detects win and shows your final stats
- Randomized shuffle on every new game

### 🎯 Trivia Quiz *(New)*
- Fetches live questions from [Open Trivia DB](https://opentdb.com/)
- 10-question rounds with live score tracking
- Color-coded correct/wrong feedback
- Multiple choice with 4 options per question

### 💬 Inspiration Engine *(New)*
- 12 hand-picked programming & motivational quotes
- One-click copy to clipboard
- Randomized, never repeats twice in a row

### 🎨 Color Palette Generator *(New)*
- Generates 5-color palettes in different harmony styles:
  - Analogous, Complementary, Triadic, Monochromatic, Split-complementary
- Click any swatch to copy its hex code
- Copy all 5 hex codes at once

---

## 🛠️ Tech Stack

- **HTML5** — semantic structure
- **CSS3** — custom properties, grid, animations, `@keyframes`
- **Vanilla JavaScript** — no frameworks, no dependencies
- **Google Fonts** — Orbitron + Exo 2
- **APIs used:**
  - [JokeAPI](https://v2.jokeapi.dev/) — jokes
  - [Open Trivia DB](https://opentdb.com/) — trivia questions

---

## 🚀 Getting Started

```bash
git clone https://github.com/riiyansh-singh/FunHub.git
cd FunHub
# Just open index.html in your browser — no build step needed!
open index.html
```

---

## 📁 Project Structure

```
FunHub/
├── index.html       ← All-in-one file (HTML + CSS + JS)
└── README.md
```

> v2.0 consolidates everything into a single `index.html` for simplicity and portability.

---

## 🗺️ Roadmap / Ideas

- [ ] Snake game
- [ ] Word scramble / hangman
- [ ] Drawing canvas
- [ ] High score persistence (localStorage)
- [ ] Sound effects toggle
- [ ] Dark/light theme switch

---

## 👤 Author

**Riiyansh Singh** — [github.com/riiyansh-singh](https://github.com/riiyansh-singh)

---

## 📄 License

MIT — free to use, fork, and build on.
- Add more mini games (Rock-Paper-Scissors, Memory Game)  
- Improve calculator (support decimals and more operations)  
- Add responsive design for mobile/tablet  

## Live Demo
https://riiyansh-singh.github.io/FunHub/
