<template>
  <section class="group-list">
    <ul v-for="group in boards.groups" :key="group.id">
      <input @blur="saveId($event.target.value, group)" @keyup.enter="saveId($event.target.value, group)" />
      <!-- <p>{{ group.style.bgColor }}</p> -->
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

  created() {
    // this.currGroup = this.group;
    // console.log(this.group.title);
  },
  components: {
    itemList,
  },
  methods: {
    saveId(value, group) {
      console.log(value, group);

      // this.currGroup = await getGroupById;
    },
    removeItem(itemId, groupId) {
      this.$emit('removeItem', itemId, groupId);
    },
    addItem(groupId, newTask) {
      this.$emit('addItem', groupId, this.newTask);
    },
    deleteGroup(groupId) {
      this.$emit('deleteGroup', groupId);
    },
    changeGroupName() {
      console.log(this.group.title);
    },
  },
};
</script>
