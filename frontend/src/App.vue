<template>
  <section class="app-container flex">
    <app-header></app-header>
    <router-view />
  </section>
</template>

<script>
import appHeader from './components/app-side-nav.vue';

export default {
  name: 'app',
  created() {
    this.$store.dispatch({ type: 'loadBoards' });
  },
  methods: {},
  components: {
    appHeader,
  },
};
</script>
