<template>
  <el-container class="home-container">
<!--    头部区域-->
    <el-header>
      <div>
        <img class="logo-img" src="../assets/logo.png" alt="">
        <span class="system_title">医生后台管理系统</span>
      </div>
      <el-button type="info" @click="logOut">退出</el-button>
      </el-header>
<!--    页面主体区-->
    <el-container>
<!--      侧边栏-->
      <el-aside width="200px">
<!--        侧边栏菜单区域-->
        <el-menu background-color="#333744"
                text-color="#fff"
                active-text-color="#ffd04b">
<!--          一级菜单-->
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">导航一</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-menu"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-menu"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-menu"></i>
            <span slot="title">导航五</span>
          </el-menu-item>
          <el-menu-item index="6">
            <i class="el-icon-menu"></i>
            <span slot="title">导航六</span>
          </el-menu-item>

        </el-menu>
      </el-aside>
<!--      右侧内容主体-->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {
        menuList: []
      }
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
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
  }
  .el-header div {
    display: flex;
    align-items: center;
  }
  .el-header div span {
    margin-left: 15px;
  }

  .el-aside {
    background-color: #333744;
  }

  .el-main {
    background-color: #EAEDF1;
  }
  .logo-img {
    width: 50px;
    height: 50px;
  }
</style>