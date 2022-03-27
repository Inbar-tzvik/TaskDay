<template>
  <section class="details-modal">
    <div class="title-container">
      <div class="close-details-btn">X</div>

      <div class="details-input flex">
        <h1>sdfsd sdfd adfdf</h1>
        <div class="add-view-container flex">
          <span>IT</span>
          <p class="subset-tab-details"></p>
          <div>
            <img
              class="dots"
              src="../../../styles/icon/three-dots.svg"
              alt=""
            />
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
          <div class="post-component">
            <div class="post-header">
              <div class="left-side-post">
                <div>
                  <img
                    class="user-img"
                    src="../../../styles/icon/def-user.png"
                    alt=""
                  />
                </div>
                <div class="title">Itzik Vaknin</div>
              </div>
              <div class="post-title">
                <div>
                  <img
                    class="clock-post-img"
                    src="../../../styles/icon/clock.png"
                    alt=""
                  />
                </div>
                <div>1d</div>
                <div>
                  <img
                    class="alarm-post-img"
                    src="../../../styles/icon/alarm-details.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div class="body-text"></div>
            <div class="post-actions"></div>
          </div>
        </div>
      </div>
      <div class="files-details-page detail-page"></div>
      <div class="activity-details-page detail-page"></div>
    </div>
  </section>
</template>

<script>
import avatarIng from '../../components/avatar-img.vue';

export default {
  name: '',
  props: {},
  data() {
    return {};
  },
  components: { avatarIng },
  computed: {},
  methods: {},
};
</script>
