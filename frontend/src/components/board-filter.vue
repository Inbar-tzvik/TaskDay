<template>
  <section class="board-filter">
    <button @click="addGroup" class="blue-btn">New Group</button>
    <!-- <button class="half-btn">
      <font-awesome-icon icon="angle-down" />
    </button> -->
    <!-- <div class="blue-symbl">></div> -->

    <div>
      <!-- <div class="input-container">
        <span class="search-icon"> <search-icon /></span>
        <input
          type="search"
          placeholder="Search"
          @input="setFilterTitle"
          v-model="filterBy.title"
        />
      </div> -->
      <div>
        <div class="input-container">
          <form class="nosubmit">
            <input
              class="nosubmit"
              type="search"
              placeholder="Search..."
              @input="setFilterTitle"
              v-model="filterBy.title"
            />
          </form>
        </div>
      </div>

      <!-- <img
            class="icon-img-person"
            src="../../styles/icon/user-filter.png"
            alt=""
          /> -->
      <section class="dropDownMenuWrapper">
        <button class="dropDownMenuButton" ref="menu" @click="openClose">
          <font-awesome-icon icon="circle-user" />Person
        </button>
        <section class="dropdownMenu" v-if="isOpen">
          <div v-if="board.members.length > 0">
            <div class="avatar" v-for="member in board.members" :key="member._id">
              <el-avatar fit="cover" class="avatar-img" :src="member.imgUrl" />
              <div>{{ member.fullname }}</div>
            </div>
          </div>
        </section>
      </section>
      <button>
        <span><font-awesome-icon icon="filter" /></span> Filter
      </button>
      <button>
        <span><font-awesome-icon icon="sort" /></span> Sort
      </button>
      <!-- <button><img src="../../styles/icon/pin.png" alt="" /></button> -->
    </div>
  </section>
</template>

<script>
import searchIcon from '../components/icons/search-icon-modal.vue';
import filterIcon from '../components/icons/filter-icon-modal.vue';
export default {
  name: 'board-filter',
  props: {
    board: Object,
  },
  data() {
    return {
      isOpen: false,
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
      this.users = this.$store.getters.board.members.map((user) => user.fullname);
      // return this.$store.getters.boards[0].members.map(user => user.fullname)
    },
  },
  methods: {
    openClose() {
      // Toggle between open or closed ( true || false )
      this.isOpen = !this.isOpen;
    },
    setFilter() {
      // console.log(this.filterBy);
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

<style>
form.nosubmit {
  border: none;
  padding: 0;
}

input.nosubmit {
  width: 260px;
  border: 1px solid #555;
  display: block;
  padding: 9px 4px 9px 40px;
  background: transparent
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E")
    no-repeat 13px center;
}
</style>
