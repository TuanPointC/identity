<template>
  <div>
    <MenuUser />
    <el-transfer
      v-model="value"
      :data="data"
      :titles="['Available', 'Assigned']"
      @change="editRoles(), open2()"
    >
    </el-transfer>
  </div>
</template>

<script>
import MenuUser from "@/views/user/menu.vue";
import { RolesModule } from "@/store/modules/roles";
import { UserModule } from "@/store/modules/user";
import { addRolesApi, deleteRolesApi } from "@/api/user";
export default {
  components: {
    MenuUser,
  },
  data() {
    return {
      data: [],
      value: [],
      len: 0,
    };
  },
  computed: {
    resultData() {
      return UserModule.GetUser.results;
    },
    position() {
      return UserModule.EditPosition;
    },
    rolesData() {
      return RolesModule.GetRoles;
    },
  },
  methods: {
    async editRoles() {
      const state = [],del = [];
      for (let i = 0; i < this.data.length; i++) {
        del.push(this.data[i].label);
      }
      console.log(del);
      await deleteRolesApi(del);
      for (let i = 0; i < this.value.length; i++) {
        state.push(this.data[this.value[i]].label);
      }
      await addRolesApi(state);
      await UserModule.getuserapi();
    },
    open2() {
      this.$message({
        message: "Congrats, this is a success message.",
        type: "success",
      });
    },
  },
  async mounted() {
    if (this.position < 0) {
      this.$router.push("/Users");
    } else {
      await RolesModule.getRolesApi();
      for (let i = 0; i < this.rolesData.length; i++) {
        this.data.push({
          label: this.rolesData[i].name,
          key: i,
        });
      }
      for (let i = 0; i < this.resultData[this.position].roles.length; i++) {
        this.value.push(
          this.data
            .map((e) => {
              return e.label;
            })
            .indexOf(this.resultData[this.position].roles[i].name)
        );
      }
      this.len = this.value.length;
    }
  },
};
</script>

<style  lang='scss' >
.el-transfer {
  font-size: 14px;
  margin: 30px auto 0;
  width: fit-content;
}
.el-transfer-panel {
  width: 450px !important;
}
.el-transfer-panel .el-transfer-panel__header {
  background: rgb(72, 61, 139) !important;
}
.el-transfer-panel
  .el-transfer-panel__header
  .el-checkbox
  .el-checkbox__label
  span {
  color: white !important;
}
.el-transfer-panel .el-transfer-panel__header .el-checkbox .el-checkbox__label {
  color: white !important;
}
.el-transfer-panel__body {
  height: 350px !important;
}
.el-transfer-panel__list.is-filterable {
  height: 100% !important;
}
.el-checkbox__label {
  font-size: 18px !important;
}
.el-checkbox.el-transfer-panel__item {
  margin: 20px 0;
}
.el-transfer-panel__item.el-checkbox .el-checkbox__label {
  padding-left: 41px !important;
}
.el-transfer-panel .el-checkbox__inner {
  height: 20px !important;
  width: 20px !important;
}
</style>