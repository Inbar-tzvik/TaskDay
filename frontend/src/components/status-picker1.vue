<template>
  <label v-if="task">
    <!-- <pre>{{ task }}</pre> -->
    <p @click="modal = !modal">{{ task.status }}</p>
    <!-- <select v-model="val" @change="reportVal"> -->
    <section class="modal-options" v-if="modal" style="background-color: red">
      <p v-for="opt in opts" :key="opt">{{ opt }}</p>
    </section>
  </label>
</template>

<script>
export default {
  name: 'item-preview',
  data() {
    return {
      opts: ['Stuck', 'Working on it', 'Done', ''],
      val: '',
      modal: false,
    };
  },
  props: {
    task: Object,
  },
  created() {},
  components: {},
  computed: {},
  methods: {
    reportVal() {
      this.$emit('setVal', this.val);
    },
  },
};
</script>
