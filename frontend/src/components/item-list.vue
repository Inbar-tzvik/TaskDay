<template>
  <!-- <ul class="group-list"> -->
  <section class="item-list">
    <li v-for="task in group.tasks" :key="task.id">
      <item-preview :task="task" @removeItem="removeItem" />
    </li>
    <div v-if="newTask">
      <input placeholder="Add Item" v-model="newTask.title" type="text" />
      <button @click="addItem(group.id)">Add Item</button>
      <pre>{{ this.newTask }}</pre>
    </div>
    <!-- <item-preview @removeToy="removeToy" v-for="toy in toys" :key="toy.id" :toy="toy" /> -->
    <!-- </ul> -->
  </section>
</template>

<script>
import itemPreview from './item-preview.vue';
import { boardGroupService } from '../services/board-group-service.js';
export default {
  props: {
    group: {
      type: Object,
      // required: true,
    },
  },
  data() {
    return {
      newTask: null,
    };
  },
  created() {
    console.log(this.newTask);
    this.addNewTask();
  },
  components: {
    itemPreview,
  },
  methods: {
    addNewTask() {
      this.newTask = boardGroupService.createEmptyTask();
      // console.log(this.newTask);
    },
    addItem(groupId) {
      console.log(groupId, this.newTask);
      this.$emit('addItem', groupId, this.newTask);

      //save the one
      //add new one
      this.addNewTask;
    },
    removeItem(itemId) {
      this.$emit('removeItem', itemId, this.group.id);
    },
  },
};
</script>
