<template>
  <h1>Calc</h1>

  <q-card>

    <q-card-actions>
      <div>
        <q-input type='text' outlined v-model='calcStore.inputValue' label='Введите значения'
                 @input='calcStore.filterInput'/>
      </div>
      {{ calcStore.error ? calcStore.error : calcStore.result }}
      <q-btn-group>
        <q-btn v-for='op in calcStore.operations' :key='op' @click='calcStore.setOperation(op)'>{{ op }}
        </q-btn>
      </q-btn-group>
      <div class='q-pa-md g-gutter-sm'>
        <q-btn color='primary' label='=' @click='calcStore.calculateResult' />
      </div>
    </q-card-actions>
  </q-card>
</template>

<script setup lang='ts'>
import { useCalcStore } from '../stores/CalcStore'

const calcStore = useCalcStore()

const removeLastIfInList = () => {
  const lastCharacter = calcStore.inputValue[calcStore.inputValue.length - 1]
  if (calcStore.operations.includes(lastCharacter) || lastCharacter === '=') {
    calcStore.inputValue = calcStore.inputValue.slice(0, -1)
  }
}

</script>