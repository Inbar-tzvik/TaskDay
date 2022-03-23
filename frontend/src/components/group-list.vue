<template>
  <section class="group-list">
    <ul v-for="group in boards.groups" :key="group.id">
      <input @keyup.enter="changeGroupName" v-model="group.title" />
      <!-- <h4>-{{ group.title }}</h4> -->
      <button @click="deleteGroup(group.id)">Delete</button>
      <item-list :group="group" @removeItem="removeItem" />

      <!-- <toy-preview @removeToy="removeToy" v-for="toy in toys" :key="toy.id" :toy="toy" /> -->
    </ul>
  </section>
</template>

<script>
import itemList from './item-list.vue';

export default {
  props: {
    boards: {
      type: Object,
    },
  },
  components: {
    itemList,
  },
  methods: {
    removeItem(itemId, groupId) {
      this.$emit('removeItem', itemId, groupId);
    },
    addItem(groupId, newTask) {
      this.$emit('addItem', groupId, this.newTask);
    },
    deleteGroup(groupId) {
      this.$emit('deleteGroup', groupId);
    },
    changeGroupName() {},
  },
};
</script>
