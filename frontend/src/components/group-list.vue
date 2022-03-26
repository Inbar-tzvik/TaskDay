<template>
  <section class="group-list">
    <ul v-for="group in boards.groups" :key="group.id">
      <div class="group-header-columns">
        <div class="group-title-btn">
          <font-awesome-icon
            icon="caret-down"
            :style="{ backgroundColor: group.style.color, borderColor: group.style.color }"
          />
        </div>
        <input
          @blur="saveGroup($event.target.value, group)"
          @keyup.enter="saveGroup($event.target.value, group)"
          v-model="group.title"
          :style="{ color: group.style.color }"
        />
        <button @click="deleteGroup(group.id)">Delete</button>
        <!-- *****ITZIK***** -->
        <div class="cmp-colomn-title" v-for="cmp in boards.cmpsOrder" :key="cmp">
<<<<<<< HEAD
          <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" class="drag-handle"><path d="M7.5 4C6.67157 4 6 3.32843 6 2.5 6 1.67157 6.67157 1 7.5 1 8.32843 1 9 1.67157 9 2.5 9 3.32843 8.32843 4 7.5 4zM12.5 4C11.6716 4 11 3.32843 11 2.5 11 1.67157 11.6716 1 12.5 1 13.3284 1 14 1.67157 14 2.5 14 3.32843 13.3284 4 12.5 4zM7.5 9C6.67157 9 6 8.32843 6 7.5 6 6.67157 6.67157 6 7.5 6 8.32843 6 9 6.67157 9 7.5 9 8.32843 8.32843 9 7.5 9zM12.5 9C11.6716 9 11 8.32843 11 7.5 11 6.67157 11.6716 6 12.5 6 13.3284 6 14 6.67157 14 7.5 14 8.32843 13.3284 9 12.5 9zM7.5 14C6.67157 14 6 13.3284 6 12.5 6 11.6716 6.67157 11 7.5 11 8.32843 11 9 11.6716 9 12.5 9 13.3284 8.32843 14 7.5 14zM7.5 19C6.67157 19 6 18.3284 6 17.5 6 16.6716 6.67157 16 7.5 16 8.32843 16 9 16.6716 9 17.5 9 18.3284 8.32843 19 7.5 19zM12.5 14C11.6716 14 11 13.3284 11 12.5 11 11.6716 11.6716 11 12.5 11 13.3284 11 14 11.6716 14 12.5 14 13.3284 13.3284 14 12.5 14zM12.5 19C11.6716 19 11 18.3284 11 17.5 11 16.6716 11.6716 16 12.5 16 13.3284 16 14 16.6716 14 17.5 14 18.3284 13.3284 19 12.5 19z" fill="currentColor"></path></svg>
=======
          <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" class="drag-handle">
            <path
              d="M7.5 4C6.67157 4 6 3.32843 6 2.5 6 1.67157 6.67157 1 7.5 1 8.32843 1 9 1.67157 9 2.5 9 3.32843 8.32843 4 7.5 4zM12.5 4C11.6716 4 11 3.32843 11 2.5 11 1.67157 11.6716 1 12.5 1 13.3284 1 14 1.67157 14 2.5 14 3.32843 13.3284 4 12.5 4zM7.5 9C6.67157 9 6 8.32843 6 7.5 6 6.67157 6.67157 6 7.5 6 8.32843 6 9 6.67157 9 7.5 9 8.32843 8.32843 9 7.5 9zM12.5 9C11.6716 9 11 8.32843 11 7.5 11 6.67157 11.6716 6 12.5 6 13.3284 6 14 6.67157 14 7.5 14 8.32843 13.3284 9 12.5 9zM7.5 14C6.67157 14 6 13.3284 6 12.5 6 11.6716 6.67157 11 7.5 11 8.32843 11 9 11.6716 9 12.5 9 13.3284 8.32843 14 7.5 14zM7.5 19C6.67157 19 6 18.3284 6 17.5 6 16.6716 6.67157 16 7.5 16 8.32843 16 9 16.6716 9 17.5 9 18.3284 8.32843 19 7.5 19zM12.5 14C11.6716 14 11 13.3284 11 12.5 11 11.6716 11.6716 11 12.5 11 13.3284 11 14 11.6716 14 12.5 14 13.3284 13.3284 14 12.5 14zM12.5 19C11.6716 19 11 18.3284 11 17.5 11 16.6716 11.6716 16 12.5 16 13.3284 16 14 16.6716 14 17.5 14 18.3284 13.3284 19 12.5 19z"
              fill="currentColor"
            ></path>
          </svg>
>>>>>>> e60707804b19899c649640ca6f588f01376da398
          <!-- <img
            class="dots-icon"
            src="../components/icons/sort-column-icon.vue"
            alt=""
          /> -->
          <span>{{ cmp }}</span>
<<<<<<< HEAD
          </div>
=======
        </div>
>>>>>>> e60707804b19899c649640ca6f588f01376da398
        <!-- *****ITZIK***** -->
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

<style>
<<<<<<< HEAD
.cmp-colomn-title{
  color:#676879;
  align-self: center;
  /* width? */

  /* for cass?
  &:hover {
background-color: #f5f6f8
  } */
}
.cmp-colomn-title:hover{
  background-color: #f5f6f8

}
</style>
=======
.cmp-colomn-title {
  color: #676879;
  align-self: center;
  /* width? */
  /* for cass?
  &:hover {
background-color: #F5F6F8
  } */
}
.cmp-colomn-title:hover {
  background-color: #f5f6f8;
}
</style>
>>>>>>> e60707804b19899c649640ca6f588f01376da398
