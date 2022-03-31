<template>
  <section class="board-filter">
    <button @click="addGroup" class="blue-btn">New Group</button>
    <button class="half-btn">
      <font-awesome-icon icon="angle-down" />
    </button>
    <!-- <div class="blue-symbl">></div> -->

    <div>
      <div class="input-container">
        <span class="search-icon"> <search-icon /></span>
        <input
          type="text"
          placeholder="Search"
          @input="setFilterTitle"
          v-model="filterBy.title"
        />
      </div>
      <button>
        <span>
          <!-- <img
            class="icon-img-person"
            src="../../styles/icon/user-filter.png"
            alt=""
          /> -->
          <font-awesome-icon icon="circle-user" />
        </span>
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
        title: '',
        user: '',
      },
      users: null,
    };
  },
  components: { filterIcon, searchIcon },
  computed: {
    board() {
      return this.$store.getters.currBoard;
      // return this.$store.getters.boards[0];
    },
    getUsers() {
      //should be from store???
      this.users = this.$store.getters.board.members.map(
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
    setFilterTitle() {
      this.$emit('filteredTitle', { ...this.filterBy });
    },
  },
};
</script>
