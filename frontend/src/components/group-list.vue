<template>
  <section class="group-list">
    <Container
      group-name="groupsForDrop"
      :get-child-payload="getChildPayload"
      orientation="vertical"
      @drop="onDrop($event, 'groupsForDrop')"
    >
      <Draggable v-for="group in board.groups" :key="group.id">
        <ul>
          <div class="group-header-columns">
            <div class="group-title-btn">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <font-awesome-icon
                    class="group-arrow"
                    icon="caret-down"
                    :style="{
                      backgroundColor: group.style.color,
                      borderColor: group.style.color,
                      color: group.style.color,
                    }"
                  />
                  <el-icon class="el-icon--right">
                    <!-- <arrow-down /> -->
                  </el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="deleteGroup(group.id)">
                      <font-awesome-icon icon="trash-can" />Delete
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <font-awesome-icon
                        icon="circle"
                        :style="{
                          color: group.style.color,
                        }"
                      />Change group color
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
            <div class="group-name-all" @mouseover="openGroupName = true" @mouseleave="openGroupName = false">
              <div class="group-name-func" v-show="openGroupName">
                <!-- <div class="group-name-collase">V</div> -->
                <div class="group-name-func-drag">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 256 256" id="Flat">
                    <path
                      d="M108,60.0001a16,16,0,1,1-16-16A16.00016,16.00016,0,0,1,108,60.0001Zm56,16a16,16,0,1,0-16-16A16.00016,16.00016,0,0,0,164,76.0001Zm-72,36a16,16,0,1,0,16,16A15.99985,15.99985,0,0,0,92,112.0001Zm72,0a16,16,0,1,0,16,16A15.99985,15.99985,0,0,0,164,112.0001Zm-72,68a16,16,0,1,0,16,16A15.99985,15.99985,0,0,0,92,180.0001Zm72,0a16,16,0,1,0,16,16A15.99985,15.99985,0,0,0,164,180.0001Z"
                    />
                  </svg>
                </div>
              </div>
              <input
                class="group-name"
                @blur="saveGroup($event.target.value, group)"
                @keyup.enter="saveGroup($event.target.value, group)"
                v-model="group.title"
                :style="{ color: group.style.color }"
              />
            </div>
            <!-- *****ITZIK***** -->
            <div
              class="cmp-column-title"
              v-for="cmp in board.cmpsOrder"
              :key="cmp.id"
              @mouseover="group.isOnColumnTitle = true"
              @mouseleave="group.isOnColumnTitle = false"
            >
              <div class="inside-column-left">
                <svg class="drag-handle" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                  <path
                    d="M7.5 4C6.67157 4 6 3.32843 6 2.5 6 1.67157 6.67157 1 7.5 1 8.32843 1 9 1.67157 9 2.5 9 3.32843 8.32843 4 7.5 4zM12.5 4C11.6716 4 11 3.32843 11 2.5 11 1.67157 11.6716 1 12.5 1 13.3284 1 14 1.67157 14 2.5 14 3.32843 13.3284 4 12.5 4zM7.5 9C6.67157 9 6 8.32843 6 7.5 6 6.67157 6.67157 6 7.5 6 8.32843 6 9 6.67157 9 7.5 9 8.32843 8.32843 9 7.5 9zM12.5 9C11.6716 9 11 8.32843 11 7.5 11 6.67157 11.6716 6 12.5 6 13.3284 6 14 6.67157 14 7.5 14 8.32843 13.3284 9 12.5 9zM7.5 14C6.67157 14 6 13.3284 6 12.5 6 11.6716 6.67157 11 7.5 11 8.32843 11 9 11.6716 9 12.5 9 13.3284 8.32843 14 7.5 14zM7.5 19C6.67157 19 6 18.3284 6 17.5 6 16.6716 6.67157 16 7.5 16 8.32843 16 9 16.6716 9 17.5 9 18.3284 8.32843 19 7.5 19zM12.5 14C11.6716 14 11 13.3284 11 12.5 11 11.6716 11.6716 11 12.5 11 13.3284 11 14 11.6716 14 12.5 14 13.3284 13.3284 14 12.5 14zM12.5 19C11.6716 19 11 18.3284 11 17.5 11 16.6716 11.6716 16 12.5 16 13.3284 16 14 16.6716 14 17.5 14 18.3284 13.3284 19 12.5 19z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div class="inside-column-center">
                <span>{{ cmp }}</span>
              </div>
              <div class="inside-column-right">
                <div>
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAAaklEQVRIie3Puw2AMBAE0REpMRb99wENkJFQDiSQICP8WTvakS69dwfOOecqWoFTPMsbGSLwqP0jfecE7Oi+PYA59UIVnoWq8CK0Fq9CS3EJmotL0VS8CfqHN0W/8C7oUwC2e0Iv1DkX7QJoloFuj+gDsgAAAABJRU5ErkJggg=="
                  />
                </div>
              </div>
            </div>
            <!-- *****ITZIK***** -->
          </div>
          <!-- <p>{{ group.style.bgColor }}</p> -->
          <!-- <h4>-{{ group.title }}</h4> -->

          <!-- //TOFIX - boards here is boards[0]!!! fix it!!!! -->

          <item-list
            @toggleUpdates="toggleUpdates"
            @updatedStatus="updatedStatus"
            :board="board"
            :group="group"
            @editTask="editTask"
            @addItem="addItem"
            @removeItem="removeItem"
          />
          <!-- <toy-preview @removeToy="removeToy" v-for="toy in toys" :key="toy.id" :toy="toy" /> -->
          <li c v-if="board.cmpsOrder">
            <item-sum :group="group" :cmps="board.cmpsOrder" />
          </li>
        </ul>
      </Draggable>
    </Container>
  </section>
