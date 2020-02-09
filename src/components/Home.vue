<template>
  <el-container class="home-container">
<!--    头部区域-->
    <el-header>Header<el-button type="info" @click="logOut">退出</el-button></el-header>
<!--    页面主体区-->
    <el-container>
<!--      侧边栏-->
      <el-aside width="200px">Aside</el-aside>
<!--      右侧内容主体-->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
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

  /*让home-container充满全屏*/
  .home-container {
    height: 100%;
  }
  .el-header {
    background-color: #373D41;
  }

  .el-aside {
    background-color: #333744;
  }

  .el-main {
    background-color: #EAEDF1;
  }
</style>