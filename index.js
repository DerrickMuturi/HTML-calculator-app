const calculator = document.querySelector(".container")
const keys = calculator.querySelector(".calculator__keys");
const display = document.querySelector(".calculator__display");



// calculate 
function calculate(n1, operator, n2) {
    const firstValue = parseFloat(n1)
    const secondValue = parseFloat(n2)

    if (operator === 'add') return firstValue + secondValue
    if (operator === 'subtract') return firstValue - secondValue
    if (operator === 'multiply') return firstValue * secondValue
    if (operator ===  'divide') return firstValue / secondValue
}

keys.addEventListener("click", e => {
    if (e.target.matches('button')) {
        const key = e.target // object that was clicked
        const keyContent = key.textContent; // content of key
        const displayedNum = display.textContent; // what is displayed
        const action = key.dataset.action; // data-action of pressed key
        const previousKeyType = calculator.dataset.previousKeyType;


        if (!action) {
            if (displayedNum === '0' || previousKeyType === 'operator') {
                calculator.dataset.previousKey = 'number'
                display.textContent = keyContent
            } else {
            display.textContent = displayedNum + keyContent
            }
        }

        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action ===  'divide'
        ) {

            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum
            
            if (firstValue && operator) {  
                display.textContent = calculate(firstValue, operator, secondValue)
            }
        
            key.classList.add('is-depressed')
            Array.from(key.parentNode.children).forEach(
                k => k.classList.remove('is-depressed')
            )

            
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.firstValue = displayedNum
            calculator.dataset.operator = action

        }

        if (action === 'decimal') {
            if (!displayedNum.includes(".")) {
            display.textContent = displayedNum + '.'
            } else {
                display.textContent = '0.'
            }
            calculator.dataset.previousKey = 'decimal'
        }

        
        if (action === 'clear') {
            calculator.dataset.previousKeyType = 'clear'
            calculator.dataset.previousKeyType = ''
            calculator.dataset.firstValue = ''
            calculator.dataset.operator = ''

            display.textContent = 0
        }

        if (action === 'calculate') {
            calculator.dataset.previousKeyType = 'calculate'
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum

            display.textContent = calculate(firstValue, operator, secondValue)
        }
    }

})