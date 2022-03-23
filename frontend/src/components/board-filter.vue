<template>
    <section class="board-filter">
      <button class="blue-btn">New Item</button>
      <div class="blue-btn">></div>
      <input type="text" placeholder="Search"  v-model="filterBy.txt"  @input="setFilter">
      <select v-for="(user, idx) in users" :key="idx" v-model="filterBy.user" >
        <option value="">{{ user }}</option>
      </select>
      <button>filter</button>
      <button>Sort</button>

     <pre>{{ getUsers }}</pre>
    
    </section>
</template>

<script>


export default {
  name: 'board-filter',
  props: {

  },
  data() {
    return {
      filterBy: {
        txt: '',
        user: ''
      },
      users: null
    }
  },
  components: {
   
  },
  computed: {
      boards() {
      return this.$store.getters.boards[0];
    },
    getUsers(){
      this.users = this.$store.getters.getUsers
    }
  },
  methods: {
    setFilter() {
      console.log(this.filterBy);
      this.$emit('setFilter', JSON.parse(JSON.stringify(this.filterBy)))
    },
  },
};
</script>
