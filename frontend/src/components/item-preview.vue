<template>
  <section v-if="task" class="item-preview">
    <h3 v-if="!onEdit">{{ task.title }}</h3>
    <p>{{ task.status }}</p>
    <input
      v-if="onEdit"
      @blur="editTask($event.target.value, task, task.title)"
      @keyup.enter="editTask($event.target.value, task, task.title)"
      v-bind:placeholder="task.title"
    />
    <button @click="edit">Edit</button>
    <button @click="remove(task.id)">X</button>
  </section>
</template>

<script>
export default {
  name: 'item-preview',
  data() {
    return {
      onEdit: false,
    };
  },
  props: {
    task: Object,
  },
  components: {},
  computed: {},
  methods: {
    remove(itemId) {
      this.$emit('removeItem', itemId);
    },
    edit() {
      this.onEdit = true;
    },
    editTask(value, item, title) {
      console.log(item);
      var currTask = JSON.parse(JSON.stringify(item));
      if (value) currTask.title = value;
      else {
        currTask.title = title;
      }
      console.log(currTask);
      this.$emit('editTask', currTask);
      this.onEdit = false;
    },
  },
};
</script>
