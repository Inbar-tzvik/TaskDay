<template>
  <section>
    <div class="bg-img"></div>
    <div class="home-page">
      <header class="header">
        <!-- <img src="../../styles/images/bg.jpg" alt="" /> -->
        <div class="getStart">
          <p>Get Start</p>
        </div>

        <div class="login-container">
          <p>Login\ Signup</p>
        </div>
      </header>

      <div class="contant-container">
        <div class="logo">Taskday</div>
        <div>
          <h1 class="title">
            A platform built for a
            <br />
            new way of working
          </h1>
        </div>

        <div class="txt">Get your team aligned with everyday's tasks</div>
        <div>
          <button class="get started">
            <router-link to="/main/62430dc81cdd644b3e5acabd"
              >Get start</router-link
            >
          </button>
        </div>
      </div>

      <footer class="footer"></footer>
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

<style>
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
