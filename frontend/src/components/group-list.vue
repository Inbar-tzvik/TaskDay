<template>
  <section class="group-list">
    <ul v-for="group in boards.groups" :key="group.id">
      <input
        @blur="saveGroup($event.target.value, group)"
        @keyup.enter="saveGroup($event.target.value, group)"
        v-model="group.title"
      />
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

  created() {},
  components: {
    itemList,
  },
  methods: {
    saveGroup(value, group) {
      console.log(value, group);
      var currGroup = JSON.parse(JSON.stringify(group));
      currGroup.title = value;
      console.log(currGroup);
      this.$emit('updateGroup', currGroup);

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
