<template>
  <div class="app">
    <Menu />
    <router-view />
  </div>
</template>

<script>
import Menu from "@/components/menu";
export default {
  components: {
    Menu,
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.app {
  width: 100%;
  min-height: 100vh;
  background: #ebe7e7;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
}
.el-dialog__header {
  background: #483d8b;
  .el-dialog__title{
     color: white!important;
  }
  button{
    i{
      color: white!important;
    }
  }
}
</style>