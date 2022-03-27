<template>
  <section class="avatar">
  <!-- {{this.currUser}} -->
    <div class="demo-type">
      <!-- <div>
        <el-avatar :icon="UserFilled" />
      </div>
      <div>
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      </div> -->
      <!-- <div v-for="val in vals" :key="val"> -->
        <div>
        <!-- <el-avatar>{{this.val}}</el-avatar> -->
      </div>
    </div>
  </section>
</template>

<script>
import { UserFilled } from '@element-plus/icons-vue';

export default {
  props: ['val'], // Menu title from the parent
  data() {
    return {
      boards: [],
currUser:null
    };
  },
  created() {
    this.currUser = val
    //     user() {
    //   this.boards = this.$store.getters.boards;
    // },
  },
  methods: {

  },
};
</script>


<style scoped>
.demo-type {
  display: flex;
}
.demo-type > div {
  flex: 1;
  text-align: center;
}

.demo-type > div:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}
</style>
