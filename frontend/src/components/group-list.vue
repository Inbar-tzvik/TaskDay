<template>
  <section class="group-list">
    <ul v-for="group in boards.groups" :key="group.id">
      <div class="group-header-columns">
        <div class="group-title-btn">
          <font-awesome-icon icon="caret-down" />
        </div>
        <input
          @blur="saveGroup($event.target.value, group)"
          @keyup.enter="saveGroup($event.target.value, group)"
          v-model="group.title"
          :style="{ color: group.style.color }"
        />
        <button @click="deleteGroup(group.id)">Delete</button>
      </div>
      <!-- <p>{{ group.style.bgColor }}</p> -->
      <!-- <h4>-{{ group.title }}</h4> -->

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
