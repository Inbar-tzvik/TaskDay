<template>
  <section class="home-page">
    <div class="container">
      <div class="nav">
        <div class="logo">
          <div class="blue"></div>
          <div class="yellow">
            <div class="green-dot"></div>
          </div>
          <div class="red">
            <div class="yellow-dot"></div>
          </div>
        </div>
        <!-- <ul>
          <li>Download App</li>
          <li>Login</li>
          <li>SignUp</li>
          <li>Help</li>
        </ul> -->
        <div class="button2">
          <router-link to="/main/62430dc81cdd644b3e5acabd">See demo</router-link>
        </div>
      </div>
      <div class="home">
        <!-- <img src="../../styles/images/blue-black.png" /> -->
        <div class="hero">
          <div class="title"><span class="yellow">T</span>askday</div>
          <h1 class="">
            A platform built for a<br />
            &nbsp; new way of working
          </h1>
          <div class="button">
            <router-link to="/main/62430dc81cdd644b3e5acabd">See demo</router-link>
          </div>
        </div>
        <video
          preload="auto"
          autoplay
          loop
          poster="https://dapulse-res.cloudinary.com/video/upload/so_0p/Generator_featured images/Home Page - 2022 Rebrand/products/products_video.jpg"
          playsinline
          webkit-playsinline
          x5-playsinline
        >
          <source
            src="https://dapulse-res.cloudinary.com/video/upload/q_auto,f_auto,cs_copy/Generator_featured images/Home Page - 2022 Rebrand/products/products_video.mp4"
          />
        </video>
        <!-- <div class="background-img"></div> -->
        <!-- d <div class="home-container">
        <div class="container1">
          <div class="image-stack">
            <div class="image-stack__item image-stack__item--top">
              <img src="../../styles/images/1.jpg" alt="" />
            </div>
            <div class="image-stack__item image-stack__item--bottom">
              <img src="../../styles/images/board.jpg" />
            </div>
          </div>
        </div> -->

        <!-- </div> -->

        <!-- <div class="main">
        <div class="date">
          <span>
            <i class="far fa-calendar-alt"></i>
          </span>
          <span>11 Nov 2018</span>
        </div>
        <div class="date">
          <span>
            <i class="far fa-calendar-alt"></i>
          </span>
          <span>11 Nov 2018</span>
        </div>
        <div class="date">
          <span>
            <i class="far fa-user"></i>
          </span>
          <span>2 Guests</span>
        </div>
        <div class="date">
          <span>
            <i class="far fa-calendar-alt"></i>
          </span>
          <span>Rooms</span>
        </div>

        <div class="go">
          <i class="fas fa-paper-plane"></i>
        </div>
      </div> -->
      </div>
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
