<template>
  <div>
    <MenuIdentity />
    <el-transfer
      v-model="value"
      :data="data"
      :titles="['Available', 'Assigned']"
      @change="open2(), save()"
    >
    </el-transfer>
  </div>
</template>

<script>
import MenuIdentity from "@/views/resources/identityResources/menu";
import { IdentityModule } from "@/store/modules/resources/identity";
import { ClaimsModule } from "@/store/modules/claim";
import { editIdentityResourceApi } from "@/api/identityResources";
export default {
  components: {
    MenuIdentity,
  },
  data() {
    return {
      data: [],
      value: [],
      detailsidentity: [],
    };
  },
  computed: {
    position(){
      return IdentityModule.Position;
    }
  },
  methods: {
    open2() {
      this.$message({
        message: "Data has been changed successfully",
        type: "success",
        showClose: "true",
      });
    },
    async save() {
      this.detailsidentity.allowedClaims = this.value.map((e) => {
        return this.data[e].label;
      });

      await editIdentityResourceApi(this.detailsidentity);
      IdentityModule.getIdentity();
    },
  },
  async mounted() {
    if (this.position < 0) {
      this.$router.push("/IdentityResources");
    } else {
      await ClaimsModule.getClaims();
      const assigned =
        IdentityModule.GetIdentity[IdentityModule.Position].allowedClaims;
      const available = ClaimsModule.GetClaims;
      for (let i = 0; i < available.length; i++) {
        this.data.push({
          key: i,
          label: available[i].name,
        });
      }
      for (let i = 0; i < assigned.length; i++) {
        this.value.push(
          this.data
            .map((e) => {
              return e.label;
            })
            .indexOf(assigned[i])
        );
      }
      this.detailsidentity =
        IdentityModule.GetIdentity[IdentityModule.Position];
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
  width: 350px !important;
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
  margin-bottom: 35px;
}
.el-transfer-panel__item.el-checkbox .el-checkbox__label {
  padding-left: 41px !important;
}
.el-transfer-panel .el-checkbox__inner {
  height: 20px !important;
  width: 20px !important;
}
.el-transfer-panel__list {
  height: 310px !important;
}
</style>