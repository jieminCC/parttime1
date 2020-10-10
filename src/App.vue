<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
html,
body {
  height: 100%;
  font-family: PingFang SC;
  background-color: #f4f8ff;
}
#app {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f7f8fa;
}
/* #app * {
  box-sizing: border-box;
} */
</style>
