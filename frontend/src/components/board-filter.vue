<template>
  <section class="board-filter">
    <button @click="addGroup" class="blue-btn">New Group</button>
    <button class="half-btn">></button>
    <!-- <div class="blue-symbl">></div> -->

    <div>
      <div class="input-container">
        <span class="search-icon"> <search-icon /></span>
        <input type="text" placeholder="Search" />
      </div>

      <button>
        <span
          ><img
            class="icon-img-person"
            src="../../styles/icon/user-filter.png"
            alt=""
        /></span>
        Person
      </button>
      <button>
        <span><filter-icon /></span> filter
      </button>
      <button><span>↑↓</span> Sort</button>
      <!-- <button><img src="../../styles/icon/pin.png" alt="" /></button> -->
      <div></div>
    </div>
  </section>
</template>

<script>
import searchIcon from '../components/icons/search-icon-modal.vue';
import filterIcon from '../components/icons/filter-icon-modal.vue';
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
  components: { filterIcon, searchIcon },
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
