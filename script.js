const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let gameActive = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0,1,2], [3,4,5], [6,7,8],   // Rows
    [0,3,6], [1,4,7], [2,5,8],   // Columns
    [0,4,8], [2,4,6]             // Diagonals
];

function checkWinner() {
    for (let condition of winningConditions) {
        let [a, b, c] = condition;

        if (boardState[a] && 
            boardState[a] === boardState[b] && 
            boardState[a] === boardState[c]) {

            gameActive = false;
            statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
            return;
        }
    }

    if (!boardState.includes("")) {
        gameActive = false;
        statusText.textContent = "It's a Draw!";
    }
}

function handleClick(e) {
    const cell = e.target;
    const index = Array.from(cells).indexOf(cell);

    if (boardState[index] !== "" || !gameActive) return;

    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    checkWinner();

    if (gameActive) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

function resetGame() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Player X's Turn";

    cells.forEach(cell => cell.textContent = "");
}

cells.forEach(cell => cell.addEventListener("click", handleClick));

