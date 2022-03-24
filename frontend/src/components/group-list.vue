<template>
  <section class="group-list">
    <ul v-for="group in boards.groups" :key="group.id">
      <input
        @blur="saveGroup($event.target.value, group)"
        @keyup.enter="saveGroup($event.target.value, group)"
        v-bind:placeholder="group.title"
      />
      <!-- <p>{{ group.style.bgColor }}</p> -->
      <!-- <h4>-{{ group.title }}</h4> -->
      <button @click="deleteGroup(group.id)">Delete</button>
      <item-list :group="group" @editTask="editTask" @addItem="addItem" @removeItem="removeItem" />
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
      var currGroup = JSON.parse(JSON.stringify(group));
      if (value) {
        currGroup.title = value;
        console.log(currGroup);
        this.$emit('updateGroup', currGroup);
      }

      // this.currGroup = await getGroupById;
    },
    removeItem(itemId, groupId) {
      this.$emit('removeItem', itemId, groupId);
    },
    addItem(groupId, newTask) {
      this.$emit('addItem', groupId, newTask);
    },
    deleteGroup(groupId) {
      this.$emit('deleteGroup', groupId);
    },
    editTask(item, groupId) {
      this.$emit('editTask', groupId, item);
    },
  },
};
</script>
