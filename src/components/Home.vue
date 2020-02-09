<template>
  <div>
    <el-button type="info" @click="logOut">退出</el-button>
  </div>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {}
    },
    methods: {
      logOut() {
        this.$store.commit('logOutUser');
        this.$router.replace('/login')
      }
    }
  }
</script>

<style scoped>

</style>