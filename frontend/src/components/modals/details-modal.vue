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
          <span>
            <!-- <img
              class="user-img-title"
              src="../../../styles/icon/def-user.png"
              alt=""
            /> -->

            <avatar-img></avatar-img>
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
        <div>
          <input type="text" placeholder="Write an update" />
        </div>
        <div class="send-update">
          <div>
            <p>Write updates via email:</p>
          </div>
        </div>
        <div class="space-view">
          <div
            class="post-component"
            v-for="comment in getComments"
            :key="comment.id"
          >
            <div class="post-header">
              <div class="left-side-post">
                <div class="img-user-container">
                  <!-- <member-picker :task="task"></member-picker> -->
                  <img class="user-img" :src="comment.byMember.imgUrl" alt="" />
                </div>
                <div class="title">
                  {{ comment.byMember.fullname }}
                </div>

                <div>
                  <p class="green logged-in"></p>
                </div>
              </div>
              <div class="post-title">
                <div>
                  <img
                    class="clock-post-img"
                    src="../../../styles/icon/clock.png"
                    alt=""
                  />
                </div>
                <div class="time">1d</div>
                <div>
                  <img
                    class="alarm-post-img"
                    src="../../../styles/icon/alarm-details.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div class="body-text">
              <p class="text">{{ comment.txt }}</p>
              <div class="seen-area">
                <span
                  ><img
                    class="view-icon"
                    src="../../../styles/icon/view.png"
                    alt=""
                /></span>
                <span class="seen">1</span>
                <p>seen</p>
              </div>
            </div>
            <div class="post-actions">
              <div
                class="left-btn"
                :class="{ blue: comment.isLike, red: !comment.isLike }"
                @click="setLike(comment.id)"
              >
                <span>
                  <font-awesome-icon icon="thumbs-up" />
                </span>
                <p>like</p>
              </div>
              <div class="right-btn">
                <span>
                  <img
                    class="reply-icon"
                    src="../../../styles/icon/reply.png"
                    alt=""
                /></span>
                <p>Reply</p>
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
import memberPicker from '../../components/member-picker.vue';

export default {
  name: '',
  props: {},
  data() {
    return {
      currDate: null,
      task: {
        id: 'c104',
        title: 'כשיוצרים טאסק\גרופ ריק, יש צורך בASYNC?',
        status: 'in-progress',
        description: 'description',
        comments: [
          {
            id: 'ZdPnm',
            txt: 'also @yaronb please CR this',
            createdAt: 1590999817436.0,
            byMember: {
              _id: 'u101',
              fullname: 'Itzik Vaknin',
              imgUrl: '../../../styles/shlomi.jpg',
            },
            isLike: true,
          },
          {
            id: 'ZdPnm',
            txt: 'commentssss',
            createdAt: 1590999817436.0,
            byMember: {
              _id: 'u101',
              fullname: 'Itzik Vaknin',
              imgUrl: '../../../styles/shlomi.jpg',
            },
            isLike: false,
          },
        ],
        checklists: [
          {
            id: 'YEhmF',
            title: 'Checklist',
            todos: [
              {
                id: '212jX',
                title: 'To Do 1',
                isDone: false,
              },
            ],
          },
        ],
        members: [
          {
            _id: 'u101',
            username: 'Tal',
            fullname: 'Itzik Vaknin',
            imgUrl:
              'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
          },
        ],
        labelIds: ['l101', 'l102'],
        createdAt: 1590999730348,
        dueDate: 16156215211,
        byMember: {
          _id: 'u101',
          username: 'Tal',
          fullname: 'Tal Tarablus',
          imgUrl:
            'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
        },
        style: {
          bgColor: '#26de81',
        },
      },
    };
  },
  components: { avatarImg, likeIcon, memberPicker },
  created() {},

  computed: {
    getComments() {
      return this.task.comments;
    },
    getMembers() {
      return this.task.members;
    },
    getTask() {},
  },
  methods: {
    closeDetails() {
      this.$emit('closeDetails');
    },
    setLike(commentId) {
      // console.log(JSON.parse(JSON.stringify(this.task.comments)));
      // console.log(json.parse(json.stringft(this.task.comments)));
      // var idx = this.task.comments[1].findIndex(
      //   (comment) => comment.id === commentId
      // );
      // console.log(idx);
    },
  },
};
</script>

<style></style>
