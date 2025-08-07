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

	const displayBoard = function(){
		console.log(`
		${gameboard[0]} | ${gameboard[1]} | ${gameboard[2]}
		________
		${gameboard[3]} | ${gameboard[4]} | ${gameboard[5]}
		________
		${gameboard[6]} | ${gameboard[7]} | ${gameboard[8]} \n`)		
	}
	return {getBoard, updateBoard, resetBoard, displayBoard}
})()	

const CreatePlayer = function(name,marker){
	return{name,marker};
}

const GameController = (function(){
	const player1 = CreatePlayer("sam", "x");
	const player2 = CreatePlayer("qin", "o");
	let currentPlayer = player1;
	let gameOver = false;

	const changeCurrentPlayer = function(){
		if (currentPlayer === player1) {
			currentPlayer = player2;
		} else {
			currentPlayer = player1;
		}
	}

	const playRound = function(){
		let index = "";
		do{
			if(index.toUpperCase() === "Q"){
				gameOver = true;
				break;
			}
			index = prompt("Enter the cell number(0 - 8), Q to quit");
		} while(!(index >= 0 && index < 9));
		
		if(gameOver){
			console.log("Game Over!");
			return
		}

		const currentInput = GameBoard.updateBoard(index, currentPlayer.marker);

		GameBoard.displayBoard();

		if(checkWin(currentPlayer.marker)){
      		console.log(`${currentPlayer.name} wins!`);
      		gameOver = true;
    	} else if(GameBoard.getBoard().every(cell => cell !== "")){
      		console.log("It's a draw!");
      		gameOver = true;
   		} else if(!currentInput){
   			console.log("cell taken! choose another cell");
   			console.log(`Turn: ${currentPlayer.name} (${currentPlayer.marker})`)
   		} else{
      		changeCurrentPlayer();
      		console.log(`Next turn: ${currentPlayer.name} (${currentPlayer.marker})`);

    	}
	}

	const checkWin = function(marker){
    	const board = GameBoard.getBoard();
    	const winCondition = [
      	[0,1,2],[3,4,5],[6,7,8],
      	[0,3,6],[1,4,7],[2,5,8],
     	[0,4,8],[2,4,6]
    	];
    	return winCondition.some(pattern => pattern.every(index => board[index] === marker));
  	}

  	const resetGame = () => {
    	GameBoard.resetBoard();
    	currentPlayer = player1;
    	gameOver = false;
    	console.log("Game reset.");
    	GameBoard.displayBoard();
  	}

  	const playGame = function(){
		while(!(gameOver)){
			playRound();
		}
	}

  	return {playGame, resetGame}
})()


