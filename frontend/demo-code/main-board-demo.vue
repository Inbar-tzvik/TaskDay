<template>
  <section class="main-board">
        <group-list
          v-if="board"
          @toggleUpdates="toggleUpdates"
          @updatedStatus="updatedStatus"
          @updateGroup="updateGroup"
          @addTask="addTask"
          @deleteGroup="deleteGroup"
          @removeTask="removeTask"
          @editTask="editTask"
          :board="board"
        />
    </section>
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
      isDetails: false,
    };
  },
  computed: {
    board() {
      return this.$store.getters.currBoard;
    },
  },
  methods: {
    editTask(groupId, task) {
      this.$store.dispatch({
        type: 'addTask',
        boardId: this.board._id,
        groupId: groupId,
        task,
      });
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
