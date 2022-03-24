<template>
  <section class="app-container flex">
    <nav-bar />
    <div class="empty-div"></div>
    <router-view />
  </section>
</template>

<script>
import navBar from './components/app-side-nav.vue';

export default {
  name: 'app',
  created() {
    this.$store.dispatch({ type: 'loadBoards' });
  },
  methods: {},
  components: {
    navBar,
  },
};
</script>
