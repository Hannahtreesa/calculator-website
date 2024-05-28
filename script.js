
document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('user-input');
    const keys = document.querySelectorAll('button');

    let currentInput = '0';
    let previousInput = '';
    let operator = '';
    let resultDisplayed = false;
    let operationSequence = '';

    function updateDisplay() {
        userInput.textContent = operationSequence + currentInput;
    }

    function handleNumber(num) {
        if (resultDisplayed) {
            currentInput = num;
            resultDisplayed = false;
            operationSequence = '';
        } else {
            currentInput = currentInput === '0' ? num : currentInput + num;
        }
        updateDisplay();
    }

    function handleOperator(op) {
        if (operator && !resultDisplayed) {
            previousInput = currentInput;
            operationSequence += previousInput + ' ' + operator + ' ';
            currentInput = '0';
        } else if (!resultDisplayed) {
            previousInput = currentInput;
            operationSequence += previousInput + ' ' + op + ' ';
            currentInput = '0';
        } else {
            operationSequence = currentInput + ' ' + op + ' ';
        }
        operator = op;
        resultDisplayed = false;
        updateDisplay();
    }

    function handleEquals() {
        if (operator && previousInput) {
            const firstOperand = parseFloat(previousInput);
            const secondOperand = parseFloat(currentInput);
            let result = 0;

            switch (operator) {
                case '+':
                    result = firstOperand + secondOperand;
                    break;
                case '-':
                    result = firstOperand - secondOperand;
                    break;
                case '*':
                    result = firstOperand * secondOperand;
                    break;
                case '/':
                    result = firstOperand / secondOperand;
                    break;
                case '%':
                    result = firstOperand % secondOperand;
                    break;
                default:
                    return;
            }

            operationSequence += currentInput + ' = ';
            currentInput = result.toString();
            updateDisplay();
            previousInput = '';
            operator = '';
            resultDisplayed = true;
        }
    }

    function handleClear() {
        currentInput = '0';
        previousInput = '';
        operator = '';
        operationSequence = '';
        updateDisplay();
    }

    function handleDelete() {
        if (currentInput.length > 1) {
            currentInput = currentInput.slice(0, -1);
        } else {
            currentInput = '0';
        }
        updateDisplay();
    }

    keys.forEach(key => {
        key.addEventListener('click', function() {
            const keyText = this.textContent;

            if (!isNaN(keyText) || keyText === '.') {
                handleNumber(keyText);
            } else if (keyText === 'AC') {
                handleClear();
            } else if (keyText === 'DEL') {
                handleDelete();
            } else if (keyText === '=') {
                handleEquals();
            } else {
                handleOperator(keyText);
            }
        });
    });
});
