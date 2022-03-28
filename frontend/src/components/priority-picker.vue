<template>
  <section class="dropDownMenuWrapper">
    <button :style="styleObj" class="dropDownMenuButton" ref="menu" @click="openClose">{{ currTask.priority }}</button>

    <section class="dropdownMenu" v-if="isOpen">
      <div class="menuArrow" />
      <section v-for="opt in opts" :key="opt" class="option">
        <p @click="changePriority(opt.priority, task)" :style="{ backgroundColor: opt.color }">{{ opt.priority }}</p>
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
      isOpen: false, // Variable if the menu is open or closed
      styleObj: {
        color: 'white',
        backgroundColor: null,
        borderColor: null,
      },
    };
  },

  created() {
    this.opts = [
      { priority: 'High', color: '#ff642e' },
      { priority: 'Medium', color: '#0086c0' },
      { priority: 'Low', color: '#9bd226' },
      { priority: '', color: '#c4c4c4' },
    ];
    this.styleObj.backgroundColor = this.bgColor(this.currTask.priority);
    this.styleObj['border-color'] = this.bgColor(this.currTask.priority);
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
        if (taskStatus === this.opts[i].priority) {
          return this.opts[i].color;
        }
      }
      return '#c4c4c4';
    },
    changePriority(value, task) {
      console.log(value, task);
      var updatedTask = JSON.parse(JSON.stringify(task));
      updatedTask.priority = value;
      this.currTask.priority = value;
      this.styleObj.backgroundColor = this.bgColor(this.currTask.priority);

      this.$emit('updatedStatus', updatedTask);
    },
  },
};
</script>
