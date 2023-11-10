class Calculator {
    previousOperandTextElement: HTMLElement;
    currentOperandTextElement: HTMLElement;
    currentOperand: string;
    previousOperand: string;
    operation: string | undefined;

    constructor(previousOperandTextElement: HTMLElement, currentOperandTextElement: HTMLElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    };

    clear(): void {
        this.currentOperand ='';
        this.previousOperand ='';
        this.operation = undefined;
    };

    delete(): void {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    };

    appendNumber(number:string): void {
        if (number === "." && this.currentOperand.includes('.')) {
            return;
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    };

    chooseOperation(operation: string): void{
        if (this.currentOperand === ''){
            return;
        }
        if (this.previousOperand !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    };

    compute(): void {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)){
            return;
        }
        switch (this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break       
            case '*':
                computation = prev * current
                break            
            case '÷':
                computation = prev / current
                break
                
            default:
                return
        }
        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
    
    };

    getDisplayNumber(number: string | number): string {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        const floatNumber = parseFloat(number);
        let integerDisplay;
        if (isNaN(integerDigits)){
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('fr', {
                maximumFractionDigits: 0,
            });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    };

    updateDisplay(): void {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null){
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = '';
        };   
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]') as HTMLElement | null;
const deleteButton = document.querySelector('[data-delete]') as HTMLElement | null;
const allClearButton = document.querySelector('[data-all-clear]') as HTMLElement | null;
const previousOperandTextElement = document.querySelector('[data-previous-operand]') as HTMLElement;
const currentOperandTextElement = document.querySelector('[data-current-operand]') as HTMLElement;

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach((button: HTMLElement) =>{
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();

    })
})

operationButtons.forEach((button: HTMLElement) =>{
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();

    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})