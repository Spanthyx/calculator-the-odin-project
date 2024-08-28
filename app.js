// Variables

let firstNum;
let operator;
let secondNum;

let displayValue;
let display = document.querySelector("#display");


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

function setUpNumberButtons() {
    for (let i = 0; i <= 9; i++) {
        document.querySelector(`#btn-${i}`)
                .addEventListener("click", () => {
                    if (displayValue === "0" || display.textContent === "NaN") {
                        displayValue = `${i}`;
                    } else {
                        displayValue += `${i}`;
                    }
                    updateDisplay();
                });
    }
}

function resetAll() {
    firstNum = "";
    secondNum = "";
    operator = "";
    displayValue = "0";
    updateDisplay();
}

function updateDisplay() {
    display.textContent = displayValue;
}

function setUpClear() {
    document.querySelector("#c")
            .addEventListener("click", () => {
                resetAll();
            });
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


function operatorButtonClicked(event) {
    evaluate();
    operator = event.target.textContent;
    firstNum = Number(displayValue);
    displayValue = "0";
}


function setUpEvalButton() {
    const evalButton = document.querySelector("#btn-eval");
    evalButton.addEventListener("click", () => evaluate());
}


function evaluate() {
    if (firstNum !== "" && operator !== "") {
        secondNum = Number(displayValue);
        displayValue = operate(firstNum, secondNum, operator);
        updateDisplay();
        operator = "";
    }
}