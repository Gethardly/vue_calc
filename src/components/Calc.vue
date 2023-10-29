<template>
  <h1>Calc</h1>

  <q-card>

    <q-card-actions>
      <div>
        <q-input outlined v-model='calcStore.x' label='Первое значение' type='number' />
      </div>
      {{ calcStore.x }}
      <q-btn-group>
        <q-btn @click='calcStore.add'>+</q-btn>
        <q-btn>-</q-btn>
        <q-btn>*</q-btn>
        <q-btn>/</q-btn>
        <q-btn>cos</q-btn>
        <q-btn>sin</q-btn>
        <q-btn>tan</q-btn>
        <q-btn>x!</q-btn>
      </q-btn-group>
    </q-card-actions>
  </q-card>
</template>

<script setup lang='ts'>
import { useCalcStore } from '../stores/CalcStore'
import { ref } from 'vue'

const calcStore = useCalcStore()

const x = ref(0)
const y = ref(0)

const twoValues = ref(0)

</script>