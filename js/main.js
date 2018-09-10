document.addEventListener("DOMContentLoaded", function(){
  var tiles = document.querySelectorAll('.tile');
  var currentTurn = 1;
  var newGame = document.querySelector('.newGame');
  var title = document.querySelector('.title');
  var winCombos = [[2, 4, 6], [0, 4, 8], [2, 5, 8], [1, 4, 7], [0, 3, 6], [6, 7, 8], [3, 4, 5], [0, 1, 2]]

  tileListeners();

  newGame.addEventListener('click', resetGame)

  function resetGame() {
    tiles.forEach(function(tile) {
      tile.innerHTML = '';
      tile.style.backgroundColor = '#7F8C93';
      tile.style.color = 'white';
      tileListeners();
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
        this.removeEventListener('click', addTurn)
      } else {
        this.style.color = '#A1D7F4';
        this.innerHTML = 'O';
        this.removeEventListener('click', addTurn)
      }
    }
    checkWin();
    currentTurn ++;
  }

  function tileListeners() {
    tiles.forEach(function(tile) {
      tile.addEventListener('click', addTurn);
    })
  }

  function removeTileListeners() {
    tiles.forEach(function(tile) {
      tile.removeEventListener('click', addTurn);
    })
  }

  function checkWin() {
    for (var i = 0; i < winCombos.length; i++) {
      var tile1 = tiles[winCombos[i][0]].innerHTML;
      var tile2 = tiles[winCombos[i][1]].innerHTML;
      var tile3 = tiles[winCombos[i][2]].innerHTML;
      if (tile1 === tile2 && tile2 === tile3 && tile3 != '') {
        winningCases();
        return;
      } else {
        if (currentTurn === 9 && tile1 !== tile2 && tile2 !== tile3 && tile3 != '') {
          title.innerHTML = 'The game is a draw!';
        }
      }
    }
    // winCombos.forEach(function(combo) {
    //   var tile1 = tiles[combo[0]].innerHTML;
    //   var tile2 = tiles[combo[1]].innerHTML;
    //   var tile3 = tiles[combo[2]].innerHTML;
    //   if (tile1 === tile2 && tile2 === tile3 && tile3 != '') {
    //     winningCases();
    //     return;
    //   } else {
    //     if (currentTurn === 9 && tile1 !== tile2 && tile2 !== tile3 && tile3 != '') {
    //       title.innerHTML = 'The game is a draw!';
    //     }
    //   }
    // })

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
      removeTileListeners();
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
