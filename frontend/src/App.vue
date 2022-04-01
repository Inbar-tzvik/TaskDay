<template>
  <section class="app-container flex">
    <nav-bar
      @menuClicked="this.isModalClicked = !this.isModalClicked"
      @homeClicked="this.isModalClicked = false"
    />
    <work-space-modal
      :class="[isModalClicked ? 'left' : '']"
      @closeModal="this.isModalClicked = !this.isModalClicked"
      @boardClicked="this.isModalClicked = false"
    ></work-space-modal>

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
