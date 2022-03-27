<template>
  <section class="app-container flex">
    <work-space-modal
      :class="[isModalClicked ? 'left' : '']"
      @closeModal="this.isModalClicked = !this.isModalClicked"
    ></work-space-modal>

    <nav-bar @menuClicked="this.isModalClicked = !this.isModalClicked" />
    <router-view @circleClicked="this.isModalClicked = !this.isModalClicked" />
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
    // openModal() {
    //   if (this.isModalClicked) return 'left';
    //   else return '';
    // },
  },
  computed: {},
  components: {
    navBar,
    workSpaceModal,
  },
};
</script>
