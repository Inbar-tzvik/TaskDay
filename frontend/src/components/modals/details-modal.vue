<template>
  <section class="details-modal" ref="detailModal">
    <div class="title-container">
      <div class="close-details-btn" @click="closeDetails">
        <font-awesome-icon class="close-icon" icon="x" />
      </div>

      <div class="details-input flex">
        <h1>{{ task.title }}</h1>
        <!-- <input type="text" /> -->
        <div class="add-view-container flex">
          <span v-for="member in task.members" :key="member._id">
            <el-avatar :src="member.imgUrl" />
            <!-- <avatar-img></avatar-img> -->
          </span>
          <p class="subset-tab-details"></p>
          <div>
            <font-awesome-icon class="dots" icon="ellipsis" />
          </div>
        </div>
      </div>
      <div class="item-tabs">
        <div class="left-tabs">
          <button class="tab-btn tab-btn-clicked">
            <div class="updates">Updates</div>
          </button>
          <button class="tab-btn">
            <div class="files">Files</div>
          </button>
          <button class="tab-btn">
            <div class="activity-log">Activity Log</div>
          </button>
        </div>
        <div class="right-tabs">
          <p class="subsets-tab"></p>
          <div class="add-view">+ Add View</div>
        </div>
      </div>
    </div>

    <div class="details-container">
      <div class="update-details-page detail-page">
        <!-- //LOOK -->
        <div class="input-update">
          <input v-model="currUpdate" type="text" placeholder="Write an update" />
          <div>
            <button @click="sendUpdate()">update</button>
          </div>
        </div>
        <div class="send-update">
          <div>
            <!-- ASK - think to remove this "mail" -->
            <p>Write updates via email:</p>
          </div>
        </div>
        <!-- //LOOK -->
        <div class="space-view">
          <div class="post-component" v-for="update in task.updates" :key="update.id">
            <div class="post-header">
              <div class="left-side-post">
                <div class="img-user-container">
                  <!-- <member-picker :task="task"></member-picker> -->

                  <!-- fix this: -->
                  <img class="user-img" :src="update.byMember.imgUrl" alt />
                </div>
                <div class="title">{{ update.byMember.fullname }}</div>

                <div>
                  <p class="green logged-in"></p>
                </div>
              </div>
              <div class="post-title">
                <div>
                  <img class="clock-post-img" src="../../../styles/icon/clock.png" alt />
                </div>
                <div class="time">1d</div>
                <div>
                  <img class="alarm-post-img" src="../../../styles/icon/alarm-details.png" alt />
                </div>
              </div>
            </div>
            <div class="body-text">
              <p class="text">{{ update.message }}</p>
              <div class="seen-area">
                <span>
                  <img class="view-icon" src="../../../styles/icon/view.png" alt />
                </span>
                <span class="seen">1</span>
                <p>seen</p>
              </div>
            </div>

            <div class="reply-txt-container">
              <div class="reply-txt">
                <!-- <div
                  class="txt-container"
                  v-for="(reply, idx) in update.reply"
                  :key="idx"
                >
                  <div class="img-reply">
                    <img :src="reply.byMember.imgUrl" alt="" />
                  </div>
                  <div>
                    <p>{{ reply.txt }}</p>
                  </div>
                </div>-->
              </div>
            </div>

            <div class="post-actions">
              <div class="left-btn" :class="{ blue: update.like, red: !update.like }" @click="setLike(update.id)">
                <span>
                  <font-awesome-icon icon="thumbs-up" />
                </span>
                <p>like</p>
              </div>

              <!-- //REMOVE - we wont do replay option, only like -->
              <div class="right-btn">
                <!-- <span> -->
                <!-- <img../member-picker.vue class="reply-icon" src="../../../styles/icon/reply.png" alt="" /></span -->
                <!-- > -->
                <p @click="isReply = !isReply">Reply</p>
              </div>
            </div>
            <div class="reply-container" v-if="isReply">
              <div class="left-side-reply">
                <div>
                  <!-- ITZIK - this line should word, fix it! -->
                  <!-- <img class="user-img" :src="updates.byMember.imgUrl" alt="" /> -->
                </div>
              </div>
              <div class="right-side-reply">
                <div class="input-btns-container">
                  <div>
                    <input type="text" />
                  </div>

                  <div class="btns-container-reply">
                    <div>
                      <span>
                        <font-awesome-icon icon="file" />
                        <a href>Add files</a>
                      </span>
                    </div>
                    <div class="reply-btn">
                      <button>Reply</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="files-details-page detail-page"></div>
      <div class="activity-details-page detail-page"></div>
    </div>
  </section>
