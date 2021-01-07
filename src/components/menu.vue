<template>
  <div class="menu-box">
    <div class="container">
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#483D8B"
        text-color="#aeaeae"
        active-text-color="#fff"
      >
        <el-menu-item index="1"
          ><router-link to="/Users">User</router-link></el-menu-item
        >
        <el-menu-item index="2"
          ><router-link to="/Roles">Roles </router-link></el-menu-item
        >
        <el-menu-item index="3">
          <router-link to="/ClaimTypes">Claim Types </router-link></el-menu-item
        >
        <el-menu-item index="4"
          ><router-link to="/Clients">Clients </router-link></el-menu-item
        >
        <el-submenu index="5">
          <template slot="title"
            ><router-link to="/Resources">Resources </router-link></template
          >
          <el-menu-item index="5-1">item one</el-menu-item>
          <el-menu-item index="5-2">item two</el-menu-item>
          <el-menu-item index="5-3">item three</el-menu-item>
        </el-submenu>
        <el-menu-item index="6"
          ><router-link to="/Auditing">Auditing </router-link></el-menu-item
        >
        <el-menu-item index="7"
          ><router-link to="/Settings">Settings </router-link></el-menu-item
        >
      </el-menu>
    </div>
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
  color: #aeaeae;
  display: inline-block;
  height: 60px;
  padding: 0 20px;
  font-size: 17px;
}
a.router-link-exact-active{
    color: white!important;
}
li {
  font-weight: 600;
  padding: 0;
}
li.is-active {
  border-bottom-color: rgb(255, 96, 75)!important;
  border-bottom-width:3px!important;
}
.menu-box {
  background: #483d8b;
  height: fit-content;
}
.el-menu.el-menu--horizontal {
  border-bottom: none !important;
}
</style>