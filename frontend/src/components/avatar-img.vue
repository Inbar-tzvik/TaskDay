<template>
  <section class="avatar">
    <div class="avater-container relative">
      <img
        v-for="(img, idx) in this.imgs"
        :key="idx"
        class="avater-img"
        :src="img"
        alt=""
        :style="{ marginLeft: idx * this.margin + 'px' }"
      />
    </div>
  </section>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      imgs: [
        '../../styles/shlomi.jpg',
        '../../styles/shlomi.jpg',
        '../../styles/shlomi.jpg',
      ],
      // imgs: [],
      margin: -5,
    };
  },
  props: {
    urls: Array,
  },
  created() {
    // console.log(this.imgs);
  },
  components: {},
  computed: {
    getId() {
      return new Date().getTime() % 1000;
    },
  },
  methods: {},
};
</script>
<style>
.avater-img {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  /* margin-left: 20px; */
  border: 1px solid white;
}
.avater-container {
  display: flex;
  margin-left: 5px;
}

.relative {
  position: relative;
}
</style>
