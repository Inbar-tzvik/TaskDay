<template>
  <section class="dropDownMenuWrapper">
    <button class="dropDownMenuButton" ref="menu" @click="openClose">{{ task.status }}</button>

    <!-- <div class="iconWrapper">
      <div class="bar1" :class="{ 'bar1--open': isOpen }" />
      <div class="bar2" :class="{ 'bar2--open': isOpen }" />
      <div class="bar3" :class="{ 'bar3--open': isOpen }" />
    </div> -->

    <section class="dropdownMenu" v-if="isOpen">
      <div class="menuArrow" />
      <section v-for="opt in opts" :key="opt" class="option">
        <p>{{ opt }}</p>
      </section>
    </section>
  </section>
</template>

<script>
export default {
  props: {
    task: Object,
  }, // Menu title from the parent
  data() {
    return {
      opts: ['Stuck', 'Working on it', 'Done', ''],
      val: '',
      isOpen: false, // Variable if the menu is open or closed
    };
  },
  methods: {
    openClose() {
      // Toggle between open or closed ( true || false )
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style lang="scss" scoped></style>
