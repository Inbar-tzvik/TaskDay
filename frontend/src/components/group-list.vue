<template>
  <section class="group-list">
    <ul v-for="group in boards.groups" :key="group.id">
      <h4>-{{ group.title }}</h4>
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
  },
};
</script>
