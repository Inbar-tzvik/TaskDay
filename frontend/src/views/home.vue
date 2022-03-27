<template>
  <section class="home-page">
    <h1>Home page</h1>
    <!-- <app-header>
    <template>
        <h1>write to slot!</h1>
    </template>
    </app-header> -->
    <hr />
  </section>
  <!-- <router-view></router-view> -->
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
