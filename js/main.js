// Tic-Tac-Toe
const cells = document.querySelectorAll('.cell');
let turn = 'X';
cells.forEach(cell => {
cell.addEventListener('click', () => {
if(cell.textContent === '') {
cell.textContent = turn;
turn = turn === 'X' ? 'O' : 'X';
}
});
});

document.getElementById('reset').addEventListener('click', () => {
cells.forEach(cell => cell.textContent = '');
turn = 'X';
});

// Calculator
document.getElementById('calc-btn').addEventListener('click', () => {
const num1 = Number(document.getElementById('num1').value);
const num2 = Number(document.getElementById('num2').value);
const op = document.getElementById('operation').value;
let result;
if(op === 'add') result = num1 + num2;
else if(op === 'subtract') result = num1 - num2;
else if(op === 'multiply') result = num1 * num2;
else if(op === 'divide') result = num2 !== 0 ? num1 / num2 : 'Error';
document.getElementById('calc-result').textContent = 'Result: ' + result;
});

// Fun Section: Random Joke
const jokes = [
"Why do programmers prefer dark mode? Because light attracts bugs!",
"Why did the computer show up at work late? It had a hard drive.",
"Why do Java developers wear glasses? Because they don't C#."
];

document.getElementById('joke-btn').addEventListener('click', () => {
const joke = jokes[Math.floor(Math.random() * jokes.length)];
document.getElementById('joke-display').textContent = joke;
});
