<template>
  <div class="timeline-picker">
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
      startDate: this.task.dates.startDate?this.task.dates.startDate:'',
      endDate: this.task.dates.endDate?this.task.dates.endDate:'',
      // value2: '',
    };
  },
  created() {
    if (!this.startDate || !this.endDate) this.value1 = null;
    else this.value1 = [this.startDate, this.endDate];
    console.log('value1', this.value1);
  },
  components: {},
  methods: {
    changeTimeline() {
      const newDates = [];
      if (this.value1) {
        newDates[0] = this.value1[0].getTime();
        newDates[1] = this.value1[1].getTime();
      }
      this.$emit('changeTimeline', {
        dates: [newDates[0], newDates[1]],
        // dates: [Date.parse(newDates[0]), Date.parse(newDates[1])],
        itemId: this.item.id,
        groupId: this.groupId,
      });
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
      console.log(this.group.style.color);
      // return { "background-color": this.groupColor };
      if (!this.value1) return { backgroundColor: '#c4c4c4' };
      const diff = this.value1[1] - this.value1[0];
      const today = Date.now();
      if (!this.value1[1] || today > this.value1[1]) return { backgroundColor: this.group.style.color };
      else if (!this.value1[0] || today < this.value1[0]) return { backgroundColor: 'rgb(31, 31, 31)' };
      const startPrecent = diff / (today - this.value1[0]);
      const degPrecent = 100 - Math.floor(100 / startPrecent);
      return {
        backgroundColor: `linear-gradient(to left, rgb(31, 31, 31) 0% ${degPrecent}%, ${this.group.style.color} ${degPrecent}% 100%)`,
      };
    },
  },
};
</script>

<style lang="scss">
.block {
  display: flex;
}
.timeline-picker {
  width: 200px;
  // display: flex;
  justify-content: center;
  align-items: center;
  height: 33px;
  border: none;
  &:hover {
    cursor: pointer;
    .date-to-show {
      display: none;
    }
    .days-count-to-show {
      display: initial;
    }
  }
}
.timeline {
  display: flex;
  position: absolute;
  width: 200px;
  background-color: transparent;
  border: none;
  &:hover {
    background-color: none;
  }

  .el-range-input,
  .el-range-separator {
    opacity: 0;
  }

  .el-range__close-icon {
    margin-top: 4px;
  }
}
.el-date-editor .el-range__icon {
  opacity: 0;
}
.el-range-editor--small.el-input__inner {
  height: 33px;
  background-color: transparent;
  &:hover {
    color: none;
  }
}

.data-in-row:hover .el-date-editor {
  background-color: transparent;
}
.time-to-show {
  width: 90%;
  padding: 2px 0;
  margin: auto;
  margin-top: 6px;
  border-radius: 20px;
  line-height: 1.4;
  color: white;
  display: flex;
  justify-content: center;
  .days-count-to-show {
    display: none;
  }
}

.date-picker {
  display: flex;
  align-items: center;
  justify-content: center;
  .date {
    opacity: 1;
    width: 200px;
    height: 20px;
    input {
      padding-top: 3px;
      margin: 0px;
      background-color: transparent;
      border: none;
      text-align: center;
      transition: none;
      -webkit-transition: none;
      &:hover {
        border: 1px dashed #c4c4c4;
      }
    }
    .el-icon-date {
      display: none;
    }
    // position: absolute;
    // top:0;
    // left: 0;
    // z-index: 100;

    // display: grid;
    // justify-items: center;
    // align-items: stretch;
  }
  .time-to-show {
    position: absolute;
    padding-bottom: 8px;
    z-index: 100;
  }
}

// el-date-picker {
//   width: 200px;
// }
.el-date-editor {
  background-color: none !important;
}
// .el-date-editor :nth-child(4) {
//   border-radius: 0 11px 11px 0;
// }
// .el-range-editor.el-input__inner {
//   width: 13.57rem;
//   height: 1.64rem;
//   font-size: 13px;
//   box-shadow: 0 0 0 0;
//   // border-radius: 0;
//   background-color: #f5f6f8;

//   input {
//     background-color: #c4c4c4;

//     // border-radius: 11px;
//   }
//   .el-range-separator {
//     background-color: #c4c4c4;
//     margin-top: 4px;
//     // border-radius: 11px;
//   }
// }

// .el-range-editor:focus {
//   outline: none;
// }
// .el-date-editor .el-range-input {
//   font-size: 13px;
//   margin-top: 4px;
// }
// // #c4c4c4
// // }  display: flex;
// //   padding: 0;
// //   flex-wrap: wrap;
// // }
// .demo-date-picker .block {
//   /* padding: 30px 0; */
//   text-align: center;
//   border-right: solid 1px var(--el-border-color);
//   flex: 1;
// }
// .demo-date-picker .block:last-child {
//   border-right: none;
// }
// .demo-date-picker {
//   margin: 0 auto;
//   height: 2.42rem;
//   background-color: #f5f6f8;

//   display: block;
//   color: var(--el-text-color-secondary);
//   font-size: 14px;
//   // margin-bottom: 20px;
// }
// .el-date-editor .el-range__icon {
//   display: none;
//   /* background-color: red; */
// }
</style>
