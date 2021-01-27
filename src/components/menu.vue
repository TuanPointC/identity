<template>
  <div class="menu-box">
    <div class="container">
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        background-color="#483D8B"
        text-color="#aeaeae"
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
        <el-submenu index="/Resource">
          <template slot="title"
            ><router-link
              to="/IdentityResources"
              :style="{ borderBottom: borderValue, color: color2 }"
              >Resources</router-link
            >
          </template>
          <el-menu-item index="IdentityResources" :style="{ color: `${color1}+'!important'` }"
            ><router-link to="/IdentityResources"
              >Identity Resources</router-link
            >
          </el-menu-item>
          <el-menu-item
            index="ProtectResources"
            :style="{ color: color2, fontSize: '17px', textAlign: 'center' }"
            @click="changeRouter('ProtectedResources')"
            >Protected Resources</el-menu-item
          >
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { BreakCrumbModule } from "@/store/modules/breakCrumb.ts";
export default {
  data() {
    return {
      color1: "#aeaeae",
    };
  },
  methods: {
    changeRouter(e) {
      this.$router.push("/" + e);
      BreakCrumbModule.changeBorder("4px solid orangered", "white");
      this.color1 = "#aeaeae";
    },
  },
  computed: {
    borderValue() {
      return BreakCrumbModule.BorderValueResources;
    },
    color2() {
      return BreakCrumbModule.Color;
    },
  },

};
</script>

<style lang="scss" scoped>
#title {
  color: red !important;
}
a {
  text-decoration: none;
  color: #aeaeae ;
  display: inline-block;
  height: 60px;
  padding: 0 20px;
  font-size: 17px;
}
a.router-link-exact-active,
a.router-link-active {
  color: white !important;
  border-bottom: 4px solid orangered;
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