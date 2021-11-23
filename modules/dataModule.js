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
            currenWordIndex: 0,
            testWords: [],
            currentWord: {},
        },
    };

    //word constructor
    // {
    //     value: {
    //         correct: '', user: '', isCorrect: false
    //     },
    //     characters: {
    //         correct: [], user: [], totalCorrect: 0, totalTest: 0 
    //     }
    // }
    let word = function(index){};

    //update method
    word.prototype.update = function(value){};

    return {
        setTestTime: function(x){},
        initializeTimeLeft: function(){},
        startTest: function(){},
        endTest: function(){},
        getTimeLeft: function(){},
        reduceTime: function(){},
        timeLeft: function(){},
        testEnded: function(){},
        testStarted: function(){},

        //results
        calculateWPM: function(){},
        calculateCPM: function(){},
        calculateAccuracy: function(){},

        //test words
        fillListOfTestWords: function(textNumber){},
        getListOfTestWords: function(){},
        moveToNewWord: function(){},
        updateCurrentWord: function(value){},

    }
})();