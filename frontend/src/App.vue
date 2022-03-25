<template>
  <section class="app-container">
    <nav-bar />
    <!-- <div class="empty-div">dfsdfssf</div> -->
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
