
const display = document.getElementById("info");

const operators = ['+','-','/','*'];

const calcDisplay = document.querySelector('.calc-display #info ');

function isValidOperator(input){
    
    return operators.includes(input);
}
function isValidNumber(input)
{
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

document.addEventListener("keydown", (event) => {
    
    if(isValidNumber(event.key) || isValidOperator()){
        if(display.textContent  == "0" || display.textContent == "Invalid Input"){
            display.textContent = event.key
        }
        else{
            display.textContent += event.key
        }
    }
    if(event.key == "Enter" || event.key == "="){
        calculate();
    }
    if(event.key == "Backspace"){
        backspace();
    }
    if(event.key == "Delete"){
        Clear();
    }
    scrollOutputToEnd();
});

function appendtodisplay(input){
    if(display.textContent  == "0" || display.textContent == "Invalid Input"){
        display.textContent = input
    }
    else{
        display.textContent += input
    }
    scrollOutputToEnd();
}
function backspace(){
    if(!(display.textContent  == "0" || display.textContent == "Invalid Input" || display.textContent.toString().length == 1)){
        const str = display.textContent.toString();
        display.textContent = str.slice(0, -1);
    }
    else{
        display.textContent = "0";
    }
}
function Clear(){
    display.textContent = "0";
}
function calculate(){
    try {
        let result = eval(display.textContent);
        display.textContent = result;
        display.scrollLeft = 0;
    } catch (error) {
        display.textContent = "Invalid Input";
        display.style.fontSize = "45px"
    }
}