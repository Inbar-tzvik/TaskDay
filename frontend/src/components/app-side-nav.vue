<template>
  <header class="app-header">
    <div>
      <img src="../../styles/icon/icon.png" alt="" class="icon" />

      <div class="top-navigation-items-area">
        <div class="cliked-btn-nav" @click="onClickWorkSpace">
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
    </div>
    <!-- <router-link class="link" to="/">Home</router-link>
    <router-link class="link" to="/main">Main</router-link> -->
    <div>
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

      <div class="icon-container">
        <h3 class="name-icon">SN</h3>
        <!-- <p class="name-icon">SN</p> -->
      </div>
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
      // isWorkSpace: false,
    };
  },
  computed: {},
  methods: {
    onClickWorkSpace() {
      this.$emit('menuClicked');
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
