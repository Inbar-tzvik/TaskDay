<template>
  <section class="dropDownMenuWrapper">
    <button :style="styleObj" class="dropDownMenuButton" ref="menu" @click="openClose">
      {{ task.status }}
    </button>

    <section class="dropdownMenu" v-if="isOpen">
      <div class="menuArrow" />
      <section v-for="opt in opts" :key="opt" class="option">
        <p
          :value="opt.status"
          @click="changeStatus($event.target.value, task.id)"
          :style="{ backgroundColor: opt.color }"
        >
          {{ opt.status }}
        </p>
      </section>
    </section>
  </section>
</template>

<script>
export default {
  props: {
    task: Object,
  }, // Menu title from the parent
  data() {
    return {
      opts: [],
      val: '',
      isOpen: false,
      styleObj: {
        color: 'white',
        backgroundColor: null,
        // 'border-color': 'green',
      },
      // styleObject: {
      //   color: this.color(this.task),
      //   // fontSize: '13px',
      // }, // Variable if the menu is open or closed
    };
  },
  created() {
    this.opts = [
      { status: 'Stuck', color: '#e2435c' },
      { status: 'Working on it', color: '#fec173' },
      { status: 'Done', color: '#00c875' },
    ];
    console.log('here', this.bgColor(this.task.status));
    this.styleObj.backgroundColor = this.bgColor(this.task.status);
  },
  methods: {
    openClose() {
      // Toggle between open or closed ( true || false )
      this.isOpen = !this.isOpen;
    },
    bgColor(taskStatus) {
      console.log(taskStatus);
      console.log('opts', this.opts);
      for (var i = 0; i < this.opts.length; i++) {
        if (taskStatus === this.opts[i].status) {
          return this.opts[i].color;
        }
      }
    },
    changeStatus(value, taskId) {
      console.log(value, taskId);
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped></style>
