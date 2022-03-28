<template>
  <section class="work-space-modal">
    <div class="close" @click="closeModal">
      <font-awesome-icon class="arrow-left" icon="angle-left" />
    </div>
    <div class="title-container-modal">
      <div class="title">
        <p>Workspace</p>
        <font-awesome-icon class="dots-icon-modal" icon="ellipsis" />
      </div>

      <div class="main-btn-modal">
        <div>
          <div>
            <div class="workspace-logo">M</div>
          </div>
          <div><h1>Main workspace</h1></div>
        </div>
        <div>
          <font-awesome-icon class="arrow-down" icon="angle-down" />
        </div>
      </div>
    </div>

    <div class="items-title">
      <div>
        <span><plus-icon></plus-icon></span> Add
      </div>
      <div>
        <span><filter-icon /></span> Filters
      </div>
      <div>
        <span><search-icon /></span> Search
      </div>
    </div>

    <div class="spacer"></div>

    <div class="board-container-modal">
      <div class="board-item">
        <span><board-icon /></span> sprint 4
      </div>
    </div>
  </section>
</template>

<script>
import plusIcon from '../icons/plus-icon.vue';
import filterIcon from '../icons/filter-icon-modal.vue';
import searchIcon from '../icons/search-icon-modal.vue';
import boardIcon from '../icons/board-icon.vue';
export default {
  data() {
    return {};
  },
  computed: {
    closeModal() {
      this.$emit('closeModal');
    },
  },
  methods: {},
  components: { plusIcon, filterIcon, searchIcon, boardIcon },
};
</script>
