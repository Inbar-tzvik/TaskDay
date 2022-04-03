<template>
  <section class="app-container flex">

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
  data() {
    return {
      isModalClicked: false,
    };
  },
  methods: {},
  getters: {

  },
  computed: {},
  components: {
    navBar,
    workSpaceModal,
  },
};
</script>
