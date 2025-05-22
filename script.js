document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const numberButtons = document.querySelectorAll('.number');
    const operatorButtons = document.querySelectorAll('.operator');
    const equalsButton = document.getElementById('equals');
    const clearButton = document.getElementById('clear');
    const decimalButton = document.getElementById('decimal'); // Already part of .number querySelectorAll

    let currentDisplayValue = '0';
    let firstOperand = null;
    let operator = null;
    let shouldResetDisplay = false;

    function updateDisplay() {
        display.value = currentDisplayValue;
    }

    function appendNumber(number) {
        if (currentDisplayValue === '0' || shouldResetDisplay) {
            currentDisplayValue = number;
            shouldResetDisplay = false;
        } else {
            currentDisplayValue += number;
        }
        updateDisplay();
    }

    function appendDecimal() {
        if (shouldResetDisplay) {
            currentDisplayValue = '0.';
            shouldResetDisplay = false;
            updateDisplay();
            return;
        }
        if (!currentDisplayValue.includes('.')) {
            currentDisplayValue += '.';
            updateDisplay();
        }
    }

    function selectOperator(selectedOp) {
        // If an operator is chosen and we have a first operand, and we haven't reset the display
        // (i.e., a second number has been entered), calculate the intermediate result.
        // e.g. 5 + 3 + (calculate 5+3 first)
        if (operator !== null && firstOperand !== null && !shouldResetDisplay) {
            calculate();
        }

        // If currentDisplayValue is "Error", don't proceed with setting new operator
        if (currentDisplayValue === 'Error') {
            return;
        }

        firstOperand = parseFloat(currentDisplayValue);
        operator = selectedOp;
        shouldResetDisplay = true; // Prepare for the next number input
        // Display shows the first operand until a new number is typed
    }

    function calculate() {
        if (operator === null || shouldResetDisplay) {
            // No operator selected, or we are expecting a new number after an operator,
            // so 'equals' shouldn't do anything yet or is pressed without a second operand.
            return;
        }

        if (currentDisplayValue === 'Error') { // Don't calculate if already in error state
            return;
        }

        const secondOperand = parseFloat(currentDisplayValue);
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
                if (secondOperand === 0) {
                    currentDisplayValue = 'Error';
                    firstOperand = null;
                    operator = null;
                    shouldResetDisplay = true;
                    updateDisplay();
                    return;
                }
                result = firstOperand / secondOperand;
                break;
            default:
                return; // Should not happen
        }

        currentDisplayValue = String(result);
        firstOperand = result; // The result becomes the new first operand for chained operations
        operator = null; // Reset operator
        shouldResetDisplay = true; // Next number will start a new input
        updateDisplay();
    }

    function clearCalculator() {
        currentDisplayValue = '0';
        firstOperand = null;
        operator = null;
        shouldResetDisplay = false;
        updateDisplay();
    }

    // Event Listeners

    numberButtons.forEach(button => {
        if (button.id === 'decimal') {
            button.addEventListener('click', appendDecimal);
        } else {
            button.addEventListener('click', () => {
                // Handle case where current display is "Error"
                // If error, reset display to '0' before appending new number.
                // Also ensure shouldResetDisplay is false so it doesn't immediately get overwritten.
                if (currentDisplayValue === 'Error') {
                    currentDisplayValue = '0';
                    shouldResetDisplay = false; 
                }
                appendNumber(button.textContent);
            });
        }
    });

    operatorButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Allow changing operator if an operator is already selected but no new number entered
            if (shouldResetDisplay && firstOperand !== null) {
                 operator = button.id === 'add' ? '+' :
                           button.id === 'subtract' ? '-' :
                           button.id === 'multiply' ? '*' :
                           button.id === 'divide' ? '/' : null;
                // console.log("Operator changed to: " + operator);
                return; // Return after changing operator
            }
            // If display is error, and user clicks operator, reset error state first
            if (currentDisplayValue === 'Error') {
                clearCalculator(); // Or just reset the error part: display.value = firstOperand || '0';
                                   // For now, let's assume an operator after error means user wants to restart with current firstOperand if exists
                if(firstOperand !== null) {
                    currentDisplayValue = String(firstOperand);
                    updateDisplay();
                } else {
                    currentDisplayValue = '0'; // default if no firstOperand
                    updateDisplay();
                }
                shouldResetDisplay = false; // Allow new number input or operator selection
            }

            const opText = button.id === 'add' ? '+' :
                           button.id === 'subtract' ? '-' :
                           button.id === 'multiply' ? '*' :
                           button.id === 'divide' ? '/' : null;
            if (opText) {
                selectOperator(opText);
            }
        });
    });

    equalsButton.addEventListener('click', calculate);
    clearButton.addEventListener('click', clearCalculator);

    // Initialize display
    updateDisplay();
});
