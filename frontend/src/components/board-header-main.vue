<template>
  <section>
    <integrate-btn></integrate-btn>
    <div class="board-header-main">
      <div>
        <div class="title">
          <h1>sprint 4</h1>
          <span></span>
          <span></span>
        </div>
      </div>

      <div class="right-side-header">
        <div class="last-seen-btn">
          <button>
            <p>Last seen</p>
          </button>
        </div>
        <div>
          <button>
            <img src="" alt="" />
            images users
          </button>
        </div>

        <div>
          <button>
            <img
              class="invite-user-img"
              src="../../styles/icon/user.png"
              alt=""
            />
            Invite/ <span>4</span>
          </button>
        </div>

        <div>
          <button>
            <img
              class="icon-header"
              src="../../styles/icon/activity.png"
              alt=""
            />
            Activty
          </button>
        </div>

        <div class="add-to-board">
          <p>+ Add to board</p>
        </div>

        <div class="container-dots">
          <img
            class="dots-icon"
            src="../../styles/icon/three-dots.svg"
            alt=""
          />
        </div>
      </div>
    </div>
    <p class="subtitle">
      Check out the following items to learn about all the cool features and
      tools monday.com has for you :-)
    </p>
  </section>
</template>

<script>
import integrateBtn from './icons/integrate-btn.vue';
export default {
  name: 'board-header-main',
  props: {},
  data() {
    return {};
  },
  components: { integrateBtn },
  computed: {},
  methods: {},
};
</script>
