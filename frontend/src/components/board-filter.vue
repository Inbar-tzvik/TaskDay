<template>
  <section class="board-filter">
    <button @click="addGroup" class="blue-btn">New Group</button>
    <div class="blue-btn">></div>
    <input
      type="text"
      placeholder="Search"
      v-model="filterBy.txt"
      @input="setFilter"
    />

    <select v-model="filterBy.user">
      <option v-for="(user, idx) in users" :key="idx">{{ user }}</option>
    </select>
    <button>filter</button>
    <button>Sort</button>
  </section>
</template>

<script>
export default {
  name: 'board-filter',
  props: {},
  data() {
    return {
      filterBy: {
        txt: '',
        user: '',
      },
      users: null,
    };
  },
  components: {},
  computed: {
    boards() {
      return this.$store.getters.boards[0];
    },
    getUsers() {
      this.users = this.$store.getters.boards[0].members.map(
        (user) => user.fullname
      );
      // return this.$store.getters.boards[0].members.map(user => user.fullname)
    },
  },
  methods: {
    setFilter() {
      console.log(this.filterBy);
      this.$emit('setFilter', JSON.parse(JSON.stringify(this.filterBy)));
    },
    addGroup() {
      this.$emit('addGroup');
    },
  },
};
</script>
