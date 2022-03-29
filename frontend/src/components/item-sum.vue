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
      console.log(width);
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
      console.log('statusMap', statusMap);
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
.progress {
  max-width: 100%;
  height: 100%;
  max-width: 100%;
  /* z-index: 1; */
  height: 25px;
  width: 20%;
  background-color: green;
}
.taskDrag {
  background-color: red;
}
.colors-status {
  position: absolute;
  z-index: 1;
  width: 100%;
  display: flex;
  align-items: center;
}
.progress-bar {
  /* width: 100%; */
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f6f8;

  /* left: -800px; */
}
.el-progress-bar {
  height: 25px;
}
.task-full-line {
  display: grid;
  grid-template-columns: 695px repeat(4, 190px) 30px;
  height: 40px;
  left: 30px;
  margin-left: 25px;
  /* display: block; */
  /* width: 799px; */
}
.epmty-div {
  position: sticky;
  left: 40px;
  background-color: white;
  opacity: 0.9;
}
</style>
