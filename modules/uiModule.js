const uiModule = (function(){
    const DOMElements = {
        timeLeft: document.getElementById('timeLeft'),
        wpm: document.getElementById('wpm'),
        cpm: document.getElementById('cpm'),
        accuracy: document.getElementById('accuracy'),
        wpmChange: document.getElementById('wpm-change'),
        cpmChange: document.getElementById('cpm-change'),
        accuracyChange: document.getElementById('accuracy-change'),
        textInput: document.getElementById('input'), 
        nameInput: document.querySelector('.form-group'),
        nameField: document.getElementById('name'),
        content: document.getElementById('content'), 
        activeWord: '',
        modal: document.getElementById('certificateModal'),  //jQuery - $('#certificateModal')
        download: document.getElementById('download'),
    };

    const splitArray = function(string){
        return string.split('');
    };

    const addSpace = function(string){
        string.push(' ');
        return string;
    };

    const addSpanTag = function(array){
        return array.map(function(currentCharacter){
            return '<span>'+ currentCharacter +'</span>';
        });
    };

    const addWordSpanTag = function(array){
        array.push('</span>');
        array.unshift('<span>');
        return array;
    };

    const joinEachWord = function(array){
        return array.join('');
    };

    let userValue;
    const returnCharClass = function(currentCharacter, index){
        return (index < userValue.length) ? ((currentCharacter == userValue[index]) ? 'correctCharacter' : 'wrongCharacter') : '0'
    };

    return {
        getDOMElements: function(){
            return {
                textInput: DOMElements.textInput,
                download: DOMElements.download,
            };
        },

        //indicator
        updateTimeLeft: function(timeRemaining){
            DOMElements.timeLeft.innerHTML = timeRemaining;
            // console.log(timeRemaining);
        },

        //results
        updateResults: function(){

        },
        
        fillModal: function(){},
        showModal: function(){},

        //user input
        inputFocus: function(){
            DOMElements.textInput.focus();
        },

        isNameEmpty: function(){
            return DOMElements.nameField.value == '';
        },

        flagNameInput: function(){
            DOMElements.nameField.style.border = '2px solid red';
        },

        spacePressed: function(event){
            return event.data == " ";
        },

        enterPressed: function(lineReturn){
            return this.getTypedWord().includes(lineReturn + ' ');
        },

        getTypedWord: function(){
            return DOMElements.textInput.value;
        },

        emptyInput: function(){
            DOMElements.textInput.value = "";
        },

        //test words
        fillContent: function(wordsArray, lineReturn){
            let content = wordsArray.map(splitArray);
            content = content.map(addSpace);
            content = content.map(addSpanTag);
            content = content.map(addWordSpanTag);
            content = content.map(joinEachWord);
            content = content.join('');

            //replacing lineReturn
            // content = content.replace('<span>+ lineReturn +</span>', '<span>&crarr;</span>');   //replaces only first occurance
            content = content.split('<span>|</span>').join('<span>&crarr;</span>');

            DOMElements.content.innerHTML = content;
        },

        formatCurrentWord: function(wordObject){
            //format word
            let activeWord = DOMElements.activeWord;
            activeWord.className = 'active-word';

            //format character
            let correctValue = wordObject.value.correct;
            userValue = wordObject.value.user;
            let classes = Array.prototype.map.call(correctValue, returnCharClass);
            
            // activeWord = DOMElements.activeWord;
            let characters = activeWord.children;     //HTML collection

            for(let i=0; i < characters.length; i++){
                characters[i].removeAttribute('class');
                characters[i].className = classes[i];
                // console.log();
            }
        },

        setActiveWord: function(index){
            DOMElements.activeWord = DOMElements.content.children[index];
        },

        deactivateCurrentWord: function(){
            DOMElements.activeWord.removeAttribute('class');
        },

        //scroll active word to middle of content box
        scroll: function(){
            let top1 = DOMElements.activeWord.offsetTop;
            let top2 = DOMElements.content.offsetTop;
            let difference = top1 - top2;
            DOMElements.activeWord.scrollTop = difference - 57;
        },
    }
})();