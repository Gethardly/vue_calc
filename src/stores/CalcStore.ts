import { defineStore } from 'pinia'
import * as math from 'mathjs'

export const useCalcStore = defineStore('calculator', {
    state: () => ({
        inputValue: '',
        operation: '',
    }),
    getters: {
        operations() {
            return [
                'ce',
                '+',
                '-',
                '*',
                '/',
                '%',
                '^',
                'sqrt',
                'x!',
                'log',
                'sin',
                'cos',
                'tan',
                '(',
                ')',
                '.',
            ]
        },
    },
    actions: {
        backspaceValue() {
            this.inputValue = this.inputValue.slice(0, -1)
        },
        validateLastCharacter() {
            const exceptionCharacters = ['(', ')', '.', '%']
            const lastCharacter = this.inputValue[this.inputValue.length - 1]
            if (
                this.operations.includes(lastCharacter) &&
                !exceptionCharacters.includes(lastCharacter)
            ) {
                this.inputValue = this.inputValue.slice(0, -1)
            }
        },
        setOperation(op: string) {
            this.operation = op
            const regex = /[a-zA-Z]/

            if (!regex.test(op) && op !== 'ce') {
                const exceptionCharacters = ['(', '.']
                if (exceptionCharacters.includes(op)) {
                    this.inputValue += op
                } else if (
                    this.inputValue.length !== 0 &&
                    !this.validateLastCharacter()
                ) {
                    this.inputValue += op
                }
            } else if (op === 'ce') {
                this.inputValue = ''
            } else if (regex.test(op)) {
                this.calculateResult()
            }
        },
        evaluateExpression(expression: string) {
            return math.evaluate(expression)
        },
        squareRoot(expression: string) {
            return Math.sqrt(this.evaluateExpression(expression))
        },
        factorial(expression: string) {
            return this.factorialHelper(this.evaluateExpression(expression))
        },
        log10(expression: string) {
            return Math.log10(this.evaluateExpression(expression))
        },
        sin(expression: string) {
            return Math.sin(this.evaluateExpression(expression))
        },
        cos(expression: string) {
            return Math.cos(this.evaluateExpression(expression))
        },
        tan(expression: string) {
            return Math.tan(this.evaluateExpression(expression))
        },
        factorialHelper(n: number) {
            if (n === 0 || n === 1) {
                return 1
            }
            return n * this.factorialHelper(n - 1)
        },
        calculateResult() {
            this.validateLastCharacter()
            const expression = this.inputValue
            try {
                switch (this.operation) {
                    case 'sqrt':
                        this.inputValue = this.squareRoot(expression).toString()
                        break
                    case 'x!':
                        this.inputValue = this.factorial(expression).toString()
                        break
                    case 'log':
                        this.inputValue = this.log10(expression).toString()
                        break
                    case 'sin':
                        this.inputValue = this.sin(expression).toString()
                        break
                    case 'cos':
                        this.inputValue = this.cos(expression).toString()
                        break
                    case 'tan':
                        this.inputValue = this.tan(expression).toString()
                        break
                    default:
                        this.inputValue = this.evaluateExpression(
                            this.inputValue,
                        ).toString()
                }
            } catch (e) {
                this.inputValue = 'Invalid input or operation'
            }
        },
    },
})
