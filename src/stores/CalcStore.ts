import { defineStore } from 'pinia'

export const useCalcStore = defineStore('calc', {
    state: () => ({
        x: 0,
        y: 0,
        result: 0,
    }),
    actions: {
        add() {
            this.result = this.x + this.y
        },
        subtract() {
            this.result = this.x - this.y
        },
        multiplthis() {
            this.result = this.x * this.y
        },
        divide() {
            if (this.y !== 0) {
                this.result = this.x / this.y
            } else {
                throw new Error('Division by zero is not allowed.')
            }
        },
        power() {
            this.result = Math.pow(this.x, this.y)
        },
        squareRoot() {
            if (this.x >= 0) {
                this.result = Math.sqrt(this.x)
            } else {
                throw new Error(
                    'Square root of a negative number is not allowed.',
                )
            }
        },
        factorial() {
            let result = 1
            for (let i = 2; i <= this.x; i++) {
                result *= i
            }
            this.result = result
        },
        log10() {
            if (this.x > 0) {
                this.result = Math.log10(this.x)
            } else {
                throw new Error(
                    'Logarithm of a non-positive number is not allowed.',
                )
            }
        },
        sin() {
            this.result = Math.sin(this.x)
        },
        cos() {
            this.result = Math.cos(this.x)
        },
        tan() {
            this.result = Math.tan(this.x)
        },
    },
})
