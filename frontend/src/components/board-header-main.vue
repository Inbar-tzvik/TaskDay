<template>
  <section>
    <integrate-btn></integrate-btn>
    <div class="board-header-main">
      <!-- <div class="menu-circle" @click="onCircle">
        <font-awesome-icon class="arrow-right-icon" icon="angle-right" />
      </div> -->
      <div>
        <div class="title">
          <h1>{{ board.title }}</h1>
          <span @click="onClickInfo" :class="getInfo">
            <font-awesome-icon class="info-icon" icon="circle-info" />
          </span>

          <span @click="onClickStar" :class="getStar">
            <img class="star-icon" src="../styles/icon/star-yellow.png" />
          </span>
        </div>
      </div>

      <div class="right-side-header">
        <div class="last-seen-btn">
          <button>
            Last seen
            <!-- <avatar-img :urls="[]"></avatar-img> -->
            <!-- <p>Last seen</p> -->
          </button>
        </div>

        <div>
          <button>
            <img class="invite-user-img" src="../styles/icon/user.png" alt="" />
            Invite/ <span>4</span>
          </button>
        </div>

        <div class="invite">
          <button class="invite">
            <!-- <img
              class="icon-header"
              src="../../styles/icon/activity.png"
              alt=""
            /> -->

            Activty
          </button>
        </div>

        <div class="add-to-board">
          <p><span>+</span> Add to board</p>
        </div>

        <div class="container-dots">
          <font-awesome-icon class="dots-icon" icon="ellipsis" />
        </div>
      </div>
    </div>
    <p class="subtitle" v-if="isInfo">Learn how to create tasks that are clear, transparent, and on point.</p>
  </section>
</template>

<script>
import avatarImg from './avatar-img.vue';
import integrateBtn from './icons/integrate-btn.vue';
export default {
  name: 'board-header-main',
  props: {
    board: Object,
  },
  data() {
    return {
      starSrc: {
        notYellow: '../styles/icon/star.png',
        yellow: '../styles/icon/star-yellow.png',
      },
      isStared: true,
      infoSrc: {
        mark: '../styles/icon/info.png',
        notMark: '../styles/icon/info.png',
      },
      isInfo: true,
    };
  },
  components: { integrateBtn, avatarImg },
  computed: {
    getStar() {
      if (this.isStared) return this.starSrc.yellow;
      else if (!this.isStared) return this.starSrc.notYellow;
    },
    getInfo() {
      if (this.isInfo) return this.infoSrc.mark;
      else if (!this.isInfo) return this.infoSrc.notMark;
    },
  },
  methods: {
    onClickStar() {
      this.isStared = !this.isStared;
    },
    onClickInfo() {
      this.isInfo = !this.isInfo;
    },
    onCircle() {
      this.$emit('circleClicked');
    },
  },
};
</script>
