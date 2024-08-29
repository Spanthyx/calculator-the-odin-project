// TODO : Make names consistent
// TODO : Watch output, so it isn't too big

// Variables

let firstNum;
let operator;
let secondNum;

let displayValue;
let display = document.querySelector("#display");
let displayingResult;

let operatorButtonsList = Array.from(document.querySelectorAll(".btn-operator"));


// Setup

document.addEventListener("DOMContentLoaded", () => {
    resetAll();
    setUpNumberButtons();
    setUpClear();
    setUpOperatorButtons();
    setUpEvalButton();
    setUpDecimalButton();
    setUpDeleteButton();
    setUpKeyBoardSupport();
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
        case "X":
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
    setUpOperatorButtons();
}

function updateDisplay() {
    display.textContent = displayValue;
}

function setUpNumberButtons() {
    for (let i = 0; i <= 9; i++) {
        document.querySelector(`#btn-${i}`)
                .addEventListener("click", (i) => numberButtonClicked(i));
        document.querySelector(`#btn-${i}`)
                .addEventListener("mousedown", e => {
                    e.target.style.opacity = 0.5; 
                });
        document.querySelector(`#btn-${i}`)
                .addEventListener("mouseup", e => {
                    e.target.style.opacity = 1; 
                });
        document.querySelector(`#btn-${i}`)
                .addEventListener("mouseleave", e => {
                    e.target.style.opacity = 1; 
                });
    }
}

function setUpClear() {
    document.querySelector(`#btn-c`)
            .addEventListener("click", () => resetAll());
    document.querySelector(`#btn-c`)
            .addEventListener("mousedown", e => {
                e.target.style.backgroundColor = `rgb(0, 255, 255)`; 
            });
    document.querySelector(`#btn-c`)
            .addEventListener("mouseup", e => {
                e.target.style.backgroundColor = `rgb(255, 115, 0)`;
            });
    document.querySelector(`#btn-c`)
            .addEventListener("mouseleave", e => {
                e.target.style.backgroundColor = `rgb(255, 115, 0)`;
            });
}

function setUpOperatorButtons() {
    operatorButtonsList.forEach((btn) => {
        btn.style.backgroundColor = `rgb(0, 255, 255)`;
        btn.addEventListener("click", e => operatorButtonClicked(e));
        btn.addEventListener("mousedown", e => {
            e.target.style.backgroundColor = `rgb(255, 115, 0)`; 
        });
    })
}

function setUpEvalButton() {
    document.querySelector(`#btn-eval`).addEventListener("click", () => evaluate());
    document.querySelector(`#btn-eval`)
            .addEventListener("mousedown", e => {
                e.target.style.backgroundColor = `rgb(255, 115, 0)`;
            });
    document.querySelector(`#btn-eval`)
            .addEventListener("mouseup", e => {
                e.target.style.backgroundColor = `rgb(0, 255, 255)`; 
            });
    document.querySelector(`#btn-eval`)
            .addEventListener("mouseleave", e => {
                e.target.style.backgroundColor = `rgb(0, 255, 255)`; 
            });
}

function setUpDecimalButton() {
    document.querySelector("#btn-decimal").addEventListener("click", () => handleDecimal());
    document.querySelector(`#btn-decimal`)
            .addEventListener("mousedown", e => {
                e.target.style.opacity = 0.5; 
            });
    document.querySelector(`#btn-decimal`)
            .addEventListener("mouseup", e => {
                e.target.style.opacity = 1; 
            });
    document.querySelector(`#btn-decimal`)
            .addEventListener("mouseleave", e => {
                e.target.style.opacity = 1; 
            });
}

function setUpDeleteButton() {
    document.querySelector("#btn-del")
            .addEventListener("click", () => delButtonClicked());
    document.querySelector(`#btn-del`)
            .addEventListener("mousedown", e => {
                e.target.style.backgroundColor = `rgb(0, 255, 255)`; 
            });
    document.querySelector(`#btn-del`)
            .addEventListener("mouseup", e => {
                e.target.style.backgroundColor = `rgb(255, 115, 0)`;
            });
    document.querySelector(`#btn-del`)
            .addEventListener("mouseleave", e => {
                e.target.style.backgroundColor = `rgb(255, 115, 0)`;
            });
}


function setUpKeyBoardSupport() {
    
}

function evaluate() {
    if (firstNum !== "" && operator !== "") {
        setUpOperatorButtons();
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
    } else if (displayValue.length < 7) {
        displayValue += `${num}`;
    }
    updateDisplay();
}

function operatorButtonClicked(event) {
    let newOperator = event.target.textContent;
    if (firstNum !== "" && operator !== "" && !waitingForSecondNum) {
        evaluate();
    }
    operatorButtonsList.forEach((btn) => {
        if (btn.textContent === newOperator) {
            btn.style.backgroundColor = `rgb(255, 115, 0)`;
        } else {
            btn.style.backgroundColor = `rgb(0, 255, 255)`; 
        }
    })
    operator = newOperator;
    firstNum = Number(displayValue);
    waitingForSecondNum = true;
}

function handleDecimal() {
    if (!displayValue.includes(".")) {
        if (displayValue === "0" || display.textContent === "NaN" || displayingResult || waitingForSecondNum) {
            displayingResult = false;
            waitingForSecondNum = false;
            displayValue = "0.";
        } else if (displayValue.length < 7) {
            displayValue += ".";
        }
        updateDisplay();
    }
}

function delButtonClicked() {
    if (!(displayingResult || operator !== "" && waitingForSecondNum)) {
        if (displayValue.length === 1) {
            displayValue = "0";
        } else if (displayValue.length > 1) {
            displayValue = displayValue.slice(0, displayValue.length - 1);
        }
        updateDisplay();
    }
}