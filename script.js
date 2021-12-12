eventsModule.init(60, 2);
dataModule.returnData();


function runTimer (timerElement) {
	const circle = timerElement.querySelector('svg > circle + circle');
	timerElement.classList.add('animatable');
	circle.style.strokeDashoffset = 1;

	let timeCounter = setInterval(function(){
		// timerElement.classList.add('animatable');
		if(dataModule.isTimeLeft()){
			const score = dataModule.getTimeLeft();
			const normaliziedScore = (60 - score) / 60;
			console.log("normaliziedScore",normaliziedScore);
			circle.style.strokeDashoffset = normaliziedScore;
		} else {
			clearInterval(timeCounter);
			timerElement.classList.remove('animatable');
		}  
	}, 1000);
}

runTimer(document.querySelector('.timer'));
