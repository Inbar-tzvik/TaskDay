<template>
  <section class="work-space-modal">
    <div class="close" @click="closeModal">
      <font-awesome-icon class="arrow-left" icon="angle-left" />
    </div>
    <div class="title-container-modal">
      <div class="title">
        <p>Workspace</p>
        <font-awesome-icon class="dots-icon-modal" icon="ellipsis" />
      </div>

      <div class="main-btn-modal">
        <div>
          <div>
            <div class="workspace-logo">M</div>
          </div>
          <div>
            <h1>Main workspace</h1>
          </div>
        </div>
        <div>
          <font-awesome-icon class="arrow-down" icon="angle-down" />
        </div>
      </div>
    </div>

    <div class="items-title">
      <div>
        <span>
          <plus-icon></plus-icon>
        </span> Add
      </div>
      <div>
        <span>
          <filter-icon />
        </span> Filters
      </div>
      <div>
        <span>
          <search-icon />
        </span> Search
      </div>
    </div>

    <div class="spacer"></div>

    <div v-if="currBoard" class="board-container-modal">
      <div 
        v-for="board in boards"
        :key="board._id"
        class="board-item"
        @click="moveToBoard(board._id)"
        v-bind:class="[{ 'board-clicked': currBoard._id === board._id }]"
      >
      <!-- <div v-bind:class="[{ active: isActive }, errorClass]"></div>  -->
        <span>
          <board-icon />
        </span>
        {{ board.title }}
      </div>
    </div>
  </section>
</template>

<script>
import plusIcon from '../icons/plus-icon.vue';
import filterIcon from '../icons/filter-icon-modal.vue';
import searchIcon from '../icons/search-icon-modal.vue';
import boardIcon from '../icons/board-icon.vue';

export default {
  props: {
    // boards: Array,
  },
  data() {
    return {
      //itzik
      // currBoard: null,
      // boards:null
    }
  },
  computed: {
    boards() {
      return this.$store.getters.boards;
    },
    currBoard() {
        return this.$store.getters.currBoard;
    },
    boardBtn() { },
  },
  created() {
    // this.boards = this.$store.getters.boards;
    // this.currBoard = this.$store.getters.currBoard;
  },
  methods: {
    closeModal() {
      this.$emit('boardClicked');
    },
    moveToBoard(boardId) {
      this.$emit('boardClicked');
      this.$router.push(`/main/${boardId}`);
    },
  },
  components: {
    plusIcon,
    filterIcon,
    searchIcon,
    boardIcon
  },
}
</script>
