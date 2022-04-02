<template>
  <section class="text-cmp">
    <input class="text-input" :placeholder="task.text" />
  </section>
</template>

<script>
export default {
  props: {
    task: Object,
  }, // Menu title from the parent
  data() {
    return {};
  },
  created() {},
  methods: {
    item: null,
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
