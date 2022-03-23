<template>
  <section class="board-filter">
    <button @click="addGroup" class="blue-btn">New Group</button>
    <div class="blue-btn">></div>
    <button>Search</button>
    <button>Person</button>
    <button>filter</button>
    <button>Sort</button>
  </section>
</template>

<script>
export default {
  name: 'board-filter',

  props: {},
  components: {},
  computed: {},
  methods: {
    addGroup() {
      this.$emit('addGroup');
    },
  },
};
</script>
