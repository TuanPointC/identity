<template>
  <div>
    <div class="menu-box">
      <div class="container">
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#ecf0f1"
          text-color="black"
        >
          <el-menu-item index="1"
            ><router-link to="/Roles/details"
              >Details</router-link
            ></el-menu-item
          >
          <el-menu-item index="2"
            ><router-link to="/Roles/users">Users</router-link></el-menu-item
          >
        </el-menu>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: black !important;
  display: inline-block;
  height: 60px;
  padding: 0 15px;
  font-size: 15px;
}
a.router-link-exact-active,
a.router-link-active {
  color: black !important;
  border-bottom: 3px solid rgb(36, 7, 139);
}
a[data-v-4c83ca8b] {
  height: 25px;
}
li {
  font-weight: 600;
  padding: 0;
}
li.is-active {
  border-bottom-color: none !important;
  border-bottom-width: 0 !important;
}
.menu-box {
  background: #ecf0f1;
  height: fit-content;
}
.el-menu.el-menu--horizontal {
  border-bottom: none !important;
}
.el-menu--horizontal > .el-menu-item {
  height: 26px;
  line-height: 24px;
}
a[data-v-2ef96ef9] {
  height: fit-content;
}
</style>