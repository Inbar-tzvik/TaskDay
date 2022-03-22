<template>
  <header class="main-header">
    <!-- <slot name="header">default</slot> -->

    <nav class="flex">
      <!-- <section class="user-info">
        <router-link to="/user">{{ user.fullname }}</router-link> | \${{
          user.username
        }}
      </section> -->

      <!-- <router-link class="link" to="/user">user</router-link> -->
      <router-link class="link" to="/">Home</router-link>|

      <router-link class="link" to="/main">Main</router-link>
      <!-- <router-link class="link" to="/car">Car</router-link> -->
      <!-- <router-link class="link" to="/about">About</router-link> -->
    </nav>
    <hr />
  </header>
</template>

<script>
// import { toyService } from "../services/toy-service.js";
// import customToyd from './custom-toyd.vue'

export default {
  data() {
    return {
      // isCartShown : false
    };
  },
  computed: {
    cartLength() {
      // return this.$store.state.cart.length
    },
    cartTotal() {
      // return this.$store.getters.cartTotal
    },
    cartProducts() {
      // return this.$store.state.cart
    },
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    removeFromCart(productId) {
      // console.log('Remove from Cart:', productId);
      // this.$store.commit({
      //     type: 'removeFromCart',
      //     productId
      // })
    },
    checkout() {
      // console.log('Checkout!');
      // this.$store.commit({
      //     type: 'checkout',
      // })
    },
  },
  components: {
    // userMsg
  },
};
</script>
