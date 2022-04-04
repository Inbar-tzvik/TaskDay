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
      <button class="filter-person">
        <img
          class="img-filter-person"
          src="https://cdn.monday.com/icons/dapulse-person-column.svg"
        />Person
      </button>
      <!-- <img
            class="icon-img-person"
            src="../../styles/icon/user-filter.png"
            alt=""
          /> -->
      <!-- <section class="dropDownMenuWrapper filter">
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
      </section> -->
      <button class="filter-btn">
        <span
          ><img class="filter" src="../../styles/icon/filter.svg" alt=""
        /></span>
        Filter
      </button>
      <!-- <button>
        <span><font-awesome-icon icon="filter" /></span> Filter
      </button> -->
      <button class="">
        <span
          ><img class="sort-icon" src="../../styles/icon/sort.svg" alt=""
        /></span>
        Sort
      </button>
      <!-- <button>
        <span><font-awesome-icon icon="sort" /></span> Sort
      </button> -->
      <!-- <button><img src="../../styles/icon/pin.png" alt="" /></button> -->
    </div>
  </section>
</template>

<script>
import searchIcon from '../components/icons/search-icon-modal.vue';
import filterIcon from '../components/icons/filter-icon-modal.vue';
export default {
  name: 'board-filter',
  // props: {
  //   board: Object,
  // },
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

<style></style>
