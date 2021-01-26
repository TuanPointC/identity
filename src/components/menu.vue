<template>
  <div class="menu-box">
    <div class="container">
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#483D8B"
        text-color="#aeaeae"
        :router="true"
      >
        <el-menu-item index="/Users"
          ><router-link to="/Users">User</router-link></el-menu-item
        >
        <el-menu-item index="/Roles"
          ><router-link to="/Roles">Roles </router-link></el-menu-item
        >
        <el-menu-item index="/ClaimTypes">
          <router-link to="/ClaimTypes">Claim Types </router-link></el-menu-item
        >
        <el-menu-item index="/Clients"
          ><router-link to="/Clients">Clients </router-link></el-menu-item
        >
        <el-submenu >
          <template slot="title"
            ><router-link
              to="/IdentityResources"
              >Resources
            </router-link></template
          >
          <el-menu-item
            @click="changeRouter('IdentityResources')"
            :style="{ color: color1 }"
            >Identity Resources
          </el-menu-item>
          <el-menu-item
            @click="changeRouter('ProtectResources')"
            :style="{ color: color2 }"
            >Protect Resources</el-menu-item
          >
        </el-submenu>
        <el-menu-item index="/Auditing"
          ><router-link to="/Auditing">Auditing </router-link></el-menu-item
        >
        <el-menu-item index="/Settings"
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
      color1: "#aeaeae",
      color2: "#aeaeae",
      //size:3
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    changeRouter(e) {
      this.$router.push("/" + e);
      if (e == "IdentityResources") {
        this.color1 = "white";
        this.color2 = "#aeaeae";
      } else {
        this.color2 = "white";
        this.color1 = "#aeaeae";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: #aeaeae !important;
  display: inline-block;
  height: 60px;
  padding: 0 20px;
  font-size: 17px;
}
a.router-link-exact-active,
a.router-link-active {
  color: white !important;
  border-bottom: 3px solid orangered;
}
a[data-v-a380d422] {
  height: 58px;
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
  background: #483d8b;
  height: fit-content;
}
.el-menu.el-menu--horizontal {
  border-bottom: none !important;
}
</style>