<template>
  <section v-if="boards" class="main-board ">
    <section class="board-header-content">
      <div class="board-header-main">
        <div>
          <h1>sprint 4</h1>
          <p>Check out the following items to learn about all the cool features and tools monday.com has for you :-)</p>
        </div>
        <div>
          last seen | invite | activity | add to board
        </div>
      </div>

      <div class="board-toolbar">
        <!-- <button class="loolbar-btn">Main-table</button> -->
        <div class="loolbar-btns">
          <div>Main-table |Chart | Ghantt | Kanban | +Add View</div>
        </div>

        <div>
          <div>Integrate | Automate</div>
        </div>
      </div>

      <div>
        <board-filter @setFilter="setFilter" />
        <!-- <button>New item</button> -->
      </div>

    </section>
    <section class="board-content">
      <h1>{{ boards[0].title }}</h1>
      <group-list @removeItem="removeItem" :boards="boards[0]" />

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
    removeItem(itemId, groupId) {
      this.$store.dispatch({ type: 'removeItem', itemId: itemId, groupId: groupId, boardId: this.boards[0]._id });
    },
    setFilter(filterBy) {
      this.$store.dispatch({ type: 'setFilter', filterBy })
    },
  },
  components: { groupList, boardFilter },
};
</script>