</template>

<script>
import { ArrowDown } from '@element-plus/icons-vue';
import itemList from './item-list.vue';
import { Container, Draggable } from 'vue3-smooth-dnd';
import itemSum from './item-sum.vue';

export default {
  props: {
    board: {
      type: Object,
    },
    emits: ['updateGroup', 'removeItem', 'addItem', 'deleteGroup', 'editTask'],
  },

  data() {
    return {
      // board: this.boards[0],
      currentGroup: null,
      show: false,
      // ITZIK
      sOnColumnTitle: false,
      openGroupName: true,
      // ITZIK
    };
  },
  computed: {
    isFilterBy() {
      console.log('currFilter', !currFilter || currFilter.title !== '' || currFilter.user !== '');
      var currFilter = this.$store.getters.filterBy ? this.$store.getters.filterBy : '';
      if (!currFilter || currFilter.title !== '' || currFilter.user !== '') return false;
      else return true;
    },
    // board() {
    //   return this.board
    //   // return this.$store.getters.currBoard
  },

  mounted() {
    return this.board;
    // return this.$store.getters.currBoard
  },

  created() {
    // console.log('this group-list-created',this.board);
    // console.log('board group list',this.board);
    // this.board = this.$store.getters.currBoard
    // this.$store.dispatch({ type: 'setCurrBoard', board: this.board });
    this.openGroupName = false;
    // this.currentGroup = JSON.parse(JSON.stringify(this.group));
  },
  components: {
    itemList,
    Container,
    Draggable,
    itemSum,
  },
  methods: {
    toggleUpdates(task, groupId) {
      // console.log('taskIdtaskId',task,groupId);
      this.$emit('toggleUpdates', task, groupId);
    },
    getChildPayload(index) {
      //                 var currFilter = this.$store.getters.filterBy?this.$store.getters.filterBy:'';
      // if(!(!currFilter || currFilter.title !== '' || currFilter.user !== '')) return
      return this.board.groups[index];
    },
    onDrop(dropResult) {
      this.board.groups = this.applyDrag(this.board.groups, dropResult);
      this.$store.dispatch({
        type: 'updateBoard',
        board: this.board,
      });
    },

    applyDrag(arr, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult;

      if (removedIndex === null && addedIndex === null) return arr;
      const result = [...arr];
      let groupToAdd = payload;

      if (removedIndex !== null) {
        groupToAdd = result.splice(removedIndex, 1)[0];
      }
      if (addedIndex !== null) {
        result.splice(addedIndex, 0, groupToAdd);
      }

      return result;
    },

    saveGroup(value, group) {
      var currGroup = JSON.parse(JSON.stringify(group));
      if (value) {
        currGroup.title = value;
        // console.log(currGroup);
        this.$emit('updateGroup', currGroup);
      }
      // this.currGroup = await getGroupById;
    },
    removeItem(itemId, groupId) {
      this.$emit('removeItem', itemId, groupId);
    },
    addItem(groupId, newTask, fromIdx = null) {
      this.$emit('addItem', groupId, newTask, fromIdx);
    },
    deleteGroup(groupId, removedIndex = null) {
      this.$emit('deleteGroup', groupId, removedIndex);
    },
    editTask(item, groupId) {
      this.$emit('editTask', groupId, item);
    },
    updatedStatus(groupId, task) {
      this.$emit('updatedStatus', groupId, task);
    },
  },
};
</script>

<style>
.group-name-func-drag {
  color: #c4c4c4;
}
.cmp-column-title {
  color: #676879;
  left: 168px;
  min-width: 189px;
  justify-content: center;
  align-items: center;
  display: flex;
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
  align-items: center;
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
