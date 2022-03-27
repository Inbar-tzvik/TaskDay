<template>
  <section class="dropDownMenuWrapper">
    <button
      
      class="dropDownMenuButton"
      ref="menu"
      @click="openClose"
    >
      <!-- {{ `${imgUrl}` }} -->
      <div v-for="shortMember in shortMembers"
      :key="shortMember" class="avatars">
        <div v-if="shortMember.imgUrl">
        <el-avatar fit="cover" alt="" class="avatar-img" :src="shortMember.imgUrl" />
      </div>
      <div>
            <el-avatar class="avatar-name" icon="string">check</el-avatar>
      </div>
        <!-- <div>
          <el-avatar>{{ val }}</el-avatar>
        </div> -->
      </div>
    </button>

    <!-- <div class="iconWrapper">
      <div class="bar1" :class="{ 'bar1--open': isOpen }" />
      <div class="bar2" :class="{ 'bar2--open': isOpen }" />
      <div class="bar3" :class="{ 'bar3--open': isOpen }" />
    </div>-->

    <section class="dropdownMenu" v-if="isOpen">
      <div class="menuArrow" />
      <section v-for="opt in opts" :key="opt" class="option">
        <p>{{ opt }}</p>
      </section>
    </section>
  </section>
</template>

<script>
// import avatar from "./avatar-cmp.vue";
import { UserFilled } from '@element-plus/icons-vue';


export default {
  props: {
    task: Object,
  }, // Menu title from the parent
  data() {
    return {
      boards: [],
      opts: this.$store.getters.boards[0].members.map(member => member.fullname),
      // membersFullname: this.task.members.map(member => member.fullname),
      shortMembersName: null, 
      membersImg:this.task.members.map(member => member.imgUrl),
      isOpen: false, // Variable if the menu is open or closed
    };
  },
  created() {
   this.shortMembers = this.task.members.map(member => {
        return {
          shortName:this.makeShortName(member.fullname),
          imgUrl:member.imgUrl
        }
        })
  },
  
  methods: {
    makeShortName(fullname){
      var shortName = fullname.split(' ')
      shortName = shortName.map(fullname=>fullname[0])
      // console.log('ssss',shortName);
return shortName
    }, 

    openClose() {
      // Toggle between open or closed ( true || false )
      this.isOpen = !this.isOpen;
    },
  },
  components: {
    // avatar
  },
};
</script>

<style lang="scss" scoped>
.avatars{

  display: flex;
}
.avatar-img {
  width: 27px;
  height:24px;
}
.demo-type > div {
  flex: 1;
  text-align: center;
}

.demo-type > div:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}

.avatar-name{
  border-right: 1px solid var(--el-border-color);
}
</style>
