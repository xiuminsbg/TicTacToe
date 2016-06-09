/* global $ */
$(document).ready(function () {
/*
playTurn(index)
It should take one parameter which is a zero-based index to your grid, indicating where the current player's token should be played. It should return a boolean value to indicate whether the move was allowed or not - true if it was successful, false otherwise e.g. if the square is already taken or the game is over.
It is assumed that the turns of the player will be automatically changed after an allowed move.
*/
  var grid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var player = 'X';
  function playTurn (index) {
    // console.log('index: ' + index);
    if (isGameOver() || grid[index]) {
      return false;				/* Move NOT allowed. Game over or square is taken */
      // $('p').text('Move not allowed');
    } else {
      grid[index] = player;
      if (player === 'X') {
        player = 'O';
        $('p').text('Next Player: Player O');
      } else {
        player = 'X';
        $('p').text('Next Player: Player X');
      }
      return true;
    }
  }

	/*
	isGameOver()
	It should return a true or false if the game is over.
	*/
  function isGameOver () {
    if (whoWon() === 0) {
      return false;		/* Game NOT Over */
    } else {
      return true;		/* Game Over */
    }
  }
	/*
	whoWon()
	It should return 0 if the game is not yet finished. Else it should return either 1 or 2 depending on which player one. It should return 3 if the game is a draw.
	*/
  function whoWon () {
	// 	Rows
    if (grid[0] && grid[0] === grid[1] && grid[0] === grid[2]) {
      return grid[0];
    } else if (grid[3] && grid[3] === grid[4] && grid[3] === grid[5]) {
      return grid[3];
    } else if (grid[6] && grid[6] === grid[7] && grid[6] === grid[8]) {
      return grid[6];
	// 	Columns
    } else if (grid[0] && grid[0] === grid[3] && grid[0] === grid[6]) {
      return grid[0];
    } else if (grid[1] && grid[1] === grid[4] && grid[1] === grid[7]) {
      return grid[1];
    } else if (grid[2] && grid[2] === grid[5] && grid[2] === grid[8]) {
      return grid[2];
	// 	Diagonals
    } else if (grid[0] && grid[0] === grid[4] && grid[0] === grid[8]) {
      return grid[0];
    } else if (grid[2] && grid[2] === grid[4] && grid[2] === grid[6]) {
      return grid[2];
	// 	Tie
    } else if (grid[0] && grid[1] && grid[2] && grid[3] && grid[4] && grid[5] && grid[6] && grid[7] && grid[8]) {
      return 3;
    } else { return 0; }				/* Game NOT finished */
  }
	/*
	restart()
	It should restart the game so it can be played again.
	*/
  function restart () {
    grid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    player = 'X';
  }
	//
	//
	// jQuery: Link HTML to the functions
  $('.grid').click(function (event) {
    console.log(event);
    var idNumber = parseInt(this.id);
  // console.log(idNumber);
	// console.log(grid.join("-"));
	//
	// currentPlayer put before the playTurn function to ensure X & O are displayed correctly in the box
    var currentPlayer = player;
    if (playTurn(idNumber)) {
      $(this).text(currentPlayer);
    }
    var winner = whoWon();
    if (winner === 'X') {
			// winner is x
      $('p').text('Player X Wins');
    } else if (winner === 'O') {
			// winner is o
      $('p').text('Player O Wins');
    } else if (winner === 3) {
			// draw
      $('p').text("It's a Tie!");
    } else {

    }
    if (isGameOver() === true) {
			// if (winner == 'X') {
			// 	$('p').text("X wins!");
			// 	alert("X wins!")
			// }
			// else if (winner == 'O') {
			// 	$('p').text("O wins!");
			// 	alert("O wins!")
			// }
			// else if (winner == 3) {
			// 	$('p').text("It's a draw!!");
			// 	alert("Draw!!")
			// }
			// $('p').text("GAME OVER");
      alert('Game Over. Please Reset.');
    }

	// 		grid[index]=$(this).text();
  });
	// Reset Button
  $('#reset').click(function () {
		// location.reload()
    restart();
    $('.grid').text('');			/* Above: location.reload() is another way to reset */
    $('p').text("LET'S PLAY");
  });
});
