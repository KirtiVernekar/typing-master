eventsModule.init(15, 2);
dataModule.returnData();


function runTimer (timerElement) {
	const circle = timerElement.querySelector('svg > circle + circle');
	const numberElement = timerElement.querySelector('svg > text');
	const score = (Math.random() * 10).toFixed(1);
    console.log("score",score);
	const normaliziedScore = (10 - score) / 10;
	
	circle.style.strokeDashoffset = 1;
	
	const transitionEnd = event => {
		circle.removeEventListener('transitionend', transitionEnd);
		timerElement.classList.remove('animatable');
	}
	
	circle.addEventListener('transitionend', transitionEnd);
	
	setTimeout(() => {
		timerElement.classList.add('animatable');
		
		let transitionDuration = window.getComputedStyle(circle).transitionDuration;
		transitionDuration = parseFloat(transitionDuration) * (transitionDuration.indexOf('ms') > -1 ? 1 : 1000);
		
		increaseNumber(numberElement, score, transitionDuration);
		circle.style.strokeDashoffset = normaliziedScore;
	}, 1000);
}


function increaseNumber(numberElement, score, duration) {
	const intElement = numberElement.querySelector('tspan');
	const startTime = Date.now();
	
	const callback = function () {
		const timePassed = Date.now() - startTime;
		
		const currentScore = Math.min(score * (timePassed / duration), score);
		let [int, dec] = ('' + currentScore.toFixed(2)).split('.');
		intElement.textContent = int;
		
		if (timePassed < duration)
		{
			requestAnimationFrame(callback);
		}
	}
	requestAnimationFrame(callback);
}

runTimer(document.querySelector('.timer'));
