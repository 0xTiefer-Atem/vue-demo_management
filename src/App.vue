<template>
  <div id="app">
<!--    路由占位符-->
    <router-view></router-view>
  </div>
</template>


<script>
import Test from "./components/Test";
  export default {
    name: 'App',
    components: {
      Test
    }
  }
</script>
<style>

</style>
