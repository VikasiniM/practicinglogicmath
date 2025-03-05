const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let operator = null;
let firstOperand = '';
let secondOperand = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (value === 'C') {
            currentInput = '';
            operator = null;
            firstOperand = '';
            secondOperand = '';
            display.textContent = '0';
        } else if (value === 'backspace') {
            currentInput = currentInput.slice(0, -1);
            display.textContent = currentInput || '0';
        } else if (value === '=') {
            if (operator && firstOperand && currentInput) {
                secondOperand = currentInput;
                const result = calculate(firstOperand, secondOperand, operator);
                display.textContent = result;
                currentInput = result;
                operator = null;
                firstOperand = '';
                secondOperand = '';
            }
        } else if (['+', '-', '*', '/'].includes(value)) {
            if (currentInput) {
                if (operator) {
                    secondOperand = currentInput;
                    const result = calculate(firstOperand, secondOperand, operator);
                    display.textContent = result;
                    currentInput = result;
                } else {
                    firstOperand = currentInput;
                }
                operator = value;
                currentInput = '';
            }
        } else {
            if (value === '.' && currentInput.includes('.')) return;
            currentInput += value;
            display.textContent = currentInput;
        }
    });
});

function calculate(a, b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);

    switch (operator) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b !== 0 ? a / b : 'Error';
        default: return 'Error';
    }
}