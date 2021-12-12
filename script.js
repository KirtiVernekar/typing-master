function runTimer(timerElement) {
	const timerCircle = timerElement.querySelector('svg > circle + circle');
	timerElement.classList.add('animatable');
	timerCircle.style.strokeDashoffset = 1;

	let countdownTimer = setInterval(function(){
		if(dataModule.isTimeLeft()){
			const timeRemaining = dataModule.getTimeLeft();
			const normalizedTime = (60 - timeRemaining) / 60;
			timerCircle.style.strokeDashoffset = normalizedTime;
		} else {
			clearInterval(countdownTimer);
			timerElement.classList.remove('animatable');
		}  
	}, 1000);
}
runTimer(document.querySelector('.timer'));

eventsModule.init(60, 2);

