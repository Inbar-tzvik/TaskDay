<template>
  <!-- <ul class="group-list"> -->
  <section class="item-list">
    <Container
      group-name="tasksForDrop"
      :get-child-payload="getChildPayload"
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
            <item-preview :group="group.style" :task="task" @editTask="editTask" />
            <label v-for="(cmp, idx) in cmps" :key="cmp">
              <!-- <pre>{{ task }}</pre> -->
              <component
                @updatedStatus="updatedStatus"
                :is="cmp"
                :task="task"
                @setVal="setAns($event, idx)"
              ></component>
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
    <div class="task-full-line">
      <div class="epmty-div"></div>
      <div class="status-progress-bar">
        <!-- <div class="colors-status"> -->
        <div class="progress" style="width: 30%; background-color: #fec173"></div>
        <div class="progress" style="width: 40%; background-color: #00c875"></div>
        <div class="progress" style="width: 10%; background-color: #e2435c"></div>
        <div class="progress" style="width: 20%; background-color: #c4c4c4"></div>
        <!-- </div> -->
      </div>
      <div class="date"></div>
      <div class="status-progress-bar">
        <!-- <div class="colors-status"> -->
        <div class="progress" style="width: 30%; background-color: #fec173"></div>
        <div class="progress" style="width: 40%; background-color: #00c875"></div>
        <div class="progress" style="width: 0%; background-color: #66b400"></div>
        <div class="progress" style="width: 0%; background-color: rgb(141, 3, 72)"></div>
        <!-- </div> -->
      </div>
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
      currGroups: [],

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
    updatedStatus(updatedTask) {
      this.$emit('updatedStatus', this.group.id, updatedTask);
      this.updateStatus();
    },
    getChildPayload(index) {
      // console.log('indexindexindex',index,groupId);
      return this.currGroup.tasks[index];
      // generate custom payload data here
    },
    onDrop(dropResult) {
      // console.log('dropResult',dropResult);
      const { removedIndex, addedIndex, payload } = dropResult;
      console.log('removedIndex, addedIndex', removedIndex, addedIndex);

      this.currGroup.tasks = this.applyDrag(this.currGroup.tasks, dropResult);
      // this.currGroups.push(this.currGroup)

      // if (this.currBoard.groups.length === this.counter-1) {
      // console.log('this.currGroups',this.currGroups);
      // }

      // var groupIdx = this.currBoard.groups.findIndex(group =>group.id ===this.currGroup.id)
      // this.currBoard.groups[groupIdx].tasks = this.currGroup.tasks

      // console.log('this.currBoard',this.currBoard);

      this.$store.dispatch({
        type: 'updateGroup',
        currGroup: this.currGroup,
        boardId: this.board._id,
      });
    },
    applyDrag(arr, dragResult) {
      // console.log('currBoard:', this.currBoard)
      const { removedIndex, addedIndex, payload } = dragResult;

      this.counter++;
      console.log('this.counter', this.counter);

      // console.log('removedIndex, addedIndex',removedIndex, addedIndex);

      if (removedIndex === null && addedIndex === null) return arr;
      const result = [...arr];
      let taskToAdd = payload;

      if (removedIndex !== null) {
        taskToAdd = result.splice(removedIndex, 1)[0];
      }
      if (addedIndex !== null) {
        result.splice(addedIndex, 0, taskToAdd);
      }
      // console.log('result',result);
      return result;
    },
    //     async applyDrag(arr, dragResult) {
    //       // console.log('currBoard:', this.currBoard)
    //       const { removedIndex, addedIndex, payload } = dragResult;

    //       if (removedIndex === null && addedIndex === null) return arr;
    //       const result = [...arr];
    //       let taskToAdd = payload;

    //         // console.log('removedIndex, addedIndex',removedIndex, addedIndex);

    //       if (removedIndex !== null) {
    //         // taskToAdd = result.splice(removedIndex, 1)[0];
    //         await this.remove(result[removedIndex].id)
    //       }
    //       if (addedIndex !== null) {
    //         // result.splice(addedIndex, 0, taskToAdd);
    // await this.$emit('addItem', this.group.id, taskToAdd,addedIndex);
    //       }

    //       return result;
    //     },
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
  },
};
</script>

<style>
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
  grid-template-columns: minmax(20px, 0.75fr) repeat(4, 190px) 30px;
  height: 40px;
  margin-left: 1px;
  /* display: block; */
  /* width: 799px; */
}
</style>
