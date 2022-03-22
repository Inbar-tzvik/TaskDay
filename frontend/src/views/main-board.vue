<template>
  <section v-if="boards" class="main-board">
    <button>New item</button>
    <h1>{{ boards[0].title }}</h1>
    <board-filter @setFilter="setFilter" />
    <!-- <pre>{{ boards.groups }}</pre> -->
    <group-list @removeItem="removeItem" :boards="boards[0]" />
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
  },
  components: { groupList, boardFilter },
};
</script>
