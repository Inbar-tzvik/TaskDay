<template>
  <section>
    <div class="home-page">
      <header class="header">
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

        <div class="txt">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </div>
        <div>
          <button>
            <router-link to="/main/b101">Get start</router-link>
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
  components: {
    appHeader,
    // router
    // customButton,
  },
};
</script>

<style>
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
