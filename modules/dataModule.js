const dataModule = (function(){
    const appData = {
        indicators: {
            testStarted: false,
            testEnded: false,
            totalTestTime: 0,
            timeLeft: 0,
        },
        results: {
            wpm: 0,
            cpm: 0,
            accuracy: 0,
            wpmChange: 0,
            cpmChange: 0,
            accuracyChange: 0,
            numberOfCorrectWords: 0,
            numberofCorrectCharacters: 0,
            numberofTestCharacters: 0,
        },
        words: {
            currentWordIndex: -1,
            testWords: [],
            currentWord: {},
        },
    };

    let lineReturn = "|";

    //function to shuffle an array
    const shuffle = function(array){
        let newArray = [];
        let randomIndex, randomElement;
        while(array.length > 0){
            randomIndex = Math.floor(Math.random() * array.length);
            randomElement = array[randomIndex];
            newArray.push(randomElement);
            array.splice(randomIndex, 1);
        }
        return newArray;
    };

    //function to capitalize first letter of a string
    String.prototype.capitalize = function(){
        let firstCharCap = this.charAt(0).toUpperCase();
        let remainingChar = this.slice(1);
        return firstCharCap + remainingChar;
    };

    const capitalizeRandom = function(arrayOfStrings){
        return arrayOfStrings.map(function(currentWord){
            let x = Math.floor(4 * Math.random()); //chances of x = 3 are 25%
            return (x == 3)? currentWord.capitalize() : currentWord;
        });
    };

    //function to add random punctuation to strings
    const addRandomPunctuation = function(arrayOfStrings){
        let punctuation = ["|","!",",",",",",",".",";",":","'","-","?","","","","",""];
        return arrayOfStrings.map(function(currentWord){
            let randomIndex = Math.floor(Math.random() * punctuation.length);
            let randomPunctuation = punctuation[randomIndex];
            return currentWord + randomPunctuation;
        });
    };

    let correctCharCount;
    const charCallback = function(currentElement, index){
        correctCharCount += (currentElement == this.characters.user[index]) ? 1 : 0;
    };
    const word = function(index){
        this.value = {
            correct: appData.words.testWords[index] + ' ', 
            user: '', 
            isCorrect: false,
        },
        this.characters = {
            correct: this.value.correct.split(''), 
            user: [], 
            totalCorrect: 0, 
            totalTest: this.value.correct.length,
        }
    };

    //word update method
    word.prototype.update = function(typedWord){
        //word check
        this.value.user = typedWord;
        this.value.isCorrect = (this.value.correct === this.value.user);

        //character check
        this.characters.user = this.value.user.split('');

        correctCharCount = 0;
        const charCallback2 = charCallback.bind(this);
        this.characters.correct.forEach(charCallback2);

        this.characters.totalCorrect = correctCharCount;
    };

    return {
        setTestTime: function(testDuration){
            appData.indicators.totalTestTime = testDuration;
        },
        
        initializeTimeLeft: function(){
            appData.indicators.timeLeft = appData.indicators.totalTestTime;
        },

        startTest: function(){
            appData.indicators.testStarted = true;
        },
        endTest: function(){
            appData.indicators.testEnded = true;
        },

        getTimeLeft: function(){
            return appData.indicators.timeLeft;
        },

        reduceTime: function(){
            return appData.indicators.timeLeft--;
        },

        isTimeLeft: function(){
            return appData.indicators.timeLeft != -1;  //0 WON'T SHOW ON ONSCREEN
        },

        testEnded: function(){
            return appData.indicators.testEnded;
        },
        testStarted: function(){
            return appData.indicators.testStarted;
        },

        //results
        calculateWPM: function(){},
        calculateCPM: function(){},
        calculateAccuracy: function(){},

        getCertificateData: function(){
            return {
                wpm: appData.results.wpm,
                accuracy: appData.results.accuracy,
            };
        },

        //test words
        fillListOfTestWords: function(textNumber, words){
            let wordsArray = words.split(" ");
            if(textNumber == 0){
                //shuffle words
                //capitalize randon strings
                //add a random punctuation
                wordsArray = addRandomPunctuation(capitalizeRandom(shuffle(wordsArray)));
            }
            appData.words.testWords = wordsArray;
        },

        getListOfTestWords: function(){
            return appData.words.testWords;
        },

        moveToNewWord: function(){
            if(appData.words.currentWordIndex > -1){
                //update no. of correct words
                //update no. of correct chars
                //update no. of test chars
            }
            appData.words.currentWordIndex++;
            let newWord = new word(appData.words.currentWordIndex);
            appData.words.currentWord = newWord;
        },

        getCurrentWordIndex: function(){
            return appData.words.currentWordIndex;
        },

        getCurrentWord: function(){
            let currentWord = appData.words.currentWord;
            return {
                value: {
                    correct: currentWord.value.correct,
                    user: currentWord.value.user,
                }
            };
        },

        updateCurrentWord: function(typedWord){
            appData.words.currentWord.update(typedWord);
        },

        getLineReturn: function(){
            return lineReturn;
        },

        returnData(){
            console.log(appData);
        }
    }
})();