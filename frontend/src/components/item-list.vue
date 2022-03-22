<template>
  <!-- <ul class="group-list"> -->
  <section>
    <li v-for="task in group.tasks" :key="task.id">
      <item-preview :task="task" @removeItem="removeItem" />
    </li>
    <!-- <item-preview @removeToy="removeToy" v-for="toy in toys" :key="toy.id" :toy="toy" /> -->
    <!-- </ul> -->
  </section>
</template>

<script>
import itemPreview from './item-preview.vue';

export default {
  props: {
    group: {
      type: Object,
      // required: true,
    },
  },
  components: {
    itemPreview,
  },
  methods: {
    removeItem(itemId) {
      this.$emit('removeItem', itemId);
    },
  },
};
</script>
