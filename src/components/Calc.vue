<style lang='scss'>
@import "./Calc.module.scss";
</style>

<template>
  <div class='flex justify-center'>
    <q-card class='Card'>
      <div class='q-ma-md'>
        <q-input type='text' v-model='calcStore.inputValue' outlined label='Введите значения' />
      </div>
      <q-card-actions class='card q-ma-md'>
        <q-card-actions class='card q-ma-md'>
          <div class='full-width flex justify-center'>
            <div class='row'>
              <q-btn class='col-2' v-for='op in calcStore.operations' :id='op' :key='op'
                     @click='calcStore.setOperation(op)'>
                {{ op }}
              </q-btn>
            </div>
          </div>
          <div class='full-width flex justify-center q-ma-md'>
            <div class='row justify-center'>
              <q-btn class='col-4' v-for='index in 9' :id='index' @click='calcStore.inputValue += index.toString()'>
                {{ index }}
              </q-btn>
              <q-btn class='col-4' @click='calcStore.inputValue += "."'>•</q-btn>
              <q-btn class='col-4' @click='calcStore.inputValue += "0"' id='0'>0</q-btn>
              <q-btn class='col-4' id='Backspace' @click='calcStore.backspaceValue()'>
                <q-icon name='backspace' />
              </q-btn>
            </div>
          </div>
          <div class='q-pa-md full-width'>
            <q-btn color='primary' style='font-size: 20px' class='full-width' label='='
                   @click='calcStore.calculateResult' />
          </div>
        </q-card-actions>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup lang='ts'>
import { useCalcStore } from '../stores/CalcStore'

const calcStore = useCalcStore()

const allowedCharacters = [...calcStore.operations]
allowedCharacters.push('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace')

document.addEventListener('keydown', (event) => {
  allowedCharacters.forEach((key) => {
    if (key === event.key) {
      document.getElementById(key)?.click()
    } else if (event.key === 'Enter' || event.key === '=') {
      calcStore.calculateResult()
    } else {
      event.preventDefault()
    }
  })
})
</script>
