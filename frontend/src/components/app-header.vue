<template>
  <header class="app-header">
    <img src="../styles/icon/icon.png" alt="" class="icon" />
    <router-link class="link" to="/">Home</router-link>
    <router-link class="link" to="/main">Main</router-link>
    <div class="top-navigation-items-area">
      <div>x</div>
      <div>x</div>
      <div>x</div>
      <div>x</div>
    </div>

    <div class="bottom-navigation-items-area">
      <div>x</div>
      <div>x</div>
      <div>x</div>
      <div>x</div>
    </div>

    <div>
      <p>SN</p>
    </div>
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
