<template>
  <div class="app" style="position: relative">
    <Menu />
    <router-view />
    <div
      class="footer"
      style="
        text-align: center;
        background: #ecf0f1;
        padding: 10px 0;
        top: 100%;
        position: absolute;
        width: 100%;
      "
    >
      Phenikaa - 2021
    </div>
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
  .el-dialog__title {
    color: white !important;
  }
  button {
    i {
      color: white !important;
    }
  }
}
.tableUser button {
  height: 40px;
  width: 40px;
}
.tableData .cell button[data-v-924315e8] {
  height: 40px;
  width: 40px;
}
.el-tabs__header,
.is-top {
  display: none !important;
}
.el-menu--horizontal > .el-submenu .el-submenu__icon-arrow {
  margin-left: -16px !important;
  margin-top: 5px !important;
}
i.el-collapse-item__arrow.el-icon-arrow-right {
  display: none;
}
.el-collapse-item__header {
    justify-content: space-between!important;
    padding: 20px 15px!important;
}
.el-collapse-item__wrap {
    padding: 20px!important;
}
</style>