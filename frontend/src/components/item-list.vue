<template>
  <ul class="group-list">
    <!-- <li v-for="n in 10" :key="Math.random() * 100 + n">{{ n }}</li> -->
    <item-preview />
    <!-- <item-preview @removeToy="removeToy" v-for="toy in toys" :key="toy.id" :toy="toy" /> -->
  </ul>
</template>

<script>
import itemPreview from './item-preview.vue';

export default {
  props: {
    toys: {
      type: Array,
      required: true,
    },
  },
  components: {
    itemPreview,
  },
  methods: {
    removeToy(toyId) {
      this.$emit('removeToy', toyId);
    },
  },
};
</script>
