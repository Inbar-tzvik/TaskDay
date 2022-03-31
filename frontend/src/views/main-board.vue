<template>
  <section class="flex">
    <div class="empty-div" v-if="!isDetails"></div>
    <section v-if="board" class="main-board">
      <section class="board-header-content">
        <board-header-main @circleClicked="circleClicked" />
        <board-toolbar @openDetails="openDetails"></board-toolbar>
        <board-filter @addGroup="addGroup" @filteredTitle="setFilter" />
        <!-- <button>New item</button> -->
        <!-- </div> -->
      </section>
      <section v-if="board" class="board-content">
        <!-- <h1>{{ board.title }}</h1> -->
        <!-- <font-awesome-icon icon="arrow-down" /> -->
        <group-list
          v-if="board"
          @updatedStatus="updatedStatus"
          @updateGroup="updateGroup"
          @addItem="addItem"
          @deleteGroup="deleteGroup"
          @removeItem="removeItem"
          @editTask="editTask"
          :board="board"
        />
      </section>
      <details-modal
        v-if="isDetails"
        @closeDetails="closeDetails"
        :class="{ showModal: isDetails }"
      ></details-modal>
    </section>
  </section>
  <!-- <button @click="goToEdit" class="btn btn-secondary">Add a new car</button> -->
</template>
<script>
import groupList from '../components/group-list.vue';
import boardFilter from '../components/board-filter.vue';
import boardToolbar from '../components/board-toolbar.vue';
import boardHeaderMain from '../components/board-header-main.vue';
import workSpaceModal from '../components/modals/work-space-modal.vue';
import detailsModal from '../components/modals/details-modal.vue';
import { boardGroupService } from '../services/board-group-service';
// import { boardService } from '../services/board-service.js';
import { socketService } from '@/services/socket.service.front';


export default {
  name: 'main-board',
  data() {
    return {
      // board: null,
      isDetails: false,
    };
  },
  computed: {
    board() {
      return this.$store.getters.currBoard;
    },
  },
  watch: {
    '$route.params.boardId': {
      async handler() {
        await this.$store.dispatch({
          type: 'setCurrBoard',
          boardId: this.$route.params.boardId,
        });
        socketService.emit('curr board', this.$route.params.boardId)
      },
      immediate: true,
    },
  },
  created() {
    socketService.on('boardChanged', ((boardId)=>{
              // console.log('boardId',boardId);
              this.$store.dispatch({type: 'setCurrBoard', boardId});
            }))
  },
  methods: {
    updateGroup(currGroup, addedIdxForDrop = null) {
      // console.log('currGroup,addedIdxForDrop',currGroup,addedIdxForDrop);
      this.$store.dispatch({
        type: 'updateGroup',
        currGroup: currGroup,
        boardId: this.board._id,
        addedIdxForDrop,
      });
    },
    removeItem(itemId, groupId) {
      this.$store.dispatch({
        type: 'removeItem',
        itemId: itemId,
        groupId: groupId,
        boardId: this.board._id,
      });
    },
    setFilter(filterBy) {
      this.$store.dispatch({ type: 'setFilter', filterBy });
    },
    addItem(groupId, task, fromIdx = null) {
      // console.log(groupId, task);
      // console.log('fromIdx',fromIdx);
      this.$store.dispatch({
        type: 'addItem',
        boardId: this.board._id,
        groupId: groupId,
        task: task,
        fromIdx,
      });
    },
    deleteGroup(groupId, removedIndex = null) {
      this.$store.dispatch({
        type: 'removeGroup',
        boardId: this.board._id,
        groupId: groupId,
        removedIndex,
      });
    },
    addGroup() {
      // this.users = this.$store.getters.currBoard
      this.$store.dispatch({
        type: 'addGroup',
        boardId: this.$store.getters.currBoard._id,
      });
    },
    editTask(groupId, item) {
      console.log(groupId, item);
      this.$store.dispatch({
        type: 'addItem',
        boardId: this.board._id,
        groupId: groupId,
        task: item,
      });
    },
    updatedStatus(groupId, task) {
      console.log('i am in board', groupId, task);
      this.$store.dispatch({
        type: 'addItem',
        boardId: this.board._id,
        groupId: groupId,
        task: task,
      });
    },
    circleClicked() {
      this.$emit('circleClicked');
    },
    openDetails() {
      console.log();
      this.isDetails = !this.isDetails;
    },
    closeDetails() {
      this.isDetails = !this.isDetails;
    },
    setFilter(filterBy) {
      this.$store.dispatch({ type: 'setFilter', filterBy: filterBy });
    },
  },
  components: {
    groupList,
    boardFilter,
    boardToolbar,
    boardHeaderMain,
    workSpaceModal,
    detailsModal,
  },
};
</script>
