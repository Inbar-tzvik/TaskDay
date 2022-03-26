<template>
  <section class="group-list">
    <ul v-for="group in boards.groups" :key="group.id">


      <li class="group-first-line">

      <div class="group-title-btn">
        <img src="../assets/caret-down.svg" />
      </div>
      <input
        @blur="saveGroup($event.target.value, group)"
        @keyup.enter="saveGroup($event.target.value, group)"
        v-model="group.title"
        :style="{ color: group.style.color }"
      />
      <!-- <p>{{ group.style.bgColor }}</p> -->
      <!-- <h4>-{{ group.title }}</h4> -->
      <button @click="deleteGroup(group.id)">Delete</button>

      </li>

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
  data() {
    return {
      currentGroup: null,
    };
  },

  created() {
    // this.currentGroup = JSON.parse(JSON.stringify(this.group));
  },
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
