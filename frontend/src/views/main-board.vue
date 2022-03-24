<template>
  <section v-if="boards" class="main-board">
    <section class="board-header-content">
      <div class="board-header-main">
        <div class="title">
          <p>sprint 4</p>
        </div>

        <div class="right-side-header">
          <div>
            <button class="last-seen-btn">
              <p>Last seen</p>
              <div>images users?</div>
            </button>
          </div>

          <div>Invite/ <span>4</span></div>

          <div>Activty</div>

          <div class="add-to-board">
            <p>+ Add to board</p>
          </div>

          <div class="container-dots">
            <img
              class="dots-icon"
              src="../../styles/icon/three-dots.svg"
              alt=""
            />
          </div>
        </div>
      </div>
      <p class="subtitle">
        Check out the following items to learn about all the cool features and
        tools monday.com has for you :-)
      </p>

      <div class="board-toolbar">
        <!-- <button class="loolbar-btn">Main-table</button> -->
        <div class="toolbar-btns flex">
          <div>
            <button>Main-table</button>
          </div>

          <div>
            <button>Chart</button>
          </div>

          <div>
            <button>Main-table</button>
          </div>

          <div>
            <button>Gantt</button>
          </div>

          <div>
            <button>Kanban</button>
          </div>

          <div>
            <button>Add View</button>
          </div>
        </div>

        <div>
          <div>Integrate | Automate</div>
        </div>
      </div>

      <div>
        <board-filter @addGroup="addGroup" @setFilter="setFilter" />
        <!-- <button>New item</button> -->
      </div>
    </section>
    <section class="board-content">
      <h1>{{ boards[0].title }}</h1>
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
  components: { groupList, boardFilter },
};
</script>
