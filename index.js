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
            
            if (firstValue && 
                operator && 
                previousKeyType !== 'operator' &&
                previousKeyType !== 'calculate'
            ) {
                const calcValue = calculate(firstValue, operator, secondValue)
                display.textContent = calcValue

                // updating the last value to be the new firstValue
                calculator.dataset.firstValue = calcValue
            } else {
                    calculator.dataset.firstValue = displayedNum
            }
        
            key.classList.add('is-depressed')

            Array.from(key.parentNode.children)
                .forEach(k => k.classList.remove('is-depressed'))
                
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.firstValue = displayedNum
            calculator.dataset.operator = action

        }

        if (action === 'decimal') {
            if (!displayedNum.includes(".")) {
            display.textContent = displayedNum + '.'
            } else if (
                previousKeyType === 'operate' ||
                previousKeyType === 'calculate'
            ){
                display.textContent = '0.'
            }
            calculator.dataset.previousKey = 'decimal'
        }

        
        if (action === 'clear') {
            display.textContent = 0
            key.textContent = 'AC'

            calculator.dataset.previousKeyType = 'clear'
            calculator.dataset.previousKeyType = ''
            calculator.dataset.firstValue = ''
            calculator.dataset.operator = ''

        }

        if (action !== 'clear') {
            const clearButton = calculator.querySelector("[data-action=clear]")
            clearButton.textContent = 'CE'
        }

        if (action === 'calculate') {
            let firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            let secondValue = displayedNum

            if (firstValue) {
                if (previousKeyType === 'calculate') {
                    firstValue = displayedNum
                    secondValue = calculator.dataset.modValue
                }
                display.textContent = calculate(firstValue, operator, secondValue)
            }
            calculator.dataset.modValue = secondValue
            calculator.dataset.previousKeyType = 'calculate'
            
        }
    }

})