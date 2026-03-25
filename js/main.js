// ============================================================
// TIC-TAC-TOE — win detection, score tracking, Minimax AI
// ============================================================
const WIN_LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let tttBoard    = Array(9).fill('');
let tttTurn     = 'X';
let tttGameOver = false;
let scores      = { X: 0, O: 0, D: 0 };

const cells     = document.querySelectorAll('.cell');
const tttStatus = document.getElementById('ttt-status');
const scoreX    = document.getElementById('score-x');
const scoreO    = document.getElementById('score-o');
const scoreD    = document.getElementById('score-d');
const aiMode    = document.getElementById('ai-mode');

function checkWinner(board) {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }
  if (board.every(c => c !== '')) return { winner: 'D', line: [] };
  return null;
}

function minimax(board, isMax) {
  const res = checkWinner(board);
  if (res) {
    if (res.winner === 'O') return 10;
    if (res.winner === 'X') return -10;
    return 0;
  }
  const moves = board
    .map((cell, i) => {
      if (cell !== '') return null;
      board[i] = isMax ? 'O' : 'X';
      const s = minimax(board, !isMax);
      board[i] = '';
      return s;
    })
    .filter(s => s !== null);
  return isMax ? Math.max(...moves) : Math.min(...moves);
}

function bestMove(board) {
  let best = -Infinity, move = -1;
  board.forEach((cell, i) => {
    if (cell === '') {
      board[i] = 'O';
      const s = minimax(board, false);
      board[i] = '';
      if (s > best) { best = s; move = i; }
    }
  });
  return move;
}

function tttPlay(idx) {
  if (tttGameOver || tttBoard[idx] !== '') return;
  tttBoard[idx] = tttTurn;

  const cell = cells[idx];
  cell.textContent = tttTurn;
  cell.classList.add(tttTurn.toLowerCase(), 'pop');

  const result = checkWinner(tttBoard);
  if (result) {
    tttGameOver = true;
    if (result.winner === 'D') {
      tttStatus.textContent = "It's a Draw! 🤝";
      scores.D++;
      scoreD.textContent = scores.D;
    } else {
      tttStatus.textContent = `Player ${result.winner} wins! 🎉`;
      result.line.forEach(i => cells[i].classList.add('win'));
      scores[result.winner]++;
      scoreX.textContent = scores.X;
      scoreO.textContent = scores.O;
    }
    return;
  }

  tttTurn = tttTurn === 'X' ? 'O' : 'X';
  tttStatus.textContent = `Player ${tttTurn}'s turn`;

  if (aiMode.checked && tttTurn === 'O' && !tttGameOver) {
    setTimeout(() => {
      const move = bestMove(tttBoard);
      if (move !== -1) tttPlay(move);
    }, 400);
  }
}

cells.forEach(cell => {
  cell.addEventListener('click', () => tttPlay(+cell.dataset.index));
});

document.getElementById('ttt-reset').addEventListener('click', () => {
  tttBoard    = Array(9).fill('');
  tttTurn     = 'X';
  tttGameOver = false;
  tttStatus.textContent = "Player X's turn";
  cells.forEach(c => { c.textContent = ''; c.className = 'cell'; });
});

document.getElementById('ttt-clear-scores').addEventListener('click', () => {
  scores = { X: 0, O: 0, D: 0 };
  scoreX.textContent = scoreO.textContent = scoreD.textContent = '0';
});


// ============================================================
// CALCULATOR — keyboard support, power, percent, negate
// ============================================================
const display = document.getElementById('calc-display');

document.querySelectorAll('#calc-buttons .calc-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.dataset.value;
    if (val === 'C') {
      display.value = '';
    } else if (val === '=') {
      try {
        display.value = Function('"use strict"; return (' + display.value + ')')();
      } catch {
        display.value = 'Error';
      }
    } else if (val === '+/-') {
      try {
        display.value = display.value
          ? String(Function('"use strict"; return -(' + display.value + ')')())
          : '';
      } catch {}
    } else {
      display.value += val;
    }
  });
});

document.addEventListener('keydown', e => {
  if ('0123456789+-*/.%'.includes(e.key)) {
    display.value += e.key;
  } else if (e.key === 'Enter') {
    try { display.value = Function('"use strict"; return (' + display.value + ')')(); }
    catch { display.value = 'Error'; }
  } else if (e.key === 'Backspace') {
    display.value = display.value.slice(0, -1);
  } else if (e.key === 'Escape') {
    display.value = '';
  }
});


// ============================================================
// JOKES — JokeAPI (Programming + Misc)
// ============================================================
const jokeBtn     = document.getElementById('joke-btn');
const jokeDisplay = document.getElementById('joke-display');

