<template>
  <section class="app-container">
    <work-space-modal></work-space-modal>
    <nav-bar />
    <router-view />
  </section>
</template>

<script>
import navBar from './components/app-side-nav.vue';
import workSpaceModal from './components/modals/work-space-modal.vue';

export default {
  name: 'app',
  created() {
    this.$store.dispatch({ type: 'loadBoards' });
  },
  methods: {},
  components: {
    navBar,
    workSpaceModal,
  },
};
</script>
