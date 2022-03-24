<template>
  <section class="board-filter">
    <button @click="addGroup" class="blue-btn">New Group</button>
    <!-- <div class="blue-symbl">></div> -->

    <div>
      <input type="text" placeholder="Search" />

      <button>Person</button>
      <button>filter</button>
      <button>Sort</button>
    </div>
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
