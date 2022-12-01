const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDisplay();


function updateDisplay(){
    display.value = displayValue;
}

keys.addEventListener('click', function(e){
    const element = e.target;

    if(!element.matches('button')) return;

    if(element.classList.contains('operator')){
        handleOperator(element.value);
        updateDisplay();
        return;
    }
    else if(element.classList.contains('decimal')){
        inputDecimal();
        return;
    }
    else if(element.classList.contains('clear')){
        clearDisplay();
        return;
    }

    inputNumber(element.value);

});

function calculate(first, second, operator){
    if(operator === '+'){
        return first + second;
    }
    else if(operator === "-"){
        return first - second;
    }else if(operator === "*"){
        return first * second;
    }else if(operator === "/"){
        return first / second;
    }

    return second;

}

function inputNumber(number){
    if(waitingForSecondValue){
        displayValue = number;
        waitingForSecondValue = false;
    }
    else{
        displayValue = displayValue === '0'? number: displayValue + number;

    }
    console.log(displayValue, firstValue, operator);
    updateDisplay();
}

function inputDecimal(){
    if(!displayValue.includes('.'))
        displayValue += '.';
    updateDisplay();
}

function clearDisplay(){
    displayValue = '0';
    firstValue = null;
    waitingForSecondValue = false;
    operator = null;
    updateDisplay();
}


function handleOperator(nextOperator){
    const value = parseFloat(displayValue);
    if(operator && waitingForSecondValue){
        operator = nextOperator;
        return;
    }

    if(firstValue === null)
        firstValue = value;
    else if(operator){
        const result = calculate(firstValue, value, operator, waitingForSecondValue);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstValue = result;
        
    }

    waitingForSecondValue = true;
    operator = nextOperator;

}
