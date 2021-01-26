<template>
  <div>
    <MenuProtected />
    <el-transfer
      v-model="value"
      :data="data"
      :titles="['Available', 'Assigned']"
      @change="open2(),save()"
    >
    </el-transfer>
  </div>
</template>

<script>
import MenuProtected from "@/views/resources/protectedResources/menu";
import { ClaimsModule } from "@/store/modules/claim";
import { ProtectedModule } from "@/store/modules/resources/protected";
import {editProtectedResourceApi} from '@/api/protectedResorces'
export default {
  components: {
    MenuProtected,
  },
  data() {
    return {
      data: [],
      value: [],
      detailsProtected: [],
    };
  },
  computed: {},
  methods: {
    open2() {
      this.$message({
        message: "Congrats, this is a success message.",
        type: "success",
      });
    },
    async save() {
      this.detailsProtected.allowedClaims = this.value.map((e) => {
        return this.data[e].label;
      });

      await editProtectedResourceApi(this.detailsProtected);
      ProtectedModule.getProtected();
    },
  },
  async mounted() {
    await ClaimsModule.getClaims();
    const assigned =
      ProtectedModule.GetProtected[ProtectedModule.Position].allowedClaims;
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
    this.detailsProtected =
      ProtectedModule.GetProtected[ProtectedModule.Position];
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