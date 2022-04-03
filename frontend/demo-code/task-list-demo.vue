<template>
  <!-- <ul class="group-list"> -->
  <section class="task-list">
    <Draggable v-for="task in group.tasks" :key="task.id">
      <task-preview 
      :group="group.style" 
      :task="task" 
      @editTask="editTask" 
      @toggleUpdates="toggleUpdates" 
      />
  </section>
</template>

<script>
import taskPreview from './task-preview.vue';
import { boardGroupService } from '../services/board-group-service.js';
import Status from './Status.vue';
import Timeline from './Timeline.vue';
import { Container, Draggable } from 'vue3-smooth-dnd';
import Priority from './Priority.vue';
import Person from './Person.vue';
import { objectEntries } from '@antfu/utils';

export default {
  props: {
    group: {
      type: Object,
      // required: true,
    },
    board: {
      type: Object,
    },
  },
  data() {
  },
  components: {
    taskPreview,
    Status,
    Timeline,
    Container,
    Draggable,
    Priority,
    Person,
  },
  methods: {
    editTask(task) {
      this.$emit('editTask', task, this.group.id);
    },
  },
};
</script>

<style>
.left-space {
  height: 33px;
  /* width: 540px; */
  border: 1px solid #d0d4e4;
  border-left: none;
  flex: 1 1 auto;
}
.progress {
  max-width: 100%;
  height: 100%;
  max-width: 100%;
  /* z-index: 1; */
  height: 25px;
  width: 20%;
  background-color: green;
}
.taskDrag {
  background-color: red;
}
.colors-status {
  position: absolute;
  z-index: 1;
  width: 100%;
  display: flex;
  align-tasks: center;
}
.status-progress-bar {
  width: 100%;
  height: 40px;
  display: flex;
  align-tasks: center;
  justify-content: center;
  background-color: #f5f6f8;

  /* left: -800px; */
}
.task-full-line {
  display: grid;
  grid-template-columns: 700px repeat(4, 190px) 30px;
  height: 40px;
  left: 30px;
  margin-left: 25px;
  /* display: block; */
  /* width: 799px; */
}
.epmty-div {
  position: sticky;
  left: 40px;
  background-color: white;
  opacity: 0.9;
}
.empty-block {
  position: sticky;
  /* left: 16px; */
  flex-shrink: 0;
  z-index: 2;
  width: 21px;
  height: 35px;
}
</style>
