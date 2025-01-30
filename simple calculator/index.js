const display = document.getElementById("info");
const operators = ['+','-','/','*','%'];
const calcDisplay = document.querySelector('.calc-display #info');
const operand = document.getElementById("operand");

let leftoperand = null;
let operator = "";
let rightoperand = null;

function isValidOperator(input) {
    return operators.includes(input);
}
function isValidNumber(input) {
    return !isNaN(Number(input));
}
function scrollOutputToEnd() {
    display.scrollLeft = display.scrollWidth;
}

calcDisplay.addEventListener('wheel', (event) => {
    if (event.deltaY !== 0) {
        event.preventDefault();
        calcDisplay.scrollLeft += event.deltaY; 
    }
});


function appendingOperator(input) {
    if (leftoperand === null) {
        leftoperand = Number(display.textContent);
    }
    if (operator && rightoperand === null) {
        operator = input;
        operand.textContent = leftoperand + " " + operator;
        return;
    }

    if (operator && rightoperand !== null) {
        calculate();
    }

    operator = input;
    operand.textContent = leftoperand + " " + operator;
    display.textContent = "0";
}
function appendtodisplay(input) {
    if (isValidOperator(input)) {
        appendingOperator(input);
        return;
    }

    if (display.textContent === "0" || display.textContent === "Invalid Input") {
        display.textContent = input;
    } else {
        display.textContent += input;
    }

    if (operator) {
        rightoperand = Number(display.textContent);
    } else {
        leftoperand = Number(display.textContent);
    }
    scrollOutputToEnd();
}

function backspace() {
    if (display.textContent.length > 1) {
        display.textContent = display.textContent.slice(0, -1);
    } else {
        display.textContent = "0";
    }
}

function Clear() {
    display.textContent = "0";
    operand.textContent = "";
    leftoperand = null;
    rightoperand = null;
    operator = "";
}

function calculate() {
    try {
        if (leftoperand === null || rightoperand === null || !operator) {
            return;
        }

        let formula = leftoperand + operator + rightoperand;
        console.log("Formula:", formula);
        
        let result = eval(formula);
        operand.textContent = formula + " =";
        display.textContent = result;
        
        leftoperand = result;
        rightoperand = null;
        operator = "";
        display.scrollLeft = 0;
    } catch (error) {
        display.textContent = "Invalid Input";
        operand.textContent = "";
        display.style.fontSize = "45px";
    }
}
