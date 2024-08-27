// Setup

setUpNumberButtons();


// Variables

let firstNum;
let operator;
let secondNum;

let displayValue = ``;



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
        case "add":
            result = add(firstNum, secondNum);
            break;
        case "subtract":
            result = subtract(firstNum, secondNum);
            break;
        case "multiply":
            result = multiply(firstNum, secondNum);
            break;
        case "divide":
            result = multiply(firstNum, secondNum);
            break;
        default:
            result = null;
    }
}


function setUpNumberButtons() {
    for (let i = 0; i <= 9; i++) {
        document.querySelector(`#btn-${i}`)
                .addEventListener("click", () => {
                    displayValue += `${i}`;
                    document.querySelector("#display")
                            .textContent = displayValue;
                });
    }
}

