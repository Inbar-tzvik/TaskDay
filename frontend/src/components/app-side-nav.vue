<template>
  <header class="app-header">
    <img src="../../styles/icon/icon.png" alt="" class="icon" />

    <div class="top-navigation-items-area">
      <div>
        <menu-icon></menu-icon>
      </div>
      <div>
        <notification-icon></notification-icon>
      </div>
      <div>
        <inbox-icon></inbox-icon>
      </div>

      <div>
        <work-icon></work-icon>
      </div>
    </div>
    <!-- <router-link class="link" to="/">Home</router-link>
    <router-link class="link" to="/main">Main</router-link> -->

    <div class="bottom-navigation-items-area">
      <div>
        <appsIcon></appsIcon>
      </div>

      <div>
        <invite-icon></invite-icon>
      </div>

      <div>
        <search-icon></search-icon>
      </div>

      <div>
        <help-icon></help-icon>
      </div>
    </div>

    <div>
      <p class="name-icon">SN</p>
    </div>
  </header>
</template>

<script>
// import { toyService } from "../services/toy-service.js";
// import customToyd from './custom-toyd.vue'
import menuIcon from './icons/menu-icon.vue';
import notificationIcon from './icons/notification-icon.vue';
import inboxIcon from './icons/inbox-icon.vue';
import workIcon from './icons/work-icon.vue';
import appsIcon from './icons/apps-icon.vue';
import inviteIcon from './icons/invite-icon.vue';
import searchIcon from './icons/search-icon.vue';
import helpIcon from './icons/help-icon.vue';

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
    menuIcon,
    notificationIcon,
    inboxIcon,
    workIcon,
    inviteIcon,
    appsIcon,
    searchIcon,
    helpIcon,
  },
};
</script>
