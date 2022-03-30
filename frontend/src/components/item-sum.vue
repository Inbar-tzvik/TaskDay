<template>
  <section v-if="cmps" class="task-full-line">
    <div class="epmty-div"></div>
    <div v-for="cmp in cmps" :key="cmp">
      <section class="progress-bar" v-if="statusToShow(cmp)">
        <div
          class="el-progress-bar"
          v-for="(status, key) in statusCount(cmp)"
          :key="key"
          :style="styleObj(key, status)"
        ></div>
      </section>

      <section class="progress-bar" v-if="priorityToShow(cmp)">
        <div
          class="el-progress-bar"
          v-for="(status, key) in priorityCount(cmp)"
          :key="key"
          :style="styleObj(key, status)"
        ></div>
      </section>
    </div>
  </section>
</template>
<script>
export default {
  name: 'itemSum',
  props: {
    group: {
      type: Object,
    },
    cmps: {
      type: Array,
    },
  },

  data() {
    return {
      optsStatus: [],
      cellsColorsStatus: [],
      cellsColorsPriority: [],
      tooltipStatus: [],
      tooltipPriority: [],
    };
  },
  created() {
    this.optsStatus = {
      Stuck: '#e2435c',
      'Working on it': '#fec173',
      Done: '#00c875',
      High: '#ff642e',
      '': '#c4c4c4',
      Medium: '#0086c0',
      Low: '#9bd226',
    };
  },
  methods: {
    totalCountStatus() {
      return this.group.tasks.length;
    },
    widthUnitStatus() {
      return (180 / this.totalCountStatus()).toFixed(1);
    },
    styleObj(status, key) {
      var width = key * this.widthUnitStatus() + 'px';
      // console.log(width);
      return {
        backgroundColor: this.optsStatus[status],
        width: width,
      };
    },
    priorityToShow(cmp) {
      if (cmp === 'priority-picker') return true;
    },
    statusToShow(cmp) {
      if (cmp === 'status-picker') {
        console.log(cmp);
        return true;
      }
    },
    statusCount(cmp) {
      if (cmp !== 'status-picker') return;
      const statusMap = {};
      const cellsColorsStatus = [];
      this.group.tasks.forEach((item) => {
        if (!cellsColorsStatus.includes(item.status)) cellsColorsStatus.push(item.status);
        if (statusMap[item.status]) {
          statusMap[item.status] += 1;
        } else {
          statusMap[item.status] = 1;
        }
        // statusMap[item.status.txt] ? statusMap[item.status.txt] + 1 : 1;
      });
      this.cellsColorsStatus = cellsColorsStatus;
      // console.log('statusMap', statusMap);
      return statusMap;
    },
    priorityCount(cmp) {
      if (cmp !== 'priority-picker') return;
      const priorityMap = {};
      const cellsColorsPriority = [];
      this.group.tasks.forEach((item) => {
        if (!cellsColorsPriority.includes(item.priority)) cellsColorsPriority.push(item.priority);
        if (priorityMap[item.priority]) {
          priorityMap[item.priority] += 1;
        } else {
          priorityMap[item.priority] = 1;
        }
        // statusMap[item.status.txt] ? statusMap[item.status.txt] + 1 : 1;
      });
      this.cellsColorsPriority = cellsColorsPriority;
      return priorityMap;
    },
  },
  computed: {
    // totalCountPriority() {
    //   return this.group.tasks.length;
    // },
    // widthUnitPriority() {
    //   return (180 / this.totalCountPriority).toFixed(1);
    // },
  },
};
</script>
<style>

</style>
