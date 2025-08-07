const GameBoard = (function(){
	let gameboard = ["","","","","","","","",""];

	const getBoard = function () {
		return gameboard;
	}

	const updateBoard = function(index, marker){
		if(gameboard[index] === ""){
			gameboard[index] = marker;
			return true;
		} else {
			return false;
		}
	}

	const resetBoard = function(){
		gameboard = ["","","","","","","","",""];
	}

	return {getBoard, updateBoard, resetBoard}
})()

const CreatePlayer = function(name,marker){
	return{name,marker};
}

const GameController = (function(){
  const player1 = CreatePlayer("Player1", "X");
  const player2 = CreatePlayer("Player2", "O");
  let currentPlayer = player1;
  let gameOver = false;
  let selectedIndex = null;

  const switchPlayer = function(){
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const playGame = function(index){
    selectedIndex = index;
    playRound();
  };

  const playRound = function(){
    if (gameOver || GameBoard.getBoard()[selectedIndex] !== "") return;

    GameBoard.updateBoard(selectedIndex, currentPlayer.marker);
    DisplayController.updateDisplay();

    if (checkWin(currentPlayer.marker)) {
      gameOver = true;
      DisplayController.showWinner(currentPlayer.name);
    } else if (isDraw()) {
      gameOver = true;
      DisplayController.showDraw();
    } else {
      switchPlayer();
    }
  };

  const checkWin = function(symbol){
    const board = GameBoard.getBoard();
    const winPatterns = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    return winPatterns.some(pattern =>
      pattern.every(index => board[index] === symbol)
    );
  };

  const isDraw = function(){
    return GameBoard.getBoard().every(cell => cell !== "");
  };

  const resetGame = function(){
    GameBoard.resetBoard();
    currentPlayer = player1;
    gameOver = false;
    selectedIndex = null;
    DisplayController.updateDisplay();
    DisplayController.clearMessage();
  };

  return { playGame, resetGame};
})();

const DisplayController = (function(){
  const cells = document.querySelectorAll(".cell");
  const message = document.querySelector(".message");
  const resetButton = document.querySelector(".reset");

  const updateDisplay = function(){
    const board = GameBoard.getBoard();
    cells.forEach((cell, index) => {
      cell.textContent = board[index];
      cell.style.fontSize = "30px";
    });
  };

  const showWinner = function(winnerName){
    message.textContent = `${winnerName} wins!`;
  };

  const showDraw = function(){
    message.textContent = "It's a draw!";
  };

  const clearMessage = function(){
    message.textContent = "";
  };

  const setEventListeners = function(){
    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        GameController.playGame(index);
      });
    });

    resetButton.addEventListener("click", () => {
      GameController.resetGame();
    });
  };

  return { updateDisplay, showWinner, showDraw, clearMessage, setEventListeners };
})();


DisplayController.setEventListeners();
