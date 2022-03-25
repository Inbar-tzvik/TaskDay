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

<style lang="scss">
el-date-picker {
  width: 200px;
}
.el-date-editor :nth-child(2) {
  border-radius: 11px 0 0 11px;
}
.el-date-editor :nth-child(4) {
  border-radius: 0 11px 11px 0;
}
.el-range-editor.el-input__inner {
  width: 13.57rem;
  height: 1.64rem;
  font-size: 13px;
  box-shadow: 0 0 0 0;
  // border-radius: 0;
  background-color: #f5f6f8;

  input {
    background-color: #c4c4c4;
    // border-radius: 11px;
  }
  .el-range-separator {
    background-color: #c4c4c4;
    // border-radius: 11px;
  }
}
.el-date-editor .el-range-input {
  font-size: 13px;
}
// #c4c4c4
// }  display: flex;
//   padding: 0;
//   flex-wrap: wrap;
// }
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
  margin: 0 auto;
  height: 2.57rem;
  background-color: #f5f6f8;

  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
.el-date-editor .el-range__icon {
  display: none;
  /* background-color: red; */
}
</style>