jokeBtn.addEventListener('click', async () => {
  jokeDisplay.innerHTML = '<span class="loader"></span> Loading joke...';
  try {
    const res  = await fetch('https://v2.jokeapi.dev/joke/Programming,Misc?type=single');
    const data = await res.json();
    jokeDisplay.textContent = data.joke || 'Hmm, no joke found 😅';
  } catch {
    jokeDisplay.textContent = 'Oops! Could not fetch joke 😢';
  }
});


// ============================================================
// MEMORY MATCH GAME
// ============================================================
const EMOJIS = ['🚀','🎮','🦄','🔮','⚡','🎯','🌈','🐉'];
let memCards = [], memFlipped = [], memMatched = 0;
let memMoves = 0, memLocked = false;
let memTimerInterval = null, memSeconds = 0, memStarted = false;

function buildMemory() {
  clearInterval(memTimerInterval);
  memSeconds = 0; memMoves = 0; memMatched = 0;
  memLocked  = false; memStarted = false;

  document.getElementById('move-count').textContent  = '0';
  document.getElementById('match-count').textContent = '0';
  document.getElementById('mem-timer').textContent   = '0s';
  document.getElementById('mem-status').textContent  = 'Flip cards to find matching pairs!';

  const grid = document.getElementById('memory-grid');
  grid.innerHTML = '';
  memCards = [];

  const deck = [...EMOJIS, ...EMOJIS].sort(() => Math.random() - 0.5);

  deck.forEach((emoji, i) => {
    const card = document.createElement('div');
    card.className = 'mem-card';
    card.innerHTML = `
      <div class="mem-card-inner">
        <div class="mem-card-back"></div>
        <div class="mem-card-front">${emoji}</div>
      </div>`;
    card.dataset.emoji = emoji;
    card.dataset.index = i;
    card.addEventListener('click', () => flipCard(card));
    grid.appendChild(card);
    memCards.push(card);
  });
}

function startMemTimer() {
  memTimerInterval = setInterval(() => {
    memSeconds++;
    document.getElementById('mem-timer').textContent = memSeconds + 's';
  }, 1000);
}

function flipCard(card) {
  if (memLocked || card.classList.contains('flipped') || card.classList.contains('matched')) return;
  if (!memStarted) { memStarted = true; startMemTimer(); }

  card.classList.add('flipped');
  memFlipped.push(card);

  if (memFlipped.length === 2) {
    memMoves++;
    document.getElementById('move-count').textContent = memMoves;
    memLocked = true;

    const [a, b] = memFlipped;
    if (a.dataset.emoji === b.dataset.emoji) {
      a.classList.add('matched');
      b.classList.add('matched');
      memMatched++;
      document.getElementById('match-count').textContent = memMatched;
      memFlipped = [];
      memLocked  = false;

      if (memMatched === 8) {
        clearInterval(memTimerInterval);
        document.getElementById('mem-status').textContent =
          `🎉 You won in ${memMoves} moves & ${memSeconds}s!`;
      }
    } else {
      setTimeout(() => {
        a.classList.remove('flipped');
        b.classList.remove('flipped');
        memFlipped = [];
        memLocked  = false;
      }, 900);
    }
  }
}

document.getElementById('mem-reset').addEventListener('click', buildMemory);
buildMemory();


// ============================================================
// TRIVIA QUIZ — Open Trivia DB
// ============================================================
let quizScore = 0, quizCorrect = 0, quizWrong = 0, quizNum = 0;

document.getElementById('quiz-load').addEventListener('click', loadQuestion);
document.getElementById('quiz-reset').addEventListener('click', () => {
  quizScore = quizCorrect = quizWrong = quizNum = 0;
  ['quiz-score','quiz-correct','quiz-wrong','quiz-num']
    .forEach(id => document.getElementById(id).textContent = '0');
  document.getElementById('quiz-status').textContent   = 'Score reset! Press Load Question to start.';
  document.getElementById('quiz-question').textContent = 'Your trivia question will appear here...';
  document.getElementById('quiz-options').innerHTML    = '';
});

