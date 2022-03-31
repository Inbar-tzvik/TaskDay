<template>
  <div v-if="task" class="timeline-picker">
    <div class="block flex">
      <div class="time-to-show" :style="styleObject">
        <span class="date-to-show">{{ datesToShow }}</span>
        <span class="days-count-to-show">{{ daysCountToshow }}</span>
      </div>
      <!-- <span class="demonstration">Default</span> -->
      <el-date-picker
        v-model="value1"
        class="timeline"
        size="small"
        type="daterange"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
        @change="changeTimeline"
      />
    </div>
  </div>
</template>

<script>
// start-placeholder="Start date"
//   end-placeholder="End date"
export default {
  props: {
    task: Object,
    board: Object,
    group: Object,
  },
  name: 'item-preview',
  data() {
    return {
      value1: '',
      startDate: this.task.dates.startDate ? this.task.dates.startDate : '',
      endDate: this.task.dates.endDate ? this.task.dates.endDate : '',
      // value2: '',
    };
  },
  created() {
    if (!this.startDate || !this.endDate) this.value1 = null;
    else this.value1 = [this.task.dates.startDate, this.task.dates.endDate];
    // console.log('value1', this.value1);
  },
  components: {},
  methods: {
    changeTimeline() {
      const newDates = [];
      if (this.value1) {
        newDates[0] = this.value1[0].getTime();
        newDates[1] = this.value1[1].getTime();
      }
      console.log(newDates[0], newDates[1]);
      // dates: { startDate: '', endDate: '' },
      var currTask = JSON.parse(JSON.stringify(this.task));
      currTask.dates = { startDate: newDates[0], endDate: newDates[1] };
      this.$emit('changedDates', currTask);
    },
  },
  computed: {
    datesToShow() {
      if (!this.value1) return '-';
      var dates = this.value1.map((date) => {
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
      if (!this.value1) return 'Set Dates';
      return Math.floor((new Date(this.value1[1]) - new Date(this.value1[0])) / 1000 / 60 / 60 / 24 + 1) + 'd';
    },
    styleObject() {
      // return { "background-color": this.groupColor };
      if (!this.value1) return { backgroundColor: '#c4c4c4' };
      const diff = this.value1[1] - this.value1[0];
      const today = Date.now();
      if (!this.value1[1] || today > this.value1[1]) return { backgroundColor: this.group.style.color };
      else if (!this.value1[0] || today < this.value1[0]) return { backgroundColor: '#1f1f1f' };
      const startPrecent = diff / (today - this.value1[0]);
      const degPrecent = 100 - Math.floor(100 / startPrecent);
      return {
        background: `linear-gradient(to left, #1f1f1f 0% ${degPrecent}%, ${this.group.style.color} ${degPrecent}% 100%)`,
      };
    },
  },
};
</script>

<style lang="scss"></style>
