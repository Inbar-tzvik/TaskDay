<template>
  <section class="flex">
    <div v-if="isDetails" @click="isDetails = false" class="main-screen"></div>
    <div class="empty-div" v-if="!isDetails">
      <div class="menu-circle" @click="circleClicked">
        <font-awesome-icon class="arrow-right-icon" icon="angle-right" />
      </div>
    </div>
    <div class="loading-gif" v-if="!board">
      <img src="@/assets/Box-Loading-2.gif" />
    </div>

    <!-- <div class="loader" v-if="!board">
      <img src="../../styles/images/loading.gif" alt="" />
    </div>-->
    <section v-if="board" class="main-board">
      <section class="board-header-content">
        <board-header-main :board="board" @circleClicked="circleClicked" />
        <board-toolbar @openDetails="openDetails"></board-toolbar>
        <board-filter :board="board" @addGroup="addGroup" @filteredTitle="setFilter" />
        <!-- <button>New item</button> -->
        <!-- </div> -->
      </section>
      <section v-if="board" class="board-content">
        <!-- <h1>{{ board.title }}</h1> -->
        <!-- <font-awesome-icon icon="arrow-down" /> -->
        <group-list
          v-if="board"
          @toggleUpdates="toggleUpdates"
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
        @addItemWithoutServer="addItemWithoutServer"
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
        socketService.emit('curr board', this.$route.params.boardId);
      },
      immediate: true,
    },
  },
  created() {
    this.$store.commit({ type: 'setCurrPage', page: 'mainPage' });
    socketService.on('boardChanged', (boardId) => {
      // console.log('boardId',boardId);
      this.$store.dispatch({ type: 'setCurrBoard', boardId });
    });
  },
  methods: {
    toggleUpdates(task, groupId) {
      // console.log('task,groupId',task,groupId);
      this.$store.dispatch({
        type: 'taskForDeatil',
        groupId,
        boardId: this.board._id,
        task,
      });
      this.isDetails = !this.isDetails;
    },
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
    editTask(groupId, task) {
      // console.log('groupId, task',groupId, task);
      this.$store.dispatch({
        type: 'addItem',
        boardId: this.board._id,
        groupId: groupId,
        task,
      });
    },
    addItemWithoutServer(groupId, task) {
      // console.log('groupId, task',groupId, task);
      this.$store.dispatch({
        type: 'addItemWithoutServer',
        boardId: this.board._id,
        groupId: groupId,
        task,
      });
    },
    updatedStatus(groupId, task) {
      // console.log('i am in board', groupId, task);
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
