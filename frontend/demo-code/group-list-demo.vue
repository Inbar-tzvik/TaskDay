<template>
  <section class="group-list">
      <Draggable v-for="group in board.groups" :key="group.id">
            <task-list
            @toggleUpdates="toggleUpdates"
            @updatedStatus="updatedStatus"
            :board="board"
            :group="group"
            @editTask="editTask"
            @addTask="addTask"
            @removeTask="removeTask"
          />
  </section>
</template>

<script>
import taskList from './task-list.vue';

export default {
  props: {
    board: {
      type: Object,
    },
    emits: ['updateGroup', 'removeTask', 'addTask', 'deleteGroup', 'editTask'],
  },
  methods: {
    editTask(task, groupId) {
      this.$emit('editTask', groupId, task);
    },
  }
};
</script>

<style>
.group-name-func-drag {
  color: #c4c4c4;
}
.cmp-column-title {
  color: #676879;
  left: 168px;
  min-width: 188px;
  justify-content: center;
  align-tasks: center;
  /* margin: 0 5px; */
  /* //TODO - height should be determine! */
  height: 40px;
}
.cmp-column-title:hover {
  background-color: #f5f6f8;
  /* transition: 0s; */
}
.inside-column-left {
  height: 100%;
  width: 20px;
  display: flex;
  align-tasks: center;
}
.inside-column-left svg path {
  cursor: move;
}
.inside-column-center span:hover {
  /* margin: 0.5rem; */
  /* padding: 1px; */
  border: dashed #c8c9cb 0.2px;
  cursor: text;
}
.inside-column-right div {
  width: 12px;
  padding-top: 5px;
  /* justify-content:flex-start; */
}
</style>
