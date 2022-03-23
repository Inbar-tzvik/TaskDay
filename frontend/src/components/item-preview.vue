<template>
  <!-- <li class="item-preview"> -->
  <!-- <pre>{{ toy }}</pre> -->
  <section class="item-preview">
    <h3>{{ task.title }}</h3>
    <p>{{ task.status }}</p>
    <button>Update</button>
    <button @click="remove(task.id)">X</button>
  </section>
  <!-- <button @click="remove(item._id)">X</button> -->
  <!-- <router-link :to="'/toy/details/' + toy._id">Details</router-link> |
      <router-link :to="'/toy/edit/' + toy._id">Edit</router-link> |
      <router-link :toy="toy._id" :to="'/review'">reviews</router-link> -->
  <!-- </li> -->
</template>

<script>
// import customCard from './custom-card.vue';

export default {
  name: 'item-preview',
  props: {
    task: Object,
  },
  components: {
    // customCard,
  },
  computed: {
    formatTime() {
      return new Date(this.toy.createdAt).toDateString();
    },
  },
  methods: {
    // goToDetail() {
    //   this.$router.push(`/car/${this.car.id}`);
    // },
    // goToEdit() {
    //   this.$router.push(`/car/edit/${this.car.id}`);
    // },
    remove(itemId) {
      this.$emit('removeItem', itemId);
    },
  },
};
</script>
