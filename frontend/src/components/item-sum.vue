<template>
  <section v-if="cmps" class="task-full-line">
    <div class="epmty-div"></div>
    <div v-for="cmp in cmps" :key="cmp.length + Math.random()">

      <section class="progress-bar" v-if="statusToShow(cmp)">
        <div
          class="el-progress-bar"
          v-for="(status, key) in statusCount(cmp)"
          :key="status +  Math.random()"
          :style="styleObj(key, status)"
        ></div>
      </section>

      <section class="progress-bar" v-if="datesToCount(cmp)">
        <div class="block flex">
          <div class="time-to-show" :style="styleObject">
            <span class="date-to-show">{{ datesToShow }}</span>
            <span class="days-count-to-show">{{ daysCountToshow }}</span>
          </div>
        </div>
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
      datesArray: [],
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
      return {
        backgroundColor: this.optsStatus[status],
        width: width,
      };
    },
    DatesToShow(cmp) {
      if (cmp === 'Timeline') return true;
    },
    priorityToShow(cmp) {
      if (cmp === 'Priority') return true;
    },
    statusToShow(cmp) {
        return cmp === 'Status';
    },
    statusCount(cmp) {
      if (cmp !== 'Status') return;
      const statusMap = {};
      const cellsColorsStatus = [];
      this.group.tasks?.forEach((item) => {
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
      if (cmp !== 'Priority') return;
      const priorityMap = {};
      const cellsColorsPriority = [];
      this.group.tasks?.forEach((item) => {
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
    datesToCount(cmp) {
      if (cmp !== 'Timeline') return;

//delete this shit!!!!!!!!!!
      // this.datesArray = [null, null];
   
      this.group.tasks?.forEach((item) => {
        // console.log(item.dates);
        if (item.dates.startDate !== '' && !this.datesArray[0]) {
          this.datesArray[0] = item.dates.startDate;
        } else if (
          this.datesArray[0] !== null &&
          item.dates.startDate < this.datesArray[0] &&
          item.dates.startDate !== ''
        )
          this.datesArray[0] = item.dates.startDate;
      });
      this.group.tasks?.forEach((item) => {
        if (item.dates.endDate !== '' && !this.datesArray[1]) this.datesArray[1] = item.dates.endDate;
        else if (this.datesArray[1] !== null && item.dates.endDate > this.datesArray[1])
          this.datesArray[1] = item.dates.endDate;
      });
      // console.log('array of dates', this.datesArray);
      return true;
    },
  },

  
  computed: {
    datesToShow() {
      if (!this.datesArray[0] && !this.datesArray[1]) return '-';
      var dates = this.datesArray.map((date) => {
        var month = new Date(date).toString().slice(4, 7);
        var day = new Date(date).toString().slice(8, 11);
        return `${month} ${day}`;
      });
      var datesToShowStr = dates[0] + ' - ' + dates[1];
      if (dates[0].slice(0, 3) === dates[1].slice(0, 3)) {
        if (dates[0].slice(4, 6) === dates[1].slice(4, 6)) {
          datesToShowStr = datesToShowStr.slice(0, 6);
        } else {
          datesToShowStr = datesToShowStr.slice(0, 7) + ' - ' + datesToShowStr.slice(13, 16);
        }
      }
      return datesToShowStr;
    },
    daysCountToshow() {
      if (!this.datesArray[0] && !this.datesArray[1]) return '';
      return Math.floor((new Date(this.datesArray[1]) - new Date(this.datesArray[0])) / 1000 / 60 / 60 / 24 + 1) + 'd';
    },
    styleObject() {
      // return { "background-color": this.groupColor };

      if (!this.datesArray[0] && !this.datesArray[1]) return { backgroundColor: '#c4c4c4' };
      const diff = this.datesArray[1] - this.datesArray[0];
      const today = Date.now();
      if (!this.datesArray[1] || today > this.datesArray[1]) return { backgroundColor: this.group.style.color };
      else if (!this.datesArray[0] || today < this.datesArray[0]) return { backgroundColor: '#1f1f1f' };
      const startPrecent = diff / (today - this.datesArray[0]);
      const degPrecent = 100 - Math.floor(100 / startPrecent);
      return {
        background: `linear-gradient(to left, #1f1f1f 0% ${degPrecent}%, ${this.group.style.color} ${degPrecent}% 100%)`,
      };
    },
  },
};
</script>
