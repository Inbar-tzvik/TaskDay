<template>
  <div v-if="currentTask" class="task-preview">
<!-- TASK PROPERTIES RENDER IN THIS COMPONENT-->
    <input
          v-if="onEdit"
          @blur="editTask($event.target.value, task)"
          @keyup.enter="editTask($event.target.value, task)"
          v-model="currentTask.title"
        />
  </div>
</template>

<script>
export default {
  name: 'task-preview',
  data() {
    return {
      onEdit: false,
      currentTask: null,
    };
  },
  props: {
    task: Object,
    group: Object,
  },
  created() {
    this.currentTask = JSON.parse(JSON.stringify(this.task));
  },
  components: {},
  computed: {},
  methods: {
    editTask(value, task) {
      var currTask = JSON.parse(JSON.stringify(task));
      this.onEdit = false;
      if (value) {
        currTask.title = value;
        this.$emit('editTask', currTask);
      } else {
        this.currentTask.title = this.task.title;
      }
    },
  },
};
</script>
