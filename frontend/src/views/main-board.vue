<template>
  <section v-if="boards" class="main-board">
    <section class="board-header-content">
      <board-header-main />

      <avatar-txt :names="['Shlomi Nugarker', 'Enbar Enbar', 'Itsik Vaknin']"></avatar-txt>

      <board-toolbar></board-toolbar>

      <board-filter @addGroup="addGroup" @setFilter="setFilter" />
      <!-- <button>New item</button> -->
      <!-- </div> -->
    </section>
    <section class="board-content">
      <h1>{{ boards[0].title }}</h1>

      <!-- <font-awesome-icon icon="arrow-down" /> -->
      <group-list
        @updateGroup="updateGroup"
        @addItem="addItem"
        @deleteGroup="deleteGroup"
        @removeItem="removeItem"
        @editTask="editTask"
        :boards="boards[0]"
      />
    </section>

    <!-- <pre>{{ boards.groups }}</pre> -->
    <!-- <group-list @removeToy="removeToy" v-if="toys" :toys="toys" /> -->

    <!-- <fun-filter></fun-filter>
    <fun-list /> -->
  </section>

  <!-- <button @click="goToEdit" class="btn btn-secondary">Add a new car</button> -->
</template>

<script>
import groupList from '../components/group-list.vue';
import boardFilter from '../components/board-filter.vue';
import boardToolbar from '../components/board-toolbar.vue';
import boardHeaderMain from '../components/board-header-main.vue';
import avatarTxt from '../components/avatar-txt.vue';

// import { boardService } from '../services/board-service.js';

export default {
  name: 'main-board',
  data() {
    return {};
  },
  computed: {
    boards() {
      return this.$store.getters.boards;
    },
  },
  created() {},
  methods: {
    updateGroup(currGroup) {
      this.$store.dispatch({
        type: 'updateGroup',
        currGroup: currGroup,
        boardId: this.boards[0]._id,
      });
    },

    removeItem(itemId, groupId) {
      this.$store.dispatch({
        type: 'removeItem',
        itemId: itemId,
        groupId: groupId,
        boardId: this.boards[0]._id,
      });
    },
    setFilter(filterBy) {
      this.$store.dispatch({ type: 'setFilter', filterBy });
    },
    addItem(groupId, task) {
      console.log(groupId, task);
      this.$store.dispatch({
        type: 'addItem',
        boardId: this.boards[0]._id,
        groupId: groupId,
        task: task,
      });
    },
    deleteGroup(groupId) {
      this.$store.dispatch({
        type: 'removeGroup',
        boardId: this.boards[0]._id,
        groupId: groupId,
      });
    },
    addGroup() {
      this.$store.dispatch({ type: 'addGroup', boardId: this.boards[0]._id });
    },
    editTask(groupId, item) {
      console.log(groupId, item);
      this.$store.dispatch({
        type: 'addItem',
        boardId: this.boards[0]._id,
        groupId: groupId,
        task: item,
      });
    },
  },
  components: {
    groupList,
    boardFilter,
    boardToolbar,
    boardHeaderMain,
    avatarTxt,
  },
};
</script>
