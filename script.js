const resultElement = document.getElementById('result');
const clearBtn = document.getElementById('clear-button');
const deleteBtn = document.getElementById('delete-button');
const bracketBtn1 = document.getElementById('bracket-button1');
const bracketBtn2 = document.getElementById('bracket-button2');
const multiplyBtn = document.getElementById('multiply-button');
const ansBtn = document.getElementById('ans-button');
const divideBtn = document.getElementById('divide-button');
const addBtn = document.getElementById('add-button');
const subtractBtn = document.getElementById('subtract-button');
const moduloBtn = document.getElementById('modulo-button');
const squarerootBtn = document.getElementById('square-root-button');
const decimalBtn = document.getElementById('decimal-button');
const addsubtractBtn = document.getElementById('add-subtract-button');
const enterBtn = document.getElementById('enter');
const numberBtns = document.querySelectorAll('.number')

let result = '';
let operation = '';
let previousOperand = 0;
let ansResult = '';


function appendToResult(value) {
    result += value;
    updateDisplay();
}

const updateDisplay = () => {
    if(operation){
        resultElement.innerText = `${previousOperand} ${operation} ${result}`;
    }
    else{
    resultElement.innerText = result;
    }
}

const selectOperator = (operatorValue) => {
    if(result === '') return;

    if(operation !== '' && previousOperand !== ''){
        calculateResult();
    }

    operation = operatorValue;
    previousOperand =  result;
    result = '';
    updateDisplay();
}

const toggleSign = () => {
    if (result !== '' && !isNaN(result)) {
        result = (parseFloat(result) * -1).toString();
        updateDisplay();
    }
};

addsubtractBtn.addEventListener('click', toggleSign);

const calculateResult = () => {
    console.log('Calculating result...');
    let evaluatedResult;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(result);
    
    if(isNaN(prev) || isNaN(current)) {
        console.log('Invalid calculation. Returning.');
        return;
    }

    switch (operation) {
        case '+':
            evaluatedResult = prev + current;
            break;
        case '-':
            evaluatedResult = prev - current;
            break;
        case '*':
            evaluatedResult = prev * current;
            break;
        case '/':
            evaluatedResult = prev / current;
            break;
        case '%':
            evaluatedResult = prev % current;
            break;
    
        default:
            console.log('No operation. Updating display with current result.');
            resultElement.innerText = result;
            return;
    }
    result = evaluatedResult.toString();
    ansResult = result;
    result = evaluateExpression(result);
    operation = '';
    previousOperand = '';
    console.log('Calculation complete. Result:', result);
}
 
function appendNumber(number) {
    if (number === '.' && result.includes('.')) return;
    
    appendToResult(number);
}

numberBtns.forEach(button => {
    button.addEventListener('click', ()=> {
        appendNumber(button.innerText);
    });
});

const clearDisplay = () => {
    result = '';
    previousOperand = '';
    operation = '';
    updateDisplay();
}

const deleteLastDigit = () => {
    if(result === '') return;
    const lastChar = result.slice(-1);
    const isOperator = ['+', '-', '*', '/'].includes(lastChar);

    result = isOperator ? result.slice(0, -2) : result.slice(0, -1);
    updateDisplay();
}

squarerootBtn.addEventListener('click', () => {
    if (result === '') return;
    const current = parseFloat(result);
    if (isNaN(current)) return;

    const squareRootResult = Math.sqrt(current);
    result = squareRootResult.toString();
    operation = '';
    previousOperand = '';
    updateDisplay();
});

const answerBtn = document.getElementById('ans-button');
ansBtn.addEventListener('click', () => {
   
    appendToResult(ansResult);
});

decimalBtn.addEventListener('click', ()=> appendNumber('.'));
addBtn.addEventListener('click', ()=> selectOperator('+'));
subtractBtn.addEventListener('click', ()=> selectOperator('-'));
multiplyBtn.addEventListener('click', ()=> selectOperator('*'));
divideBtn.addEventListener('click', ()=> selectOperator("/"));
moduloBtn.addEventListener('click', ()=> selectOperator("%"));
enterBtn.addEventListener('click', () => {
    if(result === '') return;
    calculateResult();
    
    updateDisplay();
})

clearBtn.addEventListener('click', clearDisplay);
deleteBtn.addEventListener('click', deleteLastDigit);

