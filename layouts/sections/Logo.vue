<template>
  <div class="logo">
    <NLink to="/">
      <!-- <v-img  alt="Image"
        :src="require('@/assets/images/logos/white-text.png')"
        alt="logo"
      /> -->
      <h1>Lirtna</h1>
    </NLink>
  </div>
</template>

<script>
export default {
  name: "Logo",

  data() {
    return {};
  },
};
</script>

<style lang="scss">
.logo a {
  display: flex;
}
</style>
