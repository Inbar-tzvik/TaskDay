<template>
  <section>
    <ul v-for="group in boards.groups" :key="group.id">
      <h4>-{{ group.title }}</h4>
      <item-list :group="group" />
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
    removeToy(toyId) {
      this.$emit('removeToy', toyId);
    },
  },
};
</script>
