var disable = false; // to disable keydown event when needed

// keyboard events : 
const DivTextArea = document.querySelector(".typing");
const TextArea = DivTextArea.querySelector("p");


const ul = document.querySelector("ul");
const listItems = ul.querySelectorAll("li");

var textInsideTextarea = "";

document.addEventListener('keydown', function(event){
   if(disable==true){
    return;
   }
    if(event.key=='Backspace'){
        TextArea.innerText = TextArea.innerText.slice(0, -1); // Handle Backspace key - remove the last character
    }else{
        for(var i = 0; i < listItems.length; i++){
            if(event.key == listItems[i].innerText){
                TextArea.innerText = TextArea.innerText + event.key;
                const soundpath = listItems[i].getAttribute('data-sound');
                playSound(soundpath);
                activateKey(listItems[i]);
            }
        }
    }
});

document.addEventListener('keyup', function(event){
    for(var i = 0; i < listItems.length; i++){
        if(event.key == listItems[i].innerText){
            switchOffKey(listItems[i]);
        }
    }
});

//----------------------------------------------------------
// options :

document.addEventListener('DOMContentLoaded', function () {
    const playIcon = document.getElementById('playIcon');
    const penIcon = document.getElementById('penIcon');
    const closeIcon = document.getElementById('closeIcon');
    const validerBtn = document.getElementById('valider');

    const textareaContainer = document.getElementById('textAreaContainer');

    playIcon.addEventListener('click', async function () {
        const notes = TextArea.innerText;
        const noteArray = notes.split('');
        for (const note of noteArray) {
            const matchingListItem = Array.from(listItems).find(item => item.innerText === note);
            if (matchingListItem) {
                const soundPath = matchingListItem.getAttribute('data-sound');
                playSound(soundPath);
                activateKey(matchingListItem);
                await sleep(800);
                switchOffKey(matchingListItem);
            }
        }
    });

    penIcon.addEventListener('click', function () {
        disable=true;
        textareaContainer.style.display = 'block';
    });

    closeIcon.addEventListener('click', function () {
        textareaContainer.style.display = 'none';
        disable=false;
        textareaContainer.querySelector("textarea").value='';
    });

    validerBtn.addEventListener('click', function () {
        textareaContainer.style.display = 'none';
        textInsideTextarea = textareaContainer.querySelector("textarea").value;
        TextArea.innerText = textInsideTextarea;
        disable=false;
        textareaContainer.querySelector("textarea").value='';
    });
});

//--------------------------------------------------------------
//functions :

function playSound(soundPath) {
    const audio = new Audio(soundPath);
    audio.currentTime = 0; // the currentTime property of the Audio object represents the playback position in seconds. Setting currentTime to 0 ensures that the audio starts playing from the beginning, regardless of its previous playback state. This is particularly useful when a key is pressed rapidly in succession.
    audio.play();
}

function activateKey(item){
    if(item.classList.contains('white')){
        item.style.borderTop = '1px solid #777';
        item.style.borderLeft = '1px solid #999';
        item.style.borderBottom = '1px solid #999';
        item.style.boxShadow = '2px 0 3px rgba(0,0,0,0.1) inset,-5px 5px 20px rgba(0,0,0,0.2) inset,0 0 3px rgba(0,0,0,0.2)';
        item.style.background = 'linear-gradient(to bottom,#fff 0%,#e9e9e9 100%)';
    }else { //black
        item.style.boxShadow='-1px -1px 2px rgba(255,255,255,0.2) inset,0 -2px 2px 3px rgba(0,0,0,0.6) inset,0 1px 2px rgba(0,0,0,0.5)';
        item.style.background = 'linear-gradient(to right,#444 0%,#222 100%)';
    }    
}

function switchOffKey(item){
    if(item.classList.contains('white')){
        item.style.borderTop = '';
        item.style.borderLeft ='';
        item.style.borderBottom = '';
        item.style.boxShadow = '';
        item.style.background = '';
    }else {
        item.style.boxShadow = '';
        item.style.background = '';
    }  
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}