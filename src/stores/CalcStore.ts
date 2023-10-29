import { defineStore } from 'pinia'

export const useCalcStore = defineStore('calculator', {
    state: () => ({
        inputValue: '',
        result: 0,
        operation: '',
        error: '',
    }),
    actions: {
        validateLastCharacter() {
            const lastCharacter = this.inputValue[this.inputValue.length - 1]
            return this.operations.includes(lastCharacter)
        },
        filterInput() {
            this.inputValue = this.inputValue.replace(/[^0-9+\-*/.]/g, '')
        },
        setOperation(op: string) {
            this.operation = op
            const regex = /[a-zA-Z]/

            if (
                !regex.test(op) &&
                op !== '**' &&
                this.inputValue.length !== 0 &&
                !this.validateLastCharacter()
            ) {
                this.inputValue += op
            }
        },
        evaluateExpression(expression: string) {
            return eval(expression)
        },
        squareRoot(expression: string) {
            return Math.sqrt(eval(expression))
        },
        factorial(expression: string) {
            return this.factorialHelper(eval(expression))
        },
        log10(expression: string) {
            return Math.log10(eval(expression))
        },
        sin(expression: string) {
            return Math.sin(eval(expression))
        },
        cos(expression: string) {
            return Math.cos(eval(expression))
        },
        tan(expression: string) {
            return Math.tan(eval(expression))
        },
        calculatePercentageAnywhere(expression: string) {
            const regex = /([-+]?\d*\.?\d+)(%)/g
            return expression.replace(regex, (match, value, _) => {
                return String(parseFloat(value) / 100)
            })
        },
        factorialHelper(n: number) {
            if (n === 0 || n === 1) {
                return 1
            }
            return n * this.factorialHelper(n - 1)
        },
        calculateResult() {
            let expression = this.inputValue
            if (expression.includes('%')) {
                expression = this.calculatePercentageAnywhere(expression)
            }
            if (this.validateLastCharacter()) {
                this.inputValue = this.inputValue.slice(0, -1)
            } else {
                try {
                    switch (this.operation) {
                        case 'sqrt':
                            this.result = this.squareRoot(expression)
                            break
                        case 'factorial':
                            this.result = this.factorial(expression)
                            break
                        case 'log':
                            this.result = this.log10(expression)
                            break
                        case 'sin':
                            this.result = this.sin(expression)
                            break
                        case 'cos':
                            this.result = this.cos(expression)
                            break
                        case 'tan':
                            this.result = this.tan(expression)
                            break
                        default:
                            this.result = this.evaluateExpression(expression)
                    }
                    this.inputValue = ''
                } catch (e) {
                    this.error = 'Invalid input or operation'
                }
            }
        },
    },
    getters: {
        operations() {
            return [
                '+',
                '-',
                '*',
                '/',
                '**',
                'sqrt',
                'factorial',
                'log',
                'sin',
                'cos',
                'tan',
                '%',
            ]
        },
    },
})
