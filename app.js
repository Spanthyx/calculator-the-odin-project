// Variables

let firstNum;
let operator;
let secondNum;

let displayValue;
let display = document.querySelector("#display");
let displayingResult;


// Setup

document.addEventListener("DOMContentLoaded", () => {
    resetAll();
    setUpNumberButtons();
    setUpClear();
    setUpOperatorButtons();
    setUpEvalButton();
  });



// Functions

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(firstNum, secondNum, operator) {
    let result;
    switch(operator) {
        case "+":
            result = add(firstNum, secondNum);
            break;
        case "-":
            result = subtract(firstNum, secondNum);
            break;
        case "x":
            result = multiply(firstNum, secondNum);
            break;
        case "/":
            if (secondNum === 0) {
                result = NaN;
            } else {
                result = divide(firstNum, secondNum);
            }
            break;
        default:
            result = null;
    }
    return result;
}

function resetAll() {
    firstNum = "";
    secondNum = "";
    operator = "";
    displayValue = "0";
    displayingResult = false;
    waitingForSecondNum = false;
    updateDisplay();
}

function updateDisplay() {
    display.textContent = displayValue;
}

function setUpNumberButtons() {
    for (let i = 0; i <= 9; i++) {
        document.querySelector(`#btn-${i}`)
                .addEventListener("click", (i) => numberButtonClicked(i));
    }
}

function setUpClear() {
    document.querySelector("#c")
            .addEventListener("click", () => resetAll());
}

function setUpOperatorButtons() {
    document.querySelector("#btn-divide")
            .addEventListener("click", e => operatorButtonClicked(e));
    document.querySelector("#btn-multiply")
            .addEventListener("click", e => operatorButtonClicked(e));
    document.querySelector("#btn-subtract")
            .addEventListener("click", e => operatorButtonClicked(e));
    document.querySelector("#btn-add")
            .addEventListener("click", e => operatorButtonClicked(e));
}

function setUpEvalButton() {
    document.querySelector("#btn-eval").addEventListener("click", () => evaluate());
}


function evaluate() {
    if (firstNum !== "" && operator !== "") {
        secondNum = Number(displayValue);
        displayValue = operate(firstNum, secondNum, operator);
        updateDisplay();
        operator = "";
        firstNum = displayValue;
        displayingResult = true;
    }
}

function numberButtonClicked(e) {
    let num = e.target.textContent;
    if (displayValue === "0" || display.textContent === "NaN" || displayingResult || waitingForSecondNum) {
        displayingResult = false;
        waitingForSecondNum = false;
        displayValue = `${num}`;
    } else {
        displayValue += `${num}`;
    }
    updateDisplay();
}

function operatorButtonClicked(event) {
    let newOperator = event.target.textContent;
    if (firstNum !== "" && operator !== "" && !waitingForSecondNum) {
        evaluate();
    }
    operator = newOperator;
    firstNum = Number(displayValue);
    waitingForSecondNum = true;
}