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
        formInput: document.querySelector('.form-group'),
        nameInput: document.getElementById('name'),
        content: document.getElementById('content'),
        activeWord: '',
        rulesPanel: document.getElementById('rules'),
        rulesButton: document.getElementById('rules-btn'),
        closeButton: document.getElementById('close-btn'),
        modal: $('#certificateModal'),
        downloadCertificate: document.getElementById('download-certificate'),
        certificateButton: document.getElementById('certificate-button'),
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

    let correctValue, userValue;
    const returnCharClass = function(currentCharacter, index){
        return (index < userValue.length) ? ((currentCharacter == userValue[index]) ? 'correctCharacter' : 'wrongCharacter') : '0';
    };

    const updateChange = function(value, changeElement){
        let classToAdd, html;
        [classToAdd, html] = (value >= 0) 
                                ? ['col card-text-change scoreUp', '+' + value + ' <i class="bi bi-arrow-up"></i>'] 
                                : ['col card-text-change scoreDown', value + ' <i class="bi bi-arrow-down"></i>'];

        // if(changeElement == DOMElements.accuracyChange) {
        //     changeElement.innerHTML = html + '%';
        // } else {
        //     changeElement.innerHTML = html;
        // }
        
        changeElement.innerHTML = html;
        changeElement.removeAttribute('class');
        changeElement.className = classToAdd;

        fadeElement(changeElement);
    };

    const fadeElement = function(element){
        element.style.opacity = 1;
        setTimeout(() => {
            element.style.opacity = 0.8;
        }, 100);
    }

    return {
        getDOMElements: function(){
            return {
                rulesButton: DOMElements.rulesButton,
                closeButton: DOMElements.closeButton,
                textInput: DOMElements.textInput,
                downloadCertificate: DOMElements.downloadCertificate,
                certificateButton: DOMElements.certificateButton,
            };
        },
        
        openRules: function() {
            DOMElements.rulesPanel.style.visibility = "visible";
        },
        
        closeRules: function() {
            DOMElements.rulesPanel.style.visibility = "hidden";
        },

        //indicator
        updateTimeLeft: function(timeRemaining){
            DOMElements.timeLeft.innerHTML = timeRemaining;
        },

        //results
        updateResults: function(results){
            DOMElements.wpm.innerHTML = results.wpm;
            DOMElements.cpm.innerHTML = results.cpm;
            DOMElements.accuracy.innerHTML = results.accuracy + '%';
            updateChange(results.wpmChange, DOMElements.wpmChange);
            updateChange(results.cpmChange, DOMElements.cpmChange);
            updateChange(results.accuracyChange, DOMElements.accuracyChange);
        },
        
        fillModal: function(wpm){
            let level = (wpm > 50) ? 'Champion' : ((wpm > 20) ? 'Specialist' : 'Noob');
            let html = `<div>
                            <h5>You are a ${level}!</h5>
                            <h5>Your typing speed is ${wpm} words per minute!</h5>
                            <img src="assets/${level}.png" width="300" height="300" alt="${level}"/>
                        </div>`;
            
            DOMElements.formInput.insertAdjacentHTML("beforebegin", html);

            DOMElements.downloadCertificate.setAttribute('level', level);
        },

        showModal: function(){
            DOMElements.modal.modal('show');
        },

        //user input
        inputFocus: function(){
            DOMElements.textInput.focus();
        },

        isNameEmpty: function(){
            return DOMElements.nameInput.value == '';
        },

        flagNameInput: function(){
            DOMElements.nameInput.style.border = '4px double red';
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
            correctValue = wordObject.value.correct;
            userValue = wordObject.value.user;
            let classes = Array.prototype.map.call(correctValue, returnCharClass);
            let characters = activeWord.children;     //HTML collection
            for(let i=0; i < characters.length; i++){
                characters[i].removeAttribute('class');
                characters[i].className = classes[i];
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
            let activeWord = DOMElements.activeWord;
            let top1 = activeWord.offsetTop;
            let top2 = DOMElements.content.offsetTop;
            let difference = top1 - top2;
            //scroll content of content box
            DOMElements.content.scrollTop = difference - 42;
        },
        
    }
})();