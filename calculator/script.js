let warnings = document.getElementById("warnings");

//history toggle
let historyPopup = document.getElementById("popup-history");
let historyIcon = document.getElementById("history")
historyIcon.addEventListener("click", () =>{
    historyPopup.classList.toggle("history-disappear");
    historyPopup.classList.toggle("history-appear");
});

//delete history
let deleteHistoryIcon = document.getElementById("delete-icon");
let historyList = document.getElementById("history-list");
deleteHistoryIcon.addEventListener("click", () =>{
    historyList.textContent = "";
});

//button clicks
let btns = document.querySelectorAll(".btns");
let currentOp = document.getElementById("currentOp"); 
let result = document.getElementById("result");


let currentText = "";

btns.forEach(btn => {
    btn.addEventListener("click", e =>{
        currentOp.textContent = "";
        if(currentText.length <= 20){
            currentText = currentText.concat(e.target.textContent);
            currentOp.textContent = currentText;
            warnings.textContent = "";
        }
        else{
            currentOp.textContent = currentText;
            warnings.textContent = "You've reached the limit of the display."
        }
    });
});

//sign change
let signChange = document.getElementById("sign-change");
signChange.addEventListener("click", () =>{
        currentText = currentOp.textContent;
        if(currentText === ""){
            currentText = "-";   
        }
        else if(currentOp.textContent == "Infinity"){
            warnings.textContent = "Infinity is Infinity. :p \n Changing signs won't stop infinity."
        }
        else{
            let currentTextArr = currentText.split("");
            if(currentTextArr[0] === "-"){
                currentTextArr.shift();
                currentText = currentTextArr.join("");
            }
            else{
                currentTextArr.unshift("-");
                currentText = currentTextArr.join("");
            }
        }
        currentOp.textContent = currentText;
});

//adding operator
let operators = document.querySelectorAll(".operators");

operators.forEach(operator => {
    operator.addEventListener("click", e =>{
        currentText = "";
        if(currentOp.textContent === "" && result.textContent !== ""){
            warnings.textContent = "Please evaluate what's the screen first.";
        }
        else if(currentOp.textContent === "."){
            currentText += ".";
            warnings.textContent = "Cannot evaluate non-numbers."
        }
        else if(currentOp.textContent.includes("Infinity")){
            warnings.textContent = "Infinity is Infinity. :p \n Please try other operations."
        }
        else{
            if(!currentOp.textContent.includes("^")){
                if(currentOp.textContent === "" && result.textContent === ""){
                    warnings.textContent = "Please enter a number before clicking on a operator."
                }
                else{
                    if(result.textContent.match(/^[-\d\.]+(e[\+\-]\d+)*\s[\+\-\x\÷]+\s$/)){
                        warnings.textContent = "Please calculate what's on the screen first, and then try to use another operator."
                    }
                    else{
                        result.textContent = currentOp.textContent + " " + e.target.textContent + " ";
                        currentOp.textContent = "";
                        warnings.textContent = "";
                    }
                }
            }
            else{
                warnings.textContent = "Calculate '^' first."
            }
        }
    });
});

//special buttons click
    //all clear
let AC = document.getElementById("AC");

AC.addEventListener("click", () => {
    currentOp.textContent = "";
    currentText = "";
    result.textContent = "";
    warnings.textContent = "";
});

    //clear
let C = document.getElementById("C");

C.addEventListener("click", () => {
    currentText = "";
    currentOp.textContent = "";
    warnings.textContent = "";
});

    //backspace
let backspace = document.getElementById("backspace");

backspace.addEventListener("click", () => {
    let splittedStr = currentOp.textContent.split("");
    splittedStr.pop();
    currentText = splittedStr.join("");
    currentOp.textContent = currentText.trim();
    warnings.textContent = "";
});

    //floats
let point = document.getElementById("point");

point.addEventListener("click", (e) =>{
    // currentOp.textContent = "";
    if(!currentOp.textContent.includes("^")){
        if (!currentText.includes(e.target.textContent)){
            currentText += e.target.textContent;
            currentOp.textContent = currentText;
        }
        else{
            currentOp.textContent = currentText;
            warnings.textContent = "You can't put multple decimal points."
        }
    }
    else{
        let splittedCaret = currentOp.textContent.split(" ^ ");
        let afterCaret = splittedCaret[splittedCaret.length - 1];
        if(afterCaret.includes(e.target.textContent)){
            currentOp.textContent = currentText;
            warnings.textContent = "You can't put multple decimal points."
        }
        else{
            currentText += e.target.textContent;
            currentOp.textContent = currentText;
        }
    }
});

    //equals
let equals = document.getElementById("equals");
let compareHistory = "";

