const eventsModule = (function(dataMod, uiMod, certificateMod, wordsMod){
    const addEventListeners = function(){
    
        //enter click event listener
        uiMod.getDOMElements().textInput.addEventListener('keydown', function(event){
            if(dataMod.testEnded()) { return; }

            //check if the user pressed Enter
            if(event.keyCode == 13){
                uiMod.getDOMElements().textInput.value += dataMod.getLineReturn() + ' ';
                // uiMod.getDOMElements().textInput.value += '|' + ' ';

                //create fake 'input' event
                let inputEvent = new Event('input');
                uiMod.getDOMElements().textInput.dispatchEvent(inputEvent);
            }
        });

        //character typing event listener
        uiMod.getDOMElements().textInput.addEventListener('input', function(event){
            if(dataMod.testEnded()) { return; }

            if(!dataMod.testStarted()){
                dataMod.startTest();

                let timeCounter = setInterval(function(){
                    let results = {};

                    [results.wpm, results.wpmChange] = dataMod.calculateWPM();
                    [results.cpm, results.cpmChange] = dataMod.calculateCPM();
                    [results.accuracy, results.accuracyChange] = dataMod.calculateAccuracy();

                    uiMod.updateResults(results);

                    if(dataMod.isTimeLeft()){
                        let timeLeft = dataMod.reduceTime();
                        uiMod.updateTimeLeft(timeLeft); 
                    } else {
                        clearInterval(timeCounter);
                        dataMod.endTest();
                        uiMod.fillModal(results.wpm);
                        uiMod.showModal();
                    }  
                }, 1000);
            }

            let typedWord = uiMod.getTypedWord();
            dataMod.updateCurrentWord(typedWord);
            let currentWord = dataMod.getCurrentWord();
            uiMod.formatCurrentWord(currentWord);
            if(currentWord.value.user.length > currentWord.value.correct.length) {
                uiMod.emptyInput(dataMod.getLineReturn());
                uiMod.deactivateCurrentWord();
                dataMod.moveToNewWord();
                let index = dataMod.getCurrentWordIndex();
                uiMod.setActiveWord(index);
            }

            if(uiMod.spacePressed(event) || uiMod.enterPressed(event)){
                if(currentWord.value.user.length == currentWord.value.correct.length) {
                    uiMod.emptyInput(dataMod.getLineReturn());
                    uiMod.deactivateCurrentWord();
                    dataMod.moveToNewWord();
                    let index = dataMod.getCurrentWordIndex();
                    uiMod.setActiveWord(index);
                    let currentWord = dataMod.getCurrentWord();
                    uiMod.formatCurrentWord(currentWord);
                }
                else {
                    uiMod.formatCurrentWord(currentWord);
                }
                // uiMod.scroll();
            }

            uiMod.scroll();
        });

        //scroll active word to middle of content box on window resize
        window.addEventListener('resize', uiMod.scroll());

        //toggle rules panel
        uiMod.getDOMElements().rulesButton.addEventListener('click', function(event){
            uiMod.openRules();
        });
        uiMod.getDOMElements().closeButton.addEventListener('click', function(event){
            uiMod.closeRules();
        });

        //certificate download event listener
        uiMod.getDOMElements().downloadCertificate.addEventListener('click', function(event){
            if(uiMod.isNameEmpty()){
                uiMod.flagNameInput();
            }else{
                let certificateData = dataMod.getCertificateData();
                certificateMod.generateCertificate(certificateData);
            }
        });

        uiMod.getDOMElements().certificateButton.addEventListener('click', function(event){
            if(dataMod.testEnded()){
                uiMod.showModal();
            }else{
                alert("Please complete the test!");
            }
        });
    };

    return {
        init: function(duration, textNumber){

            let words = wordsMod.getWords(textNumber);

            //fill the list of test words
            dataMod.fillListOfTestWords(textNumber, words);

            //fill the list of test words
            let testWords = dataMod.getListOfTestWords();
            let lineReturn = dataMod.getLineReturn();
            uiMod.fillContent(testWords, lineReturn);

            //set totalTestTime
            dataMod.setTestTime(duration);

            //update timeLeft
            dataMod.initializeTimeLeft();

            //update timeLeft
            let timeLeft = dataMod.getTimeLeft();
            uiMod.updateTimeLeft(timeLeft);
            let initialResults = dataMod.getInitialResults();
            uiMod.updateResults(initialResults);

            //move to new word
            dataMod.moveToNewWord();

            //set activeWord and format it
            let index = dataMod.getCurrentWordIndex();
            uiMod.setActiveWord(index);
            let currentWord = dataMod.getCurrentWord();
            uiMod.formatCurrentWord(currentWord);

            //focus on input
            uiMod.inputFocus();

            addEventListeners();
        }
    };
})(dataModule, uiModule, certificateModule, wordsModule);