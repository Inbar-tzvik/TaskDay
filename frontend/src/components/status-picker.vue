<template>
  <section class="dropDownMenuWrapper">
    <button :style="styleObj" class="dropDownMenuButton" ref="menu" @click="openClose">
      {{ currTask.status }}
    </button>

    <section class="dropdownMenu" v-if="isOpen">
      <div class="menuArrow" />
      <section v-for="opt in opts" :key="opt" class="option">
        <p :value="opt.status" @click="changeStatus(opt.status, task)" :style="{ backgroundColor: opt.color }">
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
      currTask: JSON.parse(JSON.stringify(this.task)),
      opts: [],
      val: '',
      isOpen: false,
      styleObj: {
        color: 'white',
        backgroundColor: null,
        borderColor: null,
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
      { status: '', color: '#c4c4c4' },
    ];
    // console.log('here', this.bgColor(this.task.currTask));
    this.styleObj.backgroundColor = this.bgColor(this.currTask.status);
    (this.styleObj['border-color'] = this.bgColor(this.currTask.status)), '#fff';
    // console.log(this.styleObj);
  },
  methods: {
    openClose() {
      // Toggle between open or closed ( true || false )
      this.isOpen = !this.isOpen;
    },
    bgColor(taskStatus) {
      // console.log(taskStatus);
      // console.log('opts', this.opts);
      for (var i = 0; i < this.opts.length; i++) {
        if (taskStatus === this.opts[i].status) {
          return this.opts[i].color;
        }
      }
      return '#c4c4c4';
    },
    changeStatus(value, task) {
      // console.log(value, task);
      var updatedTask = JSON.parse(JSON.stringify(task));
      updatedTask.status = value;
      this.currTask.status = value;
      this.styleObj.backgroundColor = this.bgColor(this.currTask.status);

      this.$emit('updatedStatus', updatedTask);
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped></style>
