<template>
  <section class="app-container">
    <!-- <work-space-modal :class="openModal"></work-space-modal> -->
    <work-space-modal
      :class="[isModalClicked ? 'left' : '']"
      @closeModal="this.isModalClicked = !this.isModalClicked"
    ></work-space-modal>
    <!-- <work-space-modal
      :class="[isModalClicked ? 'left' : '']"
      @closeModal="closeModal"
    ></work-space-modal> -->

    <!-- <nav-bar @menuClicked="menuClicked" /> -->
    <nav-bar @menuClicked="this.isModalClicked = !this.isModalClicked" />
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
