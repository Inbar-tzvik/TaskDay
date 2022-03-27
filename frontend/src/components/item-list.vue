<template>
  <!-- <ul class="group-list"> -->
  <section class="item-list">
    <Container :get-child-payload="getChildPayload" orientation="vertical" @drop="onDrop">
      <Draggable v-for="task in group.tasks" :key="task.id">
        <!-- <li v-for="task in group.tasks" :key="task.id" class="row-item"> -->
        <li class="row-item" @click="isClicked = false">
          <el-dropdown class="side-drop-down" trigger="click">
            <span class="el-dropdown-link">
              <font-awesome-icon
                class="font-arrow-down"
                icon="caret-down"
                style="
                   {
                  }
                "
              />
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="remove(task.id)"
                  ><font-awesome-icon icon="trash-can" /> Delete
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <section class="data-in-row">
            <!-- <font-awesome-icon icon="caret-down"></font-awesome-icon> -->
            <item-preview :group="group.style" :task="task" @editTask="editTask" />
            <label v-for="(cmp, idx) in cmps" :key="cmp">
              <!-- <pre>{{ task }}</pre> -->
              <component :is="cmp" :task="task" @setVal="setAns($event, idx)"></component>
              <!-- <component :is="cmp" :info="task" @setVal="setAns($event, idx)"></component> -->
            </label>
          </section>
          <div class="end-row"></div>
        </li>
      </Draggable>
    </Container>
    <div class="add-item" v-if="newTask">
      <div class="add-left-indicator">
        <div class="add-left-indicator-inner" :style="{ backgroundColor: group.style.color }"></div>
      </div>
      <form>
        <input
          @click="isClicked = true"
          class="add-new-item"
          placeholder="+ Add Item"
          v-model="newTask.title"
          type="text"
        />
        <button v-if="isClicked" @click="addItem(group.id)">Add</button>
      </form>
      <div class="end-row"></div>
    </div>
  </section>
</template>

<script>
import itemPreview from './item-preview.vue';
import { boardGroupService } from '../services/board-group-service.js';
import statusPicker from './status-picker.vue';
import datePicker from './date-picker.vue';
import { Container, Draggable } from 'vue3-smooth-dnd';

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
      cmps: null,
      currGroup: null,
      isClicked: false,
    };
  },
  async created() {
    this.currGroup = JSON.parse(JSON.stringify(this.group));
    this.getEmptyNewTask();
    try {
      const board = await boardGroupService.query();
      this.cmps = board[0].cmpsOrder;
      console.log(this.cmps[0]);
    } catch {
      console.log('error occured while getting board');
    }
  },
  components: {
    itemPreview,
    statusPicker,
    datePicker,
    Container,
    Draggable,
  },
  methods: {
    getChildPayload(index) {
      var item = this.currGroup.tasks[index];
      return {
        item,
        // generate custom payload data here
      };
    },
    remove(itemId) {
      var itemIdx = this.currGroup.tasks.findIndex((task) => task.id === itemId);
      this.currGroup.tasks.splice(itemIdx, 1);
      this.$emit('removeItem', itemId, this.group.id);
    },
    getEmptyNewTask() {
      this.newTask = boardGroupService.createEmptyTask();
      // console.log(this.newTask);
    },
    addItem(groupId) {
      // console.log(groupId, this.newTask);
      if (this.newTask.title) {
        this.$emit('addItem', groupId, this.newTask);
        this.currGroup.tasks.push(this.newTask);
        this.getEmptyNewTask();
      }
      //save the one
      //add new one
      // this.getEmptyNewTask;
    },

    editTask(item) {
      this.$emit('editTask', item, this.group.id);
    },
    onDrop(dropResult) {
      this.currGroup.tasks = this.applyDrag(this.currGroup.tasks, dropResult);
      // console.log(this.currGroup);

      // TODO GETTERSD CURR BOARD!!
      this.$store.dispatch({ type: 'updateGroup', currGroup: this.currGroup, boardId: 'b101' });

      //dispach -> to update  board!
    },
    applyDrag(arr, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult;

      console.log('arr,removedIndex, addedIndex, payload', arr, removedIndex, addedIndex, payload);
      // console.log('before one:',this.group.tasks);
      if (removedIndex === null && addedIndex === null) return arr;
      const result = [...arr];
      let itemToAdd = payload;
      // removedIndex = 0
      // console.log('before two:',result);
      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
      }
      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
      }
      // console.log('after one:',this.group.tasks);
      console.log('after two:', result);
      return result;
    },
  },
};
</script>
