<template>
  <div v-if="!isLoadingProInfo && proInfo">
    <p class="project-name">Hello {{ proInfo.projectName }}</p>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';

  export default {
    data() {
      return {};
    },

    computed: {
      ...mapState('common', ['isApp']),
      ...mapState('app/baseInfo', ['proInfo', 'isLoadingProInfo']),
    },

    mounted() {
      this.getProInfo();
    },

    methods: {
      ...mapMutations('common', ['setIsApp']),

      async getProInfo() {
        await this.$store.dispatch('app/baseInfo/getProInfo');
      },
    },
  };
</script>

<style lang="scss" scoped>
  .project-name {
    margin-top: 40px;
    text-align: center;
    font-size: 40px;
    font-weight: bold;
    text-shadow: 2px 2px #eee3e3, 4px 4px #888;
  }
</style>
