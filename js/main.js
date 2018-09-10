document.addEventListener("DOMContentLoaded", function(){
  var tiles = document.querySelectorAll('.tile');
  var currentTurn = 1;
  var newGame = document.querySelector('.newGame');
  var title = document.querySelector('.title');
  var winCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]


  tiles.forEach(function(tile) {
    tile.addEventListener('click', addTurn);
  })

  newGame.addEventListener('click', resetGame)

  function resetGame() {
    tiles.forEach(function(tile) {
      tile.innerHTML = '';
      tile.style.backgroundColor = '#7F8C93';
      tile.style.color = 'white';
    })
    currentTurn = 1;
    newGame.style.display = 'none';
    title.innerHTML = 'Tic-Tac-Toe';
  }

  function addTurn() {
    if (this.innerHTML === '') {
      if ((currentTurn % 2) != 0) {
        this.style.color = '#5BADFF';
        this.innerHTML = 'X';
        newGame.style.display = 'inline-block'
      } else {
        this.style.color = '#A1D7F4';
        this.innerHTML = 'O';
      }
    }
    checkWin();
    currentTurn ++;
  }
  // 012, 345, 678, 036, 147, 258, 048, 246
  function checkWin() {
    winCombos.forEach(function(combo){
      var tile1 = tiles[combo[0]].innerHTML;
      var tile2 = tiles[combo[1]].innerHTML;
      var tile3 = tiles[combo[2]].innerHTML;
      if (currentTurn < 9) {
        if (tile1 === tile2 && tile2 === tile3 && tile3 != '') {
          winningCases();
        }
      } else if (currentTurn == 9) {
        if (tile1 === tile2 && tile2 === tile3 && tile3 != '') {
          winningCases();
        } else if (tile1 !== tile2 && tile2 !== tile3 && tile3 != '') {
          title.innerHTML = 'The game is a draw!';
        }
      }
    })
    function winningCases() {
      var currentPlayer = checkTurn();
      var winMsg = currentPlayer + ' is the winner!';
      title.innerHTML = winMsg;
      tiles.forEach(function(tile) {
        if (tile.innerHTML === '') {
          tile.innerHTML = '-';
          tile.style.backgroundColor = '#77000f';
        }
      })
    }
  }

  function checkTurn() {
    if ((currentTurn % 2) != 0) {
      return 'Player 1'
    } else {
      return 'Player 2'
    }
  }

})
