<template>
  <section class="">
    <app-header>
    <template>
        <h1>write to slot!</h1>
    </template>
    </app-header>
        <hr>
  </section>
  <!-- <router-view></router-view> -->
</template>

<script>
import appHeader from '../components/app-header.vue'

export default {
  name: 'home',
  components: {
    appHeader,
    // router
    // customButton,
  },
}
</script>
