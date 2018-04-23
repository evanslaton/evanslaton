$(document).ready(function() {
	var sessionTime = 25;
	var breakTime = 5;
	var time;
	var minCounter;
	var secCounter;
	var resetTracker = false;
	var oneSecondInterval;
	var alreadyCounting = false;

	var startCountDown = () => {
		oneSecondInterval = setInterval(function() {
			countDown();
		}, 1000);
	};

	var stopCountDown = () => {
	    clearInterval(oneSecondInterval);
	}

	var countDown = () => {
    	if (secCounter === 60) {
    		minCounter--
    		$('#main-time-mins').text(minCounter);
    	}
        secCounter--;      
        if (secCounter < 10) {
        	$('#main-time-sec').text('0' + secCounter);        	
        } else {
        	$('#main-time-sec').text(secCounter);
        }
        
        if (secCounter === 0) { secCounter = 60; }

        if (minCounter < 10) { $('#main-time-mins').text('0' + minCounter);	}

        if (minCounter === 0 && secCounter === 60) {
        	stopCountDown();

        	if ($('#timer-label').text() === 'Session') {
        		startBreakTimer();        		
        	} else {
				startSessionTimer();
        	}
        }
	}

	var startSessionTimer = () => {
		$('#timer-label').text('Session');	
		secCounter = 60;
		minCounter = sessionTime;

		if (sessionTime < 10) {
			$('#main-time-mins').text('0' + sessionTime);
		} else {
			$('#main-time-mins').text(minCounter);
		}
		$('#main-time-sec').text('00');
		startCountDown();
	};

	var startBreakTimer = () => {
		$('#timer-label').text('Break');
		secCounter = 60;
		minCounter = breakTime;		

		if (secCounter === 60) {
			if (breakTime < 10) {
				$('#main-time-mins').text('0' + breakTime);				
			} else {
				$('#main-time-mins').text(breakTime);
			}
			$('#main-time-sec').text('00');
		} 
		startCountDown();
	};

$('#start').on('click', () => {
	if (!alreadyCounting) {
		if (!resetTracker) {
			secCounter = 59;
			minCounter = sessionTime - 1;

			if (sessionTime < 10) {
				$('#main-time-mins').text('0' + minCounter);
			} else {
				$('#main-time-mins').text(minCounter);
			}

			$('#main-time-sec').text(secCounter);
			startCountDown();		
		} else if (resetTracker && secCounter === 60) {
			secCounter--;
			minCounter--;
			$('#main-time-sec').text(secCounter);
				if (minCounter < 10) {
					$('#main-time-mins').text('0' + minCounter);
				} else {
					$('#main-time-mins').text(minCounter);
				}				
			startCountDown();		
		} else {
			secCounter--;
			$('#main-time-sec').text(secCounter);		
			startCountDown();
		}
	}
	alreadyCounting = true;
});

//Stop
$('#stop').on('click', () => {
	stopCountDown();
	resetTracker = true;
	alreadyCounting = false;
});

//Reset
$('#reset').on('click', () => {
	stopCountDown();
	resetTracker = false;
	alreadyCounting = false;
	$('#timer-label').text('Session');
	$('#main-time-mins').text('00');
	$('#main-time-sec').text('00');
});

//Adds time to session/break counters
$('.add-time').on('click', function() {
	time = parseInt($(this).parent().parent().find($('.time')).text());
	time++;
	if (time > 99) {
		time = 1;
	}
	$(this).parent().parent().find($('.time')).text(time);

	if ($(this).parent().parent().find($('.set-timer')).text() === 'Session') {
		sessionTime = time;
	} else {
		breakTime = time;
	}
});

//Subtracts time to session/break counters
$('.subtract-time').on('click', function() {
	time = parseInt($(this).parent().parent().find($('.time')).text());
	time--;
	if (time < 1) {
		time = 99;
	}
	$(this).parent().parent().find($('.time')).text(time);

	if ($(this).parent().parent().find($('.set-timer')).text() === 'Session') {
		sessionTime = time;
	} else {
		breakTime = time;
	}
});




























});