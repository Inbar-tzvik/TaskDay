<template>
  <section class="home-page">
    <div id="homepage">
      <header>
        <h1>TASKDAY</h1>

        <ul>
          <li>
            <router-link to="/main/62430dc81cdd644b3e5acabd"
              >See demo</router-link
            >
          </li>
          <!-- <li><a href="#">Menu 2</a></li>
          <li><a href="#">Menu 3</a></li>
          <li><a href="#">Menu 4</a></li> -->
        </ul>
      </header>

      <img
        id="showcase-1"
        src="https://images.unsplash.com/photo-1503926359680-9ddd5b2bcbdc?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1350&amp;q=80"
      /><img
        id="showcase-2"
        src="https://images.unsplash.com/photo-1471086569966-db3eebc25a59?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80"
      /><img
        id="showcase-3"
        src="https://images.unsplash.com/photo-1458225868294-8e9c6d07b3fb?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1355&amp;q=80"
      /><img
        id="showcase-4"
        src="https://images.unsplash.com/photo-1510924199351-4e9d94df18a6?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1353&amp;q=80"
      /><img
        id="showcase-5"
        src="https://images.unsplash.com/photo-1475174767135-6d48cae73003?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1350&amp;q=80"
      /><img
        id="showcase-6"
        src="https://images.unsplash.com/reserve/7vjJbdDRga27ApDoYicw_Sparks.jpg?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1350&amp;q=80"
      />
    </div>
  </section>
</template>

<script>
import appHeader from '../components/app-side-nav.vue';

export default {
  name: 'home',
  data() {
    return {
      currBoard: null,
    };
  },
  components: {
    appHeader,

    // router
    // customButton,
  },
  created() {
    console.log('home');
    this.$store.commit({ type: 'setCurrPage', page: 'homePage' });
    this.currBoard = this.$store.getters.currBoard;
  },
  // watch:{
  //   '$store.getters.currPage': {
  //     handler(){
  //       this.currPage = this.
  //     }
  //   }
  // }
  computed: {
    board() {
      return this.$store.getters.currBoard;
    },
  },
  methods: {
    moveToBoard(boardId) {
      this.$router.push(`/main/${boardId}`);
      //UPDATE CURR BOARD
    },
  },
  watch: {},
};
</script>

<style></style>
