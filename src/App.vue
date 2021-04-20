<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {}
}
</script>

<style>
html,
body,
#app {
  height: 100%;
}
* {
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
}
.el-dialog__header {
  color: #fff;
  background: linear-gradient(270deg, #01c6fa, #1493fa);
  text-align: center;
}
</style>
