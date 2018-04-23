document.addEventListener("DOMContentLoaded", function() {

  var playerOneTurn = true;
  var playerOne;
  var playerTwo;
  var playerOneImg;
  var playerTwoImg;
  var win = false;
  var draw = false;
  var fullBoard = 0;
  var checkForWin = [];
  var happensOnce = true;
  var onePlayer;

  //Boxes
  var zero = document.getElementById('0');
  var one = document.getElementById('1');
  var two = document.getElementById('2');
  var three = document.getElementById('3');
  var four = document.getElementById('4');
  var five = document.getElementById('5');
  var six = document.getElementById('6');
  var seven = document.getElementById('7');
  var eight = document.getElementById('8');

  var winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ];

  //HTML elements
  var optionOne = document.getElementById('option-one');
  var optionTwo = document.getElementById('option-two');
  var optionThree = document.getElementById('option-three');
  var optionFour = document.getElementById('option-four');
  var menu = document.getElementById('menu');
  var game = document.getElementById('game');
  var playButton = document.getElementById('play-button');
  var playerOneIcon = document.getElementById('player-one_icon');
  var playerTwoIcon = document.getElementById('player-two_icon');
  var playerOneTurnKeeper = document.getElementById('player-one');
  var playerTwoTurnKeeper = document.getElementById('player-two');
  var winnerDeclaration = document.getElementById('winnerIs');
  var winText = document.getElementById('winText');
  

  //Add events listeners to menu options
  optionOne.addEventListener('click', function() {
    optionOne.classList.add('visible-border');
    optionTwo.classList.remove('visible-border');
    onePlayer = true;
  });

  optionTwo.addEventListener('click', function() {
    optionTwo.classList.add('visible-border');
    optionOne.classList.remove('visible-border');
    onePlayer = false;
  });

  optionThree.addEventListener('click', function() {
    optionThree.classList.add('visible-border');
    optionFour.classList.remove('visible-border');
    playerOne = 'x';
    playerTwo = 'o';
    playerOneImg = 'img/x.png';
    playerTwoImg = 'img/o.png';
    playerOneIcon.textContent = 'X';
    playerTwoIcon.textContent = 'O';
  });

  optionFour.addEventListener('click', function() {
    optionFour.classList.add('visible-border');
    optionThree.classList.remove('visible-border');
    playerOne = 'o';
    playerTwo = 'x';
    playerOneImg = 'img/o.png';
    playerTwoImg = 'img/x.png';
    playerOneIcon.textContent = 'O';
    playerTwoIcon.textContent = 'X';
  });

  playButton.addEventListener('click', function() {
    if (onePlayer !== undefined && playerOne) {
      menu.classList.add('hidden');
      game.classList.remove('hidden');
      playerOneTurnKeeper.classList.remove('hidden');
      playerTwoTurnKeeper.classList.remove('hidden');
    }
  });


  //Assigns click event to boxes and starts the game
  var boxes = document.getElementsByClassName('box');

  for (i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener('click', playGame);
  }


  //Starts the game
  function playGame() {
    var clicked = document.getElementById((this.id));
    var addImageTo = clicked.firstElementChild;

    //Allows each box to be selected only once
    if (!clicked.classList.contains('clicked') && !win) {

      if (playerOneTurn) {     
        clicked.classList.add(playerOne);
        addImageTo.src = playerOneImg;
        clicked.classList.add('clicked');
        addImageTo.style.display = 'block';   
        checkWin(playerOne);
        playerOneTurn = false;
        playerOneTurnKeeper.classList.remove('visible-border');      
        playerTwoTurnKeeper.classList.add('visible-border');
        if (onePlayer) {
          computerPlay(playerOne, playerTwo);
        }
      } else if (!playerOneTurn && !onePlayer) {
        clicked.classList.add(playerTwo);
        clicked.classList.add('clicked');
        addImageTo.style.display = 'block'; 
        addImageTo.src = playerTwoImg;
        checkWin(playerTwo);
        playerOneTurn = true;
        playerTwoTurnKeeper.classList.remove('visible-border');      
        playerOneTurnKeeper.classList.add('visible-border');
      }
    }
  }


  //Computer's turn
  var computerPlay = (pOne, pTwo) => {

    if (!win) {
      setTimeout(function() {
        var openBoxes = [];
        var playHere;
        var randomBox;
        var toBePlayed;
        var tempArr = [];
        checkForWin = [];

          for (i = 0; i < boxes.length; i++) {
            if (!boxes[i].classList.contains('clicked')) {
              openBoxes.push(boxes[i]);
            }
          }

          if (openBoxes.indexOf(four) !== -1 && openBoxes.length === 8) {
            four.classList.add(playerTwo);
            four.firstElementChild.src = playerTwoImg;
            four.firstElementChild.style.display = 'block';
            four.classList.add('clicked');
          } else if (openBoxes.indexOf(four) === -1 && openBoxes.length === 8) {
            zero.classList.add(playerTwo);
            zero.firstElementChild.src = playerTwoImg;
            zero.firstElementChild.style.display = 'block';
            zero.classList.add('clicked'); 
          } else if (openBoxes.length < 8) {

            //Pushes all selected elements into checkForWin array
            for (i = 0; i < boxes.length; i++) {
              if (boxes[i].classList.contains(pOne)) {
                if (checkForWin.indexOf(i) === -1) {
                  checkForWin.push(i);
                }
              }
            }

            for (i = 0; i < winningCombos.length; i++) {
              counter = 0;
              for (j = 0; j < 3; j++) {
                if (checkForWin.indexOf(winningCombos[i][j]) !== -1 && !playerOneTurn) {
                  counter++;
                  if (counter === 2 && happensOnce) {
                    tempArr = winningCombos[i];
                    for (k = 0; k < tempArr.length; k++) {
                      if (checkForWin.indexOf(tempArr[k]) === -1) {
                        if (tempArr[k] !== 4) {
                        toBePlayed = document.getElementById(tempArr[k]);
                        toBePlayed.classList.add(playerTwo);
                        toBePlayed.firstElementChild.src = playerTwoImg;
                        toBePlayed.firstElementChild.style.display = 'block';
                        toBePlayed.classList.add('clicked');
                        happensOnce = false;
                        playerOneTurn = true;
                        }
                      }
                    }
                  }
                }
              }
            }
          }

          if (!playerOneTurn && openBoxes.length < 8) {
            randomBox = randomNumber(0, openBoxes.length -1);       
            playHere = openBoxes[randomBox];
            playHere.classList.add(playerTwo);
            playHere.firstElementChild.src = playerTwoImg;
            playHere.firstElementChild.style.display = 'block';
            playHere.classList.add('clicked');
          }

          checkWin(playerTwo);
          playerOneTurn = true;
          playerOneTurnKeeper.classList.add('visible-border');      
          playerTwoTurnKeeper.classList.remove('visible-border');
      }, 800);
    }
  };


  //Generates a random number
  function randomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  //Checks if a player has won
  var checkWin = (ox) => {
    checkForWin = [];
    counter = 0;
    fullBoard++;

    //Pushes all selected elements into checkForWin array
    for (i = 0; i < boxes.length; i++) {
      if (boxes[i].classList.contains(ox)) {
        if (checkForWin.indexOf(i) === -1) {
          checkForWin.push(i);
        }
      }
    }

    //Checks for a win
    for (i = 0; i < winningCombos.length; i++) {
      counter = 0;
      for (j = 0; j < 3; j++) {
        if (checkForWin.indexOf(winningCombos[i][j]) !== -1) {
          counter++;
          if (counter === 3) {
            win = true;
            winText.textContent = 'Player ' + ox.toUpperCase() + ' wins!'
            winnerDeclaration.classList.remove('hidden');
            stopGame();
          }
        }
      }
    }

    //Determines if the game is a draw
    if (win === false && fullBoard === 9) {
      draw = true;
      winText.textContent = 'Draw!'
      winnerDeclaration.classList.remove('hidden');
      stopGame();    
    }
  };


  //Ends the game
  var stopGame = () => {
    boxes = document.getElementsByClassName('box');

    for (i = 0; i < boxes.length; i++) {
      boxes[i].removeEventListener('click', playGame);
      boxes[i].classList.remove('clicked');
      boxes[i].classList.remove(playerOne);
      boxes[i].classList.remove(playerTwo);
      boxes[i].firstElementChild.src = 'img/clear.png';
    }

    win = false;
    draw = false;
    playerOneTurn = true;
    fullBoard = 0;
    checkForWin = [];
    happensOnce = true;

    setTimeout(function() {
      playerTwoTurnKeeper.classList.remove('visible-border');      
      playerOneTurnKeeper.classList.add('visible-border');
      winnerDeclaration.classList.add('hidden');
      
      for (i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener('click', playGame);
      }
    }, 2500);
  };
});