</template>

<script>
// import { json } from 'stream/consumers';
import avatarImg from '../../components/avatar-img.vue';
import likeIcon from '../../components/icons/like-icon.vue';
import Person from '../../components/Person.vue';
import { utilService } from '../../services/util-service';

export default {
  name: '',
  props: {},
  data() {
    return {
      //ITZIK
      tasksss: {
        id: 'c201',
        title: 'Participate in the entire application lifecycle, focusing on coding and debugging.',
        status: 'Working on it',
        priority: 'Medium',
        members: [
          {
            _id: 'u103',
            fullname: 'Shlomi Nugarker',
            imgUrl: 'https://cdn.pixabay.com/photo/2020/02/17/20/22/beard-4857726_960_720.jpg',
          },
          {
            _id: 'u103',
            fullname: 'Shlomi Nugarker',
            imgUrl: 'https://cdn.pixabay.com/photo/2020/02/17/20/22/beard-4857726_960_720.jpg',
          },
        ],
        dates: {
          startDate: '',
          endDate: '',
        },
        updates: [
          {
            id: 'up100',
            byMember: {
              _id: 'u103',
              fullname: 'Shlomi Nugarker',
              imgUrl: 'https://cdn.pixabay.com/photo/2020/02/17/20/22/beard-4857726_960_720.jpg',
            },
            message: 'change this JSON please',
            like: true,
          },
          {
            id: 'up101',
            byMember: {
              _id: 'u103',
              fullname: 'hare krishna',
              imgUrl: 'https://cdn.pixabay.com/photo/2020/02/17/20/22/beard-4857726_960_720.jpg',
            },
            message: 'Jost for test',
            like: false,
          },
        ],
      },
      currUpdate: null,
      //ITZIK

      isReply: false,
      currDate: null,
      // task:null,
    };
  },
  components: { avatarImg, likeIcon, Person },
  created() {
    // this.task = this.$store.getters.getCurrTask
  },

  computed: {
    task() {
      return JSON.parse(JSON.stringify(this.$store.getters.getCurrTask));
    },
    // getTask() { },
  },
  methods: {
    closeDetails() {
      this.$emit('closeDetails');
    },
    sendUpdate() {
      // console.log('this.currUpdate',this.currUpdate);
      this.task.updates.splice(0, 0, this.createEmptyUpdate(this.currUpdate));
      this.currUpdate = null;
      this.editTask();
    },
    setLike(updateId) {
      console.log(updateId);
      // console.log(JSON.parse(JSON.stringify(this.task)));
      var idx = this.task.updates.findIndex((update) => update.id === updateId);
      // console.log(idx);
      this.task.updates[idx].like = !this.task.updates[idx].like;
      this.editTask();
    },
    editTask() {
      const groupId = this.$store.getters.getCurrGroupId;
      // console.log('groupId, this.task',groupId, this.task)
      this.$emit('editTask', groupId, this.task);
    },

    //       editTask() {
    // const boardId = this.$store.getters.currBoard._id;

    //       console.log('groupId, boardId',groupId, boardId);
    //       this.$store.dispatch({
    //         type: 'addItem',
    //         boardId,
    //         groupId,
    //         task:this.task,
    //       });
    //       },
    createEmptyUpdate(message = '') {
      return {
        id: 'up' + utilService.makeId(3),
        byMember: {
          _id: 'u101',
          fullname: 'Inbari Tzvik',
          imgUrl:
            'https://us.123rf.com/450wm/kitthanesratanasiraanan/kitthanesratanasiraanan1902/kitthanesratanasiraanan190200001/117906554-beautiful-young-asian-woman-with-clean-fresh-skin-look-girl-beauty-face-care-facial-treatment-cosmet.jpg',
        },
        message,
        like: false,
      };
    },
  },
};
</script>

<style></style>