equals.addEventListener("click", () =>{
        //when clear is pressed, re-evaluate the equation
    if(result.textContent.match(/^[-\d\.]+(e[\+\-]\d+)*\s[\+\-\^\x\÷]\s[-\d\.]+$/) && currentOp.textContent === ""){
        currentOp.textContent = operate(result.textContent);
    }

    if(currentOp.textContent.includes("^")){
        if(currentOp.textContent.match(/^[\-\d\.]+(e[\+\-]\d+)*\s\^\s[\-\d\.]+$/)){
            result.textContent = currentOp.textContent;
            currentOp.textContent = operate(currentOp.textContent);
            warnings.textContent ="";
            currentText = "";
        }
        else{
            warnings.textContent = "Cannot evaluate non-numbers."
        }
    }
    else{
        if(result.textContent.match(/^[-\d\.]+(e[\+\-]\d+)*\s[\+\-\x\÷]\s$/)){
            if(currentOp.textContent !== "" && currentOp.textContent !== "."){
                result.textContent = result.textContent.concat(currentOp.textContent);
                currentOp.textContent = operate(result.textContent);
                warnings.textContent ="";
                currentText = "";
            }
            else{
                if(result.textContent.match(/^[-\d\.]+(e[\+\-]\d+)*\s[\+\-\x\÷]\s[-\d\.]+$/)){
                    currentOp.textContent = operate(result.textContent);
                }
                else{
                    warnings.textContent = "Cannot evaluate non-numbers."
                }
            }
        }
    }

    if(operate(result.textContent) == currentOp.textContent){
            let li = document.createElement("li");
            li.textContent = result.textContent;

        if(compareHistory !== li.textContent){
            compareHistory = li.textContent;

            let li2 = document.createElement("li");
            li2.textContent = `= ${currentOp.textContent}`;
            let line = document.createElement("hr");
            historyList.appendChild(li);
            historyList.appendChild(li2);
            historyList.appendChild(line);
        }
    }   
});

    //power
let power = document.getElementById("power");

power.addEventListener("click", () =>{
    if(currentOp.textContent === ""){
        warnings.textContent = "Please enter a number first.";
    }
    else if(currentOp.textContent === "."){
        warnings.textContent = "Please enter a valid number.";
    }
    else if(currentOp.textContent.includes("Infinity")){
        warnings.textContent = "Infinity is Infinity. :p \n Please try other operations."
    }
    else{
        if(result.textContent.match(/^[-\d\.]+(e[\+\-]\d+)*\s[\+\-\x\÷\^]\s[\d\.]+$/)){
            if (!currentText.includes("^")){
                currentText = currentOp.textContent.concat(` ^ `);
                currentOp.textContent = currentText;
            }
            else{
                warnings.textContent = "You can't have multiple '^'."
            }
        }
        if(result.textContent === ""){
            if (!currentText.includes("^")){
                currentText = currentText.concat(` ^ `);
                currentOp.textContent = currentText;
            }
            else{
                warnings.textContent = "You can't have multiple '^'."
            }
        }
    } 
    
    if(result.textContent.match(/^[\d\.]+(e[\+\-]\d+)*\s[\+\-\x\÷]\s$/)){
        warnings.textContent = "You can only operate one pair of numbers at a time."
    }
});


//split string and operate
function operate(str){
    let strArr = str.split(" ");
    let num1 = +strArr[0];
    let num2 = +strArr[strArr.length - 1];
    let operator = strArr[1];

    return calculate(num1, num2, operator);
}

// calculations
function calculate(num1, num2, operator){
    if(isNaN(num1) || isNaN(num2)){
        warnings.textContent = "Cannot compute non-numbers."
    }

    switch (operator){
        case "+": 
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "x":
            return num1 * num2;
        case "÷":
            if(num2 === 0){
                warnings.textContent = "You can't divide by 0."
                return "undefined";
            }
            return num1 / num2;
        case "^":
            return Math.pow(num1, num2);
    }
}

// keyboard-enabled
let zero = document.getElementById("0");
let one = document.getElementById("1");
let two = document.getElementById("2");
let three = document.getElementById("3");
let four = document.getElementById("4");
let five = document.getElementById("5");
let six = document.getElementById("6");
let seven = document.getElementById("7");
let eight = document.getElementById("8");
let nine = document.getElementById("9");
let times = document.getElementById("x");
let plus = document.getElementById("+");
let minus = document.getElementById("-");
let divide = document.getElementById("/");

window.addEventListener("keydown", e =>{
    switch(e.key){
        case "Backspace":
            backspace.click();
            break;
        case "c":
            C.click();
            break;
        case "h":
            historyIcon.click();
            break;
        case "Escape":
            AC.click();
            break;
        case "Delete":
            deleteHistoryIcon.click();
            break;
        case ".":
            point.click();
            break;
        case "Enter":
            equals.click();
            break;
        case "0":
            zero.click();
            break;
        case "1":
            one.click();
            break;
        case "2":
            two.click();
            break;
        case "3":
            three.click();
            break;
        case "4":
            four.click();
            break;
        case "5":
            five.click();
            break;
        case "6":
            six.click();
            break;
        case "7":
            seven.click();
            break;
        case "8":
            eight.click();
            break;
        case "9":
            nine.click();
            break;
        case "+":
            plus.click();
            break;
        case "-":
            minus.click();
            break;
        case "*":
        case "x":
            times.click();
            break;
        case "/":
            divide.click();
            break;
        case "^":
            power.click();
            break;
        case "`":
            signChange.click();
            break;
        default:
            warnings.textContent = `"${e.key}" doesn't have a shortcut. Refer to the shortcuts at the bottom of the page.` 
    }
});
