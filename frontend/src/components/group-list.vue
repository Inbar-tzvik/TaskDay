<template>
  <ul class="group-list">
    <!-- <li v-for="n in 10" :key="Math.random() * 100 + n">{{ n }}</li> -->
    <h4>-group name-</h4>
    <item-list />
    <!-- <toy-preview @removeToy="removeToy" v-for="toy in toys" :key="toy.id" :toy="toy" /> -->
  </ul>
</template>

<script>
import itemList from './item-list.vue';

export default {
  props: {
    toys: {
      type: Array,
      required: true,
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
