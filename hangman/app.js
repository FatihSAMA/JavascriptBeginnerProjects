"use strict";
const word_el = document.getElementById('word');
const popup = document.getElementById('popup-container');
const popup_box = document.querySelector('.popup');
const message_el = document.getElementById('succes-mesage');
const wrongLetters_el = document.querySelector('.wrong-letterss');
const items = document.querySelectorAll(".item");
const playAgainBtn = document.getElementById('play-again')



const correctLetters = [];
const wrongLetters = [];
const word = getRandomWord();

function getRandomWord(){
    const words = ["javascript", "java", "python"];

    return words[Math.floor(Math.random() * words.length)];
}




function writeLetters(){
    
   
    word_el.innerHTML = `${
        word.split("").map(letter => `
            <div class="letter">
                ${correctLetters.includes(letter) ? letter: ''}
            </div>`
            ).join("")
        }`;
    const w = word_el.innerText.replace(/\n/g,"");
    if(w === word){
        popup.style.display = "flex";
        message_el.innerText = "Tebrikler kazandınız.";
    }
}


function isIncluded(key, array){
    for (const k of array) {
        
        if(k == key){return true;}
    }
    return false;
}


writeLetters();


window.addEventListener('keydown', function(e){

    if(e.keyCode >= 65 && e.keyCode <= 90){
        const letter = e.key;

        if(word.includes(letter)){
            if(!isIncluded(letter, correctLetters)){
                correctLetters.push(letter);
                writeLetters();
                console.log(correctLetters);
            }
        }  
        else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                wrongLetters_el.innerText = wrongLetters.join("");

                items.forEach((item, index) => {
                    if(index < wrongLetters.length){
                        item.style.display = 'block';
                    }
                    else{
                        item.style.display = 'none';
                    }
                });

                if(wrongLetters.length == 6){
                    popup.style.display = "flex";
                    popup_box.style.backgroundColor = "red";
                    message_el.innerText = "Kaybettiniz";
                }

            }
        }

    }

});


playAgainBtn.addEventListener('click', function(){
    location.reload();
});
