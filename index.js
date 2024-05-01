const calculator = document.querySelector(".calculator")
const keys = calculator.querySelector('.calculator__keys')
const display = calculator.querySelector('.calculator__display') 
const previousKeyType = calculator.dataset.previousKeyType

const calculate  = (n1, operator, n2) => {
    const firstNum = parseFloat(n1)
    const secondNum = parseFloat(n2)

    if (operator === 'add') return firstNum + secondNum
    if (operator === 'subtract') return firstNum - secondNum
    if (operator === 'multiply') return firstNum * secondNum
    if (operator === 'divide') return firstNum / secondNum
}

keys.addEventListener('click', e => {
  if (e.target.matches('button')) {
    const key = e.target
    const action = key.dataset.action
    const keyContent = key.textContent // number that was pressed
    const displayedNum = display.textContent // displayed number

    if (!action) {
        if (displayedNum === '0'  || previousKeyType === 'operator') {
            display.textContent = keyContent // display pressed number
        } else {
            display.textContent = displayedNum + keyContent // append pressed number 
        }
    }

    if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
    ) {
        key.classList.add('is-depressed')
        calculator.dataset.previousKeyType = 'operator'
        calculator.dataset.firstValue = displayedNum
        calculator.dataset.operator = action
    }

    Array.from(key.parentNode.children)
        .forEach(k => k.classList.remove("is-depressed"))

    if (action === 'decimal') {
        display.textContent =  displayedNum + "."
    }

    if (action ===  'clear') {
        display.textContent = '0'
    }

    if (action === 'calculate') {
        const firstValue = calculator.dataset.firstValue
        const operator = calculator.dataset.operator 
        const secondValue = displayedNum

        display.textContent = calculate(firstValue, operator, secondValue)
    }

  } 
})
