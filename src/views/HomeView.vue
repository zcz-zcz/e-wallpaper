<template>
  <div class="home">
    <div class="title">
      <div class="operation-box">
        <div class="operation-item">
          <i class="el-icon-remove" style="color: #FFA500;" @click="handleMinimize"></i>
        </div>
        <div class="operation-item">
          <i class="el-icon-circle-plus" style="color: #00FF00;" @click="handleMaximize"></i>
        </div>
        <div class="operation-item">
          <i class="el-icon-error" style="color: #FF0000;" @click="handleClose"></i>
        </div>
      </div>
    </div>
    <div class="tool-box">
      <dock-menu></dock-menu>
    </div>
    <div class="background">
      <wallpaper></wallpaper>
    </div>
  </div>
</template>

<script>
import dockMenu from '@/components/dockMenu.vue'
import wallpaper from '@/components/wallpaper.vue'
export default {
  name: 'HomeView',
  components: {
    dockMenu,
    wallpaper
  },
  data() {
    return {

    }
  },
  created() {},
  mounted() {},
  methods: {
    handleClose() {
      require('electron').remote.app.quit()
    },
    handleMinimize() {
      console.log(require('electron'))
      require('electron').ipcRenderer.send('window-min')
    },
    handleMaximize() {
      require('electron').ipcRenderer.send('window-max')
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .title {
    position: fixed;
    top: 0;
    z-index: 2024;
    width: 100%;
    height: 32px;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(15px);
    .operation-box {
      height: 100%;
      width: 120px;
      float: right;
      .operation-item {
        display: inline-block;
        height: 100%;
        width: 33%;
        text-align: center;
        line-height: 38px;
        i {
          cursor: pointer;
          font-size: 22px;
        }
      }
    }
  }
  .tool-box {
    position: fixed;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2024;
    width: 80%;
    height: 60px;
    border-radius: 12px;
    background-color: rgba(225, 225, 225, 0.3);
    backdrop-filter: blur(15px);
    transition: all 0.5s;
    transform-origin: bottom center;
    &:hover {
      transform: translateX(-50%) scale(1.1);
    }
  }
  .background {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background-color: transparent;
  }
}
</style>
