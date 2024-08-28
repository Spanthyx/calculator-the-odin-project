// Variables

let firstNum;
let operator;
let secondNum;

let displayValue;
let display = document.querySelector("#display");


// Setup

resetAll();
setUpNumberButtons();
setUpClear();
setUpOperatorButtons();



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
                    if (displayValue === "0") {
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
            .addEventListener("click", operatorButtonClicked(e));
    document.querySelector("#btn-multiply")
            .addEventListener("click", operatorButtonClicked(e));
    document.querySelector("#btn-subtract")
            .addEventListener("click", operatorButtonClicked(e));
    document.querySelector("#btn-add")
            .addEventListener("click", operatorButtonClicked(e));
}


function operatorButtonClicked(event) {
    operator = event.target.textContent;
    firstNum = displayValue;
    displayValue = "0";
}

