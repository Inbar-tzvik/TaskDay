<template>
  <!-- <ul class="group-list"> -->
  <section class="item-list">
    <Container
      group-name="tasksForDrop"
      :get-child-payload="getItemPayload(group)"
      orientation="vertical"
      @drop="onDrop($event, 'tasksForDrop')"
    >
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
                <!-- <arrow-down /> -->
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="remove(task.id)">
                  <font-awesome-icon icon="trash-can" />Delete
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <section class="data-in-row">
            <!-- <font-awesome-icon icon="caret-down"></font-awesome-icon> -->
            <item-preview :group="group.style" :task="task" @editTask="editTask" @toggleUpdates="toggleUpdates" />
            <label v-for="(cmp, idx) in cmps" :key="cmp">
              <!-- <pre>{{ task }}</pre> -->
              <component
                @updatedStatus="updatedStatus"
                :is="cmp"
                :task="task"
                :group="group"
                :board="board"
                @setVal="setAns($event, idx)"
                @removeAssignedMember="removeAssignedMember"
                @changedDates="changedDates"
              ></component>
              <!-- <component :is="cmp" :info="task" @setVal="setAns($event, idx)"></component> -->
            </label>
          </section>
          <div class="end-row"></div>
        </li>
      </Draggable>
    </Container>
    <div class="add-item" v-if="newTask">
      <div class="empty-block"></div>
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
        <div class="left-space"></div>
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
    board: {
      type: Object,
    },
  },
  data() {
    return {
      currGroup: JSON.parse(JSON.stringify(this.group)),
      // tasksForDrop: JSON.parse(JSON.stringify(this.group.tasks)),
      // tasksForDrop:this.group.tasks,
      // currGroups: [],
      currTasks: JSON.parse(JSON.stringify(this.group.tasks)),
      newTask: null,
      cmps: null,
      currBoard: JSON.parse(JSON.stringify(this.board)),
      // currGroup: null,
      isClicked: false,
      counter: 0,
    };
  },
  async created() {
    this.counter = 0;
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
        toggleUpdates(task){
          // console.log('taskIdtaskId',task,this.group.id);
this.$emit('toggleUpdates', task,this.group.id);
    },
    changedDates(task) {
      console.log('change dates', task);
      this.$store.dispatch({
        type: 'addItem',
        boardId: this.board._id,
        groupId: this.group.id,
        task: task,
      });
    },
    updatedStatus(updatedTask) {
      this.$emit('updatedStatus', this.group.id, updatedTask);
      this.updateStatus();
    },
    getItemPayload(group) {
      //        var currFilter = this.$store.getters.filterBy?this.$store.getters.filterBy:'';
      // if(!(!currFilter || currFilter.title !== '' || currFilter.user !== '')) return
      // console.log('group',group);
      return (index) => group.tasks[index];
    },
    onDrop(dropResult) {
      //        var currFilter = this.$store.getters.filterBy?this.$store.getters.filterBy:'';
      // if(!(!currFilter || currFilter.title !== '' || currFilter.user !== '')) return
      this.group.tasks = this.applyDrag(this.group.tasks, dropResult);
      this.$store.dispatch({ type: 'updateBoard', board: this.board });
    },
    applyDrag(tasks, dragResult) {
      //        var currFilter = this.$store.getters.filterBy?this.$store.getters.filterBy:'';
      // if(!(!currFilter || currFilter.title !== '' || currFilter.user !== '')) return tasks
      // console.log('tasks', tasks);
      const { removedIndex, addedIndex, payload } = dragResult;
      if (removedIndex === null && addedIndex === null) return tasks;
      let itemToAdd = payload;
      if (removedIndex !== null) {
        itemToAdd = tasks.splice(removedIndex, 1)[0];
      }
      if (addedIndex !== null) {
        tasks.splice(addedIndex, 0, itemToAdd);
      }
      return tasks;
    },
    remove(itemId) {
      // var itemIdx = this.currGroup.tasks.findIndex((task) => task.id === itemId);
      // this.currGroup.tasks.splice(itemIdx, 1);
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
        // this.currGroup.tasks.push(this.newTask);
        this.getEmptyNewTask();
      }
    },

    editTask(item) {
      this.$emit('editTask', item, this.group.id);
    },
    updateStatus() {},
    removeAssignedMember(personId, task) {
      const item = JSON.parse(JSON.stringify(task));
      const personIdx = item.members.findIndex((person) => person._id === personId);
      item.members.splice(personIdx, 1);
      this.$store.dispatch({
        type: 'addItem',
        boardId: this.board.id,
        groupId: this.groupId.id,
        task: item,
      });
    },
  },
};
</script>

<style>
.left-space {
  height: 33px;
  width: 540px;
  border: 1px solid #d0d4e4;
  border-left: none;
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
  align-items: center;
}
.status-progress-bar {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
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
  width: 25px;
  height: 35px;
}
</style>
