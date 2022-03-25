<template>
  <section class="avatar">
    {{ getLetters }}

    <!-- <div v-for="name in getLetters" :key="getId">
      <div>{{ name }}</div>
    </div> -->
  </section>
</template>

<script>
export default {
  name: '',
  data() {
    return {};
  },
  props: {
    names: Array,
  },
  components: {},
  computed: {
    getLetters() {
      var namesToReturn = [];
      this.names.forEach((fullname) => {
        var arrName = fullname.split(' ');
        var name = arrName.map((cur) => cur[0]);
        var laststep = name.join('');
        namesToReturn.push(laststep);
      });
      return namesToReturn;
    },
    getId() {
      return new Date().getTime() % 1000;
    },
  },
  methods: {},
};
</script>
