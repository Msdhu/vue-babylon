<template>
  <div class="wrap">
    <img src="../assets/logo.png" class="logo">
    <BaseInfo />
  </div>
</template>

<script>
  import BaseInfo from './baseInfo/BaseInfo.vue';
  export default {
    components: {
      BaseInfo,
    },
  };
</script>

<style lang="scss" scoped>
  .wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 60%;
    .logo {
      width: 160px;
      height: auto;
      vertical-align: bottom;
    }
  }
</style>
