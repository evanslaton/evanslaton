document.addEventListener("DOMContentLoaded", function() {

	const greenBtn = document.getElementById('greenBtn');
	const redBtn = document.getElementById('redBtn');
	const yellowBtn = document.getElementById('yellowBtn');
	const blueBtn = document.getElementById('blueBtn');
	const score = document.getElementById('score');
	const start = document.getElementById('start');
	const restart = document.getElementById('restart');
	const strict = document.getElementById('strict');
	const playBtns = document.getElementsByClassName('play-buttons');
	let win = false;
	let isPlayerTurn = false;
	let wrong = false;
	let strictModeOn = false;
	let playing = false;
	let sound = new Audio();
	let playerArr = [];
	let gameOrderArr = [];
	let counter = 0;

	const btnArr = [greenBtn, redBtn, yellowBtn, blueBtn];
	const btnOrigColorArr = ['#0FA94C', '#9A1922', '#C5AA1E', '#2A458D'];
	const btnChangeColorArr = ['#17FF73', '#FF2938', '#FFDC27', '#4C7DFF'];
	const soundUrlArr = [
		'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3',
		'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3',
		'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
		'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'
	];
	
	const btnObject = {
		'greenBtn': greenBtn,
		'redBtn': redBtn,
		'yellowBtn': yellowBtn,
		'blueBtn': blueBtn
	};


	//Assigns click event listener to start
	var startClickEvent = () => {
		start.addEventListener('click', startGame);
		restart.addEventListener('click', restartGame);
		strict.addEventListener('click', strictModeToggler);
		assignClickEvent();
	}

	//Assigns click event listener to playBtns
	var assignClickEvent = () => {
		for (i = 0; i < playBtns.length; i++) {
			playBtns[i].addEventListener('click', playerTurn);
		}
	}


	//Returns a random number between 0 and 3
	var getRandomInt = (min, max) => {
	    return Math.floor(Math.random() * ( max - min + 1) + min);
	};
	

	//Pushes getRandomInt() to gameOrderArr
	var pushRandomInt = randomNum => {
		gameOrderArr.push(randomNum);
	};


	//Starts the game
	var startGame = () => {
		if (!playing) {
			playGame();
		}
		playing = true;
	}


	//Restarts the game
	var restartGame = () => {
		if (isPlayerTurn) {
			isPlayerTurn = false;
			wrong = false;
			playing = false;
			counter = 0;
			gameOrderArr = [];
			playerArr = [];
			if (strictModeOn) {
				score.textContent = 'X';
			}
			setTimeout(() => {
				playGame();
			}, 1000);
		}
	};


	//Toggles strict mode on/off
	var strictModeToggler = () => {
		if (isPlayerTurn || !playing) {
			if (!strictModeOn) {
				strictModeOn = true;
				strict.style.background = btnOrigColorArr[0];
			} else if (strictModeOn) {
				strictModeOn = false;
				strict.style.background = btnOrigColorArr[1];
			}
			restartGame();
		}
	};


	//Plays sound
	var playSound = (url) => {
		sound.src = url;
		sound.play();
	}


	//Checks if correct, if wrong computer replays last series or restarts if strictModeOn = true
	var checkAnswer = () => {
		let gameOrderCheck = gameOrderArr[counter];
		let playerOrderCheck = playerArr[counter];
		if (gameOrderCheck !== playerOrderCheck) {
			score.textContent = 'X';
			wrong = true;
			if (strictModeOn) {						
				restartGame();			
			}
			isPlayerTurn = false;
		} else {
			wrong = false;			
		}
		counter++;
	};


	//Changes color, calls playSound() then returns to original color of selected playBtn
	var btnActive = (i) => {
		if (!isPlayerTurn) {
			setTimeout(() => {				
				btnArr[gameOrderArr[i]].setAttribute('style', `background-color: ${btnChangeColorArr[gameOrderArr[i]]};`);
				playSound(soundUrlArr[gameOrderArr[i]]);
				setTimeout(() => {
					btnArr[gameOrderArr[i]].setAttribute('style', `background-color: ${btnOrigColorArr[gameOrderArr[i]]};`);
				}, 500);
			}, 700 * i);
		} else {
			btnArr[i].setAttribute('style', `background-color: ${btnChangeColorArr[i]};`);
			playSound(soundUrlArr[i]);
			setTimeout(() => {
				btnArr[i].setAttribute('style', `background-color: ${btnOrigColorArr[i]};`);
			}, 500);
		}
	};


	//Click event handler for the player's turn
	function playerTurn() {
		if (isPlayerTurn) {
			let btnId = this.id;
			let btnEl = btnObject[btnId];
			let btnIndex = btnArr.indexOf(btnEl);
			btnActive(btnIndex);
			playerArr.push(btnIndex);
			checkAnswer();
			if (wrong) {
				isPlayerTurn = false;
				setTimeout(() => {
					playGame();
				}, 1300);
			} else if (gameOrderArr.length === counter) {
				isPlayerTurn = false;				
				setTimeout(() => {
					playGame();
				}, 1300);
			}
		}
	};


	//Starts the game, plays the computer's turn once started and checks for a win
	var playGame = () => {
		counter = 0;
		if (gameOrderArr.length === 20) {
			isPlayerTurn = true;
			score.textContent = 'win';
			setTimeout(() => {
				restartGame();
			}, 3000);
			return;
		}
		if (!isPlayerTurn && !wrong) {
			pushRandomInt(getRandomInt(0, 3));
			for (i = 0; i < gameOrderArr.length; i++) {
				btnActive(i);
			};
			setTimeout(() => {
				isPlayerTurn = true;
			}, 700 * gameOrderArr.length);
			score.textContent = gameOrderArr.length;
		} else if (!isPlayerTurn && wrong) {
			for (i = 0; i < gameOrderArr.length; i++) {
				btnActive(i);
			};
			setTimeout(() => {
				isPlayerTurn = true;
			}, 700 * gameOrderArr.length);
			score.textContent = gameOrderArr.length;
			wrong = false;
		}
		playerArr = [];
	};

	startClickEvent();
});