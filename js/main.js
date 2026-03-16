// ===== Tic-Tac-Toe =====
const cells = document.querySelectorAll('.board .cell');
let turn = 'X';
cells.forEach(cell => {
  cell.addEventListener('click', () => {
    if(cell.textContent === '') {
      cell.textContent = turn;
      cell.classList.add('filled');
      setTimeout(() => cell.classList.remove('filled'), 300);
      turn = turn === 'X' ? 'O' : 'X';
    }
  });
});

// ===== Calculator =====
const display = document.getElementById('calc-display');
const buttons = document.querySelectorAll('#calc-buttons button');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.getAttribute('data-value');
    if(val === 'C') display.value = '';
    else if(val === '=') {
      try {
        display.value = eval(display.value);
      } catch {
        display.value = 'Error';
      }
    } else {
      display.value += val;
    }
  });
});

// ===== Fun Section: Online Jokes =====
const jokeBtn = document.getElementById('joke-btn');
const jokeDisplay = document.getElementById('joke-display');

jokeBtn.addEventListener('click', async () => {
  jokeDisplay.textContent = "Loading joke... 🤔";
  try {
    const response = await fetch("https://v2.jokeapi.dev/joke/Programming?type=single");
    const data = await response.json();
    jokeDisplay.textContent = data.joke || "Hmm, no joke found 😅";
  } catch (err) {
    jokeDisplay.textContent = "Oops! Could not fetch joke 😢";
    console.error(err);
  }
});