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
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
<!--        侧边栏菜单区域-->
        <el-menu background-color="#333744"
        text-color="#fff"
        active-text-color="#409eff"
        :collapse="isCollapse"
        :collapse-transition="false"
        :router="true"
        default-active="/home/appointment">
<!--          一级菜单-->
          <el-menu-item index="/home/appointment">
            <i class="el-icon-s-management"></i>
            <span slot="title">预约管理</span>
          </el-menu-item>
          <el-menu-item index="/home/queue">
            <i class="el-icon-s-claim"></i>
            <span slot="title">排号管理</span>
          </el-menu-item>
          <el-menu-item index="/home/treatment">
            <i class="el-icon-s-help"></i>
            <span slot="title">就诊安排</span>
          </el-menu-item>
          <el-menu-item index="/home/case">
            <i class="el-icon-menu"></i>
            <span slot="title">病例管理</span>
          </el-menu-item>
          <el-menu-item index="/home/staff">
            <i class="el-icon-s-check"></i>
            <span slot="title">职工管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
<!--      右侧内容主体-->
      <el-main>
<!--        路由占位符-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {
        //是否折叠
        isCollapse: false
      }
    },
    methods: {
      logOut() {
        this.$store.commit('logOutUser');
        this.$router.replace('/login')
      },

      //点击按钮切换菜单的折叠
      toggleCollapse() {
        this.isCollapse = !this.isCollapse
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

  .el-aside .el-menu {
    border-right: none;
  }

  .el-main {
    background-color: #EAEDF1;
  }

  .logo-img {
    width: 50px;
    height: 50px;
  }

  .toggle-button{
    background-color: #4a5060;
    font-size: 15px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
</style>