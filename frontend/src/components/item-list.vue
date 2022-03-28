<template>
  <!-- <ul class="group-list"> -->
  <section class="item-list">
    <Container group-name="tasksForDrop" :get-child-payload="getChildPayload" orientation="vertical" @drop="onDrop($event, 'tasksForDrop')">
      <Draggable v-for="task in currGroup.tasks" :key="task.id" :non-drag-area-selector="item-preview">
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
                <!-- <arrow-down /> -->
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
import priorityPicker from './priority-picker.vue';
import memberPicker from './member-picker.vue';
import { objectEntries } from '@antfu/utils';


export default {
  props: {
    group: {
      type: Object,
      // required: true,
    },
    board:{
      type: Object,
    }
  },
  data() {
    return {
      currGroup: JSON.parse(JSON.stringify(this.group)),
      // tasksForDrop: JSON.parse(JSON.stringify(this.group.tasks)),
      // tasksForDrop:this.group.tasks,
      newTask: null,
      cmps: null,
      currBoard: JSON.parse(JSON.stringify(this.board)),
      // currGroup: null,
      isClicked: false,
    };
  },
  async created() {
    // this.currGroup = JSON.parse(JSON.stringify(this.group));
    this.getEmptyNewTask();
    try {
      const board = await boardGroupService.query();
      this.cmps = board[0].cmpsOrder;
      // console.log(this.cmps[0]);
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
    priorityPicker,
    memberPicker,
  },
  methods: {
    getChildPayload(index) {
      return  this.currGroup.tasks[index];
        // generate custom payload data here
    },
    onDrop(dropResult) {

      this.currGroup.tasks = this.applyDrag(this.currGroup.tasks, dropResult);
      // this.$store.dispatch({type: 'updateBoard'},{board:this.currBoard})
      // console.log(this.currBoard);
      // this.$store.dispatch({
      //   type: 'updateBoard',
      //   board:this.currBoard,
      //   // boardId: this.boards[0]._id,
      // });
    },
        applyDrag(arr, dragResult) {
      // console.log('currBoard:', this.currBoard)
      const { removedIndex, addedIndex, payload } = dragResult;

      if (removedIndex === null && addedIndex === null) return arr;
      const result = [...arr];
      let taskToAdd = payload;

      if (removedIndex !== null) {
        taskToAdd = result.splice(removedIndex, 1)[0];
      }
      if (addedIndex !== null) {
        result.splice(addedIndex, 0, taskToAdd);
      }
      // if (result === []){
      //   result.push(taskToAdd)
      // }
      // console.log('this.currGroup',this.currGroup)

    this.$store.dispatch({
        type: 'updateGroup',
        currGroup: this.currGroup,
        boardId: this.board._id,
      });
      return result;
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
    },

    editTask(item) {
      this.$emit('editTask', item, this.group.id);
    },

  },
};
</script>
