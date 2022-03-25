<template>
  <div class="demo-date-picker">
    <div class="block">
      <!-- <span class="demonstration">Default</span> -->
      <el-date-picker v-model="value1" type="daterange" />
    </div>
  </div>
</template>

<script>
// start-placeholder="Start date"
//   end-placeholder="End date"
export default {
  name: 'item-preview',
  data() {
    return {
      value1: '',
      // value2: '',
    };
  },
  props: {
    task: Object,
  },
  components: {},
  computed: {},
  methods: {},
};
</script>

<style scoped>
el-date-picker {
  width: 200px;
}
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}
.demo-date-picker .block {
  /* padding: 30px 0; */
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}
.demo-date-picker .block:last-child {
  border-right: none;
}
.demo-date-picker {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
