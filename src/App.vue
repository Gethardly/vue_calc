<template>
  <q-layout view='lHh Lpr lFf'>
    <q-header elevated class='bg-primary'>
      <q-toolbar>
        <q-toolbar-title>
          Web calculator
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <Calc />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import Calc from './components/Calc.vue'

export default {
  name: 'LayoutDefault',

  components: {
    Calc
  },

  setup() {
    return {
      leftDrawerOpen: ref(false)
    }
  }
}
</script>
