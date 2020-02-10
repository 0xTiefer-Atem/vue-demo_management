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
        :default-active="activePath">
<!--          一级菜单-->
          <el-menu-item v-for="menu in menuList" :index="baseUrl + '' + menu.menuPath"
                        @click="saveNavState(baseUrl + '' + menu.menuPath)">
            <i :class="menu.menuIcon"></i>
            <span slot="title">{{menu.menuName}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
<!--      右侧内容主体-->
      <el-main>
<!--        路由占位符-->
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
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
        isCollapse: false,
        baseUrl: '/home',
        menuList: [
          {
            menuName: '预约管理',
            menuPath: '/appointment',
            menuIcon: 'el-icon-s-management'
          },
          {
            menuName: '排号管理',
            menuPath: '/queue',
            menuIcon: 'el-icon-message-solid'
          },
          {
            menuName: '病例录入',
            menuPath: '/case',
            menuIcon: 'el-icon-s-order'
          },
          {
            menuName: '排班日程',
            menuPath: '/treatment',
            menuIcon: 'el-icon-s-help'
          },
          {
            menuName: '职工管理',
            menuPath: '/staff',
            menuIcon: 'el-icon-s-custom'
          }
        ],
        //被激活的链接地址
        activePath: ''
      }
    },
    created() {
      this.activePath = window.sessionStorage.getItem('activePath');
    },
    methods: {
      logOut() {
        window.sessionStorage.clear();
        this.$store.commit('logOutUser');
        this.$router.replace('/login')
      },

      //点击按钮切换菜单的折叠
      toggleCollapse() {
        this.isCollapse = !this.isCollapse
      },
      //保存链接的激活状态
      saveNavState(activePath) {
        console.log(activePath);
        window.sessionStorage.setItem('activePath', activePath)
        this.activePath = activePath
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