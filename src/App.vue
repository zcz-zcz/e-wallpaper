<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
html, body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: transparent;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
