<template>
  <section class="dropDownMenuWrapper">
    <button class="dropDownMenuButton member-picker" ref="menu" @click="openClose">
      <div class="plus-btn">+</div>

      <!-- {{ `${imgUrl}` }} -->
      <div class="avatars" v-if="assignedMembers.length > 0">
        <div v-for="member in assignedMembers" :key="member">
          <div v-if="member.imgUrl">
            <el-avatar fit="cover" class="avatar-img" :src="member.imgUrl" />
          </div>
          <!-- <div v-else>
            <el-avatar class="avatar-img" src="https://cdn.monday.com/icons/dapulse-person-column.svg" />
          </div> -->
        </div>
      </div>

      <div v-else>
        <el-avatar class="avatar-img" src="https://cdn.monday.com/icons/dapulse-person-column.svg" />
      </div>
    </button>

    <!-- <div class="iconWrapper">
      <div class="bar1" :class="{ 'bar1--open': isOpen }" />
      <div class="bar2" :class="{ 'bar2--open': isOpen }" />
      <div class="bar3" :class="{ 'bar3--open': isOpen }" />
    </div>-->

    <section class="dropdownMenu" v-if="isOpen">
      <div class="assigned-persons" v-if="task.members.length > 0">
        <div class="avatar" v-for="member in assignedMembers" :key="member">
          <el-avatar fit="cover" class="avatar-img" :src="member.imgUrl" />
          <div>{{ member.fullname }}</div>
          <div class="remove-person-btn" @click="removePerson(member)">
            <font-awesome-icon icon="xmark" />
          </div>
        </div>
      </div>
      <div class="title">
        <span class="title-txt">People</span>
      </div>
      <div class="persons-to-pick" v-if="notAssignedMembers.length">
        <div class="person-to-pick" v-for="(person, idx) in notAssignedMembers" :key="idx" @click="addPerson(person)">
          <div class="person-img">
            <el-avatar fit="cover" class="avatar-img" :src="person.imgUrl" />
            <div>{{ person.fullname }}</div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
// import avatar from "./avatar-cmp.vue";
import { UserFilled } from '@element-plus/icons-vue';

export default {
  props: {
    task: Object,
    board: Object,
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
      assignedMembers: [],
      notAssignedMembers: [],
      members: this.board.members,
    };
  },
  created() {
    this.boards = this.$store.getters.boards;
    this.shortMembers = this.task.members?.map((member) => {
      return {
        shortName: this.makeShortName(member.fullname),
        imgUrl: member.imgUrl,
      };
    });
    this.assignedMembers = [...this.task.members];
    this.notAssignedMembers = this.members?.filter((member) => {
      return !this.assignedMembers.find((assMem) => assMem._id === member._id);
    });
  },

  methods: {
    removePerson(person) {
      // console.log(person);
      this.notAssignedMembers.push(person);

      const idx = this.assignedMembers.findIndex((member) => member._id === person._id);
      this.assignedMembers.splice(idx, 1);
      this.$emit('removeAssignedMember', {
        personId: person._id,
        task: this.task,
      });
    },
    addPerson(person) {
      console.log('adding');
      this.assignedMembers.push(person);
      const idx = this.notAssignedMembers.findIndex((member) => member._id === person._id);
      this.notAssignedMembers.splice(idx, 1);
      this.$emit('addAssignedMember', {
        person: person,
        // groupId: this.groupId,
        task: this.task,
      });
    },
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
    // membersChange() {
    //   return this.board.members;
    // },
    checkLength() {
      if (this.shortMembers.length > 0) return true;
      else return false;
    },
  },
  components: {
    // avatar
  },
};
</script>

<style lang="scss" scoped>
.persons-to-pick {
  // display: flex;
  // flex-direction: column;
  text-align: left;
}
.person-img {
  display: flex;
  gap: 8px;
  // align-items: ;
  padding: 4px 8px;
}
.dropDownMenuWrapper {
  .dropdownMenu {
    width: 200px;
    font-size: 13px;
    color: #323338;
    font-family: roboto-thin;
  }
}
.assigned-persons {
  display: flex;
  flex-direction: column;
  // flex-wrap: wrap;
  .avatar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #e5f4ff;
    border-radius: 10px;
    padding-inline-end: 10px;
    margin-bottom: 2px;
    margin-inline-end: 2px;
    img {
      border-radius: 50%;
    }

    // .person-name {
    //   font-size: rem(12px);
    //   padding: 0 5px;
    // }
    .remove-person-btn {
      font-size: rem(12px);
      padding: 0 2px;
      margin: 2px;
      border-radius: 10px;
      &:hover {
        background-color: #fff;
        cursor: pointer;
      }
    }
  }
}
// .remove-person-btn {
//   font-size: rem(12px);
//   padding: 0 2px;
//   margin: 2px;
//   border-radius: 10px;
//   &:hover {
//     background-color: #fff;
//     cursor: pointer;
//   }
// }
.avatars-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid black;
}
.avatars {
  display: flex;
  .avatar-img {
    display: flex;
  }
}
.avatar-img {
  background-color: transparent;
  width: 26px;
  height: 26px;
  margin: 0 -4px;
}
.avatar-name {
  width: 30px;
  height: 30px;
  flex: 1;
  text-align: center;
  margin: 0 -4px;
}
.title {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 0;
}
.title-txt {
  z-index: 100;
  background-color: white;
  padding: 0 10px;
}
.title::before {
  content: '';
  height: 1px;
  position: absolute;
  background-color: #b3b3b3;
  left: 10px;
  right: 10px;
  top: 9px;
}
</style>
