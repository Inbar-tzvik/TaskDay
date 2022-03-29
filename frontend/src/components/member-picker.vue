<template>
  <section class="dropDownMenuWrapper">
    <button class="dropDownMenuButton" ref="menu" @click="openClose">
      <!-- {{ `${imgUrl}` }} -->
      <div v-if="task.members.length > 0">
        <div v-for="shortMember in shortMembers" :key="shortMember" class="avatars">
          <div v-if="shortMember.imgUrl">
            <el-avatar fit="cover" class="avatar-img" :src="shortMember.imgUrl" />
          </div>
          <div v-else>
            <el-avatar class="avatar-name">{{ shortMember.shortName }}</el-avatar>
          </div>
        </div>
      </div>

      <div v-else>
        <el-avatar class="avatar-img" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
      </div>
    </button>

    <!-- <div class="iconWrapper">
      <div class="bar1" :class="{ 'bar1--open': isOpen }" />
      <div class="bar2" :class="{ 'bar2--open': isOpen }" />
      <div class="bar3" :class="{ 'bar3--open': isOpen }" />
    </div>-->

    <section class="dropdownMenu" v-if="isOpen">
      <div class="menuArrow" />
      <section v-for="shortMember in shortMembers" :key="shortMember" class="avatars option">
        <div v-if="shortMember.imgUrl">
          <el-avatar fit="cover" alt class="avatar-img" :src="shortMember.imgUrl" />
        </div>
        <div v-else>
          <el-avatar class="avatar-name option">{{ shortMember.shortName }}</el-avatar>
        </div>
        >
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
      opts: null,
      // membersFullname: this.task.members.map(member => member.fullname),
      shortMembersName: null,
      membersImg: this.task.members?.map((member) => member.imgUrl),
      isOpen: false, // Variable if the menu is open or closed
      shortMembers: [],
      currTask: JSON.parse(JSON.stringify(this.task)),
      currMembers: JSON.parse(JSON.stringify(this.task.members)),
    };
  },
  created() {
    this.boards = this.$store.getters.boards;
    console.log(' task memmbers', this.task.members.length);
    this.shortMembers = this.task.members?.map((member) => {
      return {
        shortName: this.makeShortName(member.fullname),
        imgUrl: member.imgUrl,
      };
    });
    console.log('members-pickerrr', this.shortMembers);
  },

  methods: {
    makeShortName(fullname) {
      var shortName = fullname.split(' ');
      shortName = shortName.map((fullname) => fullname[0]);
      shortName = shortName.join('');
      return shortName;
    },

    openClose() {
      // Toggle between open or closed ( true || false )
      this.isOpen = !this.isOpen;
    },
  },
  computed: {
    checkLength() {
      console.log('length of array', this.shortMembers);
      if (this.shortMembers.length > 0) return true;
      else return false;
    },
  },
  components: {
    // avatar
  },
};
</script>

<style scoped>
.avatars {
  display: flex;
}
.avatar-img {
  width: 27px;
  height: 24px;
}
.avatar-name {
  width: 27px;
  height: 24px;
  flex: 1;
  text-align: center;
}
</style>
