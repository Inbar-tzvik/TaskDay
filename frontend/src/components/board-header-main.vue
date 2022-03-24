<template>
  <section>
    <integrate-btn></integrate-btn>
    <div class="board-header-main">
      <div>
        <div class="title">
          <h1>sprint 4</h1>
          | <span>x</span>|
          <span>y</span>
        </div>
      </div>

      <div class="right-side-header">
        <div>
          <button class="last-seen-btn">
            <p>Last seen</p>
            <div>images users?</div>
          </button>
        </div>

        <div>Invite/ <span>4</span></div>

        <div>Activty</div>

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