async function loadQuestion() {
  if (quizNum >= 10) {
    document.getElementById('quiz-status').textContent =
      `Game over! Final score: ${quizScore} pts. Reset to play again!`;
    return;
  }

  document.getElementById('quiz-question').innerHTML = '<span class="loader"></span> Loading...';
  document.getElementById('quiz-options').innerHTML  = '';
  document.getElementById('quiz-status').textContent = 'Choose an answer...';

  try {
    const res  = await fetch('https://opentdb.com/api.php?amount=1&type=multiple&encode=url3986');
    const data = await res.json();
    const q    = data.results[0];

    const question = decodeURIComponent(q.question);
    const correct  = decodeURIComponent(q.correct_answer);
    const opts     = [...q.incorrect_answers.map(decodeURIComponent), correct]
                       .sort(() => Math.random() - 0.5);

    quizNum++;
    document.getElementById('quiz-num').textContent      = quizNum;
    document.getElementById('quiz-question').textContent = question;

    const optContainer = document.getElementById('quiz-options');
    opts.forEach(opt => {
      const btn = document.createElement('button');
      btn.className   = 'quiz-opt';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        optContainer.querySelectorAll('.quiz-opt').forEach(b => b.disabled = true);
        if (opt === correct) {
          btn.classList.add('correct');
          quizCorrect++;
          quizScore += 10;
          document.getElementById('quiz-status').textContent = '✅ Correct! +10 pts';
        } else {
          btn.classList.add('wrong');
          quizWrong++;
          document.getElementById('quiz-status').textContent = `❌ Wrong! Answer: ${correct}`;
          optContainer.querySelectorAll('.quiz-opt').forEach(b => {
            if (b.textContent === correct) b.classList.add('correct');
          });
        }
        document.getElementById('quiz-score').textContent   = quizScore;
        document.getElementById('quiz-correct').textContent = quizCorrect;
        document.getElementById('quiz-wrong').textContent   = quizWrong;
      });
      optContainer.appendChild(btn);
    });
  } catch {
    document.getElementById('quiz-question').textContent =
      'Failed to load question. Check your connection.';
  }
}


// ============================================================
// QUOTE GENERATOR
// ============================================================
const QUOTES = [
  { text: "Every expert was once a beginner.", author: "Unknown" },
  { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
  { text: "The only way to learn a new programming language is by writing programs in it.", author: "Dennis Ritchie" },
  { text: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson" },
  { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
  { text: "It's not a bug – it's an undocumented feature.", author: "Anonymous" },
  { text: "The best error message is the one that never shows up.", author: "Thomas Fuchs" },
  { text: "Debugging is twice as hard as writing the code in the first place.", author: "Brian Kernighan" },
];

let lastQuoteIdx = -1;

function newQuote() {
  let idx;
  do { idx = Math.floor(Math.random() * QUOTES.length); } while (idx === lastQuoteIdx);
  lastQuoteIdx = idx;
  const q = QUOTES[idx];
  document.getElementById('quote-display').innerHTML =
    `<em>${q.text}</em><span id="quote-author">— ${q.author}</span>`;
}

document.getElementById('quote-btn').addEventListener('click', newQuote);
document.getElementById('quote-copy').addEventListener('click', () => {
  const q = QUOTES[lastQuoteIdx === -1 ? 0 : lastQuoteIdx];
  navigator.clipboard.writeText(`"${q.text}" — ${q.author}`)
    .then(() => showToast('Quote copied!'));
});


// ============================================================
// COLOR PALETTE GENERATOR
// ============================================================
let currentPalette = [];

function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = n => {
    const k     = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function generatePalette() {
  const baseHue = Math.floor(Math.random() * 360);
  const styles  = ['analogous','complementary','triadic','monochromatic','split'];
  const style   = styles[Math.floor(Math.random() * styles.length)];
  let hues;

  if      (style === 'analogous')      hues = [0,30,60,90,120].map(o => (baseHue+o)%360);
  else if (style === 'complementary')  hues = [0,20,180,200,210].map(o => (baseHue+o)%360);
  else if (style === 'triadic')        hues = [0,10,120,130,240].map(o => (baseHue+o)%360);
  else if (style === 'monochromatic')  hues = Array(5).fill(baseHue);
  else                                 hues = [0,150,210,30,60].map(o => (baseHue+o)%360);

  const sats   = style === 'monochromatic' ? [30,50,65,80,90] : [60,70,75,65,80];
  const lights = style === 'monochromatic' ? [20,35,50,65,80] : [30,45,55,60,70];

  currentPalette = hues.map((h, i) => hslToHex(h, sats[i], lights[i]));
  renderPalette();
}

function renderPalette() {
  const row = document.getElementById('palette-row');
  row.innerHTML = '';
  currentPalette.forEach(hex => {
    const div       = document.createElement('div');
    div.className   = 'pal-color';
    div.style.background = hex;
    div.innerHTML   = `<span class="pal-hex">${hex}</span>`;
    div.addEventListener('click', () => {
      navigator.clipboard.writeText(hex).then(() => showToast(`Copied ${hex}`));
    });
    row.appendChild(div);
  });
}

document.getElementById('palette-btn').addEventListener('click', generatePalette);
document.getElementById('palette-copy-all').addEventListener('click', () => {
  navigator.clipboard.writeText(currentPalette.join(', '))
    .then(() => showToast('All hex codes copied!'));
});
generatePalette();


// ============================================================
// TOAST HELPER
// ============================================================
function showToast(msg) {
  const t = document.getElementById('copy-toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}
