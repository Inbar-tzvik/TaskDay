<template>
  <section>
    <div class="board-toolbar">
      <!-- <button class="loolbar-btn">Main-table</button> -->
      <div class="toolbar-btns flex">
        <div class="blue-bottom">
          <button>Main-table</button>
        </div>

        <div>
          <button>
            <img class="chart-icon" src="../../styles/icon/chart.png" alt="" />
            Chart
          </button>
        </div>

        <div>
          <button>Main-table</button>
        </div>

        <div>
          <button>Gantt</button>
        </div>

        <div>
          <button>Kanban</button>
        </div>
        <p class="subsets-tab"></p>
        <div>
          <button>+ Add View</button>
        </div>
      </div>

      <div class="integrations-btn-content toolbar-btns flex">
        <div>
          <button>
            <span>x-</span>
            Integrate
            <img
              class="integrate-icon"
              src="../../styles/icon/integrate.png"
              alt=""
            />
            <img
              class="integrate-icon"
              src="../../styles/icon/slack.png"
              alt=""
            />
            <img
              class="integrate-icon"
              src="../../styles/icon/gmail.png"
              alt=""
            />
          </button>
        </div>
        <div>
          <button>
            <span>x-</span>
            Automate
          </button>
        </div>
        <span class="collapse-btn">d</span>
      </div>
    </div>
    <!-- <div class="collapse-btn">d</div> -->
  </section>
</template>
<script>
import integrateBtn from './icons/integrate-btn.vue';

export default {
  name: 'board-toolbar',
  props: {},
  data() {
    return {};
  },
  components: {},
  computed: {},
  methods: {},
};
</script>
