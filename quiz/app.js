"use strict"

const option_list = document.querySelector(".option-list");
const correct_icon = '<div class="icon"><i class="fas fa-check"></i></div>'
const incorrect_icon = '<div class="icon"><i class="fas fa-times"></i></div>'
const btn_replay = document.querySelector(".btn-replay");
const btn_quit = document.querySelector(".btn-quit");
const time_text = document.querySelector(".time-text");
const time_second = document.querySelector(".time-second");
const quiz_time = 10;
const time_line = document.querySelector(".time-line");


function Quest(text, options, correct_answer){
    this.text = text;
    this.options = options;
    this.correct_answer = correct_answer;

}

Quest.prototype.checkAnswer = function(answer){
    return answer == this.correct_answer;
}

let questions = [
    new Quest("Hangisi javascript paket yönetim uygulamasıdır?", {a:"NodeJS", b:"npm", c:"Typesciprt"}, "b"),
    new Quest("Hangisi python paket yönetim uygulamasıdır?", {a:"pip", b:"tkinter", c:"npm"}, "a")
]

function Quiz(questions){
    this.questions = questions;
    this.questionIndex = 0;
    this.correctAnswerCount = 0;
}

Quiz.prototype.getQuest = function(){
    return this.questions[this.questionIndex];
}

const quiz = new Quiz(questions);


document.querySelector(".btn-start").addEventListener("click", function(){
    
    document.querySelector('.quiz-box').classList.add("active");
    showQuest(quiz.getQuest());
    soruSayisiGoster(quiz.questionIndex + 1, quiz.questions.length);
    startTimer(quiz_time);
    startTimerLine();   
    
});

document.querySelector('.next-btn').addEventListener("click",function(){
    document.querySelector('.next-btn').classList.remove("show");
    if(quiz.questions.length != quiz.questionIndex + 1 ){
        
        quiz.questionIndex += 1;
        clearInterval(counter);
        clearInterval(lineCounter);
        startTimer(quiz_time);
        startTimerLine();
        

        showQuest(quiz.getQuest());
        soruSayisiGoster(quiz.questionIndex + 1, quiz.questions.length);
       
        
    }else{
        // console.log("quiz bitti");
        clearInterval(counter);
        clearInterval(lineCounter);
        document.querySelector(".score-box").classList.add('active');
        document.querySelector('.quiz-box').classList.remove("active");
        showScore(quiz.correctAnswerCount, quiz.questions.length);
    }
    
});


function showQuest(question){
    let question_text = `<span>${(quiz.questionIndex + 1).toString()+ ") " + question.text}</span>`;
    
    let options_text = '';

    for (let answer in question.options) {
        options_text += `
        <div class="option">
            <span><b>${answer}</b>: ${question.options[answer]}</span>
        </div>
        `;
    }
    
   

    document.querySelector(".question-text").innerHTML = question_text;
    option_list.innerHTML = options_text;

    const options = option_list.querySelectorAll('.option');

    for(let opt of options){
        opt.setAttribute("onclick", "optionSelected(this)");
    }

}

function optionSelected(option){

    clearInterval(counter);
    clearInterval(lineCounter);

    let answer = option.querySelector('span b').textContent;
    let question = quiz.getQuest()


    if(question.checkAnswer(answer)){
        quiz.correctAnswerCount += 1;
        option.classList.add("correct");
        option.insertAdjacentHTML("beforeend",correct_icon);
    }else{
        option.classList.add("incorrect");
        option.insertAdjacentHTML("beforeend",incorrect_icon);
        
    }

    for(let i = 0; i < option_list.children.length;i++){
        option_list.children[i].classList.add("disabled");
    }

    document.querySelector('.next-btn').classList.add("show");
}

function soruSayisiGoster(soruSirasi, toplamSoru){
    let tag = `<span class="badge bg-warning">${soruSirasi} / ${toplamSoru}</span>`;
    document.querySelector(".quiz-box .question-index").innerHTML = tag;
}

function showScore(dogruCevap, toplamSoru){
    let tag = `Toplam ${toplamSoru} sorudan ${dogruCevap} doğru cevap verdiniz.`;
    document.querySelector(".score-box .score-text").innerHTML = tag;   
}




btn_quit.addEventListener("click", function(){
    window.location.reload();
});

btn_replay.addEventListener("click", function(){
    
    quiz.questionIndex = 0;
    quiz.correctAnswerCount = 0;

    document.querySelector(".btn-start").click();

    document.querySelector(".score-box").classList.remove("active");


});


let counter;
function startTimer(time){

    
    counter = setInterval(timer, 1000);

    function timer(){
        time_second.textContent = time;
        time--; 

        if(time < 0){
            clearInterval(counter);

            time_text.textContent = "Süre Bitti";

            let cevap = quiz.getQuest().correct_answer;

            for(let option of option_list.children){
                
                if(option.querySelector('span b').textContent == cevap){

                    option.classList.add("correct");
                    option.insertAdjacentHTML("beforeend", correct_icon);

                }

                option.classList.add("disabled");

            }

            document.querySelector('.next-btn').classList.add("show");

        }

    }
}



let lineCounter;
function startTimerLine(){
    let line_width = 0;

    lineCounter = setInterval(timer, 10);

    function timer(){
        line_width += (550/(quiz_time + 1))/100;
        time_line.style.width = line_width + "px";
        if(line_width >= 550){
            clearInterval(lineCounter);

        }
    }
}



