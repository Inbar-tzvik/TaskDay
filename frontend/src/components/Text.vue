<template>
  <section class="text-cmp">
    <input
      class="text-input"
      :placeholder="task.text"
      @blur="editText($event.target.value)"
      @keyup.enter="editText($event.target.value)"
    />
    <pre>{{ text }}</pre>
  </section>
</template>

<script>
export default {
  props: {
    task: Object,
  }, // Menu title from the parent
  data() {
    return {
      text: '',
    };
  },
  created() {},
  methods: {
    editText(value) {
      var currTask = JSON.parse(JSON.stringify(this.task));
      //   console.log('currtASK', currTask);
      if (value) {
        currTask.text = value;
        this.$emit('editText', currTask);
      }
    },
  },
  computed: {},
};
</script>
<style lang="scss">
.text-cmp {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 34px;
  background-color: #f5f6f8;
}
.text-input {
  width: 150px;
  height: 25px;
  border: none;
  padding: 0 2px;
  background-color: #f5f6f8;
  &:hover {
    border: 1px solid #c4c4c4;
  }
}
.text-input:focus {
  background-color: white;
}
</style>
