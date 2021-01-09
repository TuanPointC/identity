<template>
  <div>
    <MenuUser />
    <el-transfer
      filterable
      :filter-method="filterMethod"
      filter-placeholder="Search..."
      v-model="value"
      :data="data"
      :titles="['Available', 'Assigned']"
    >
    </el-transfer>
  </div>
</template>

<script>
import MenuUser from "@/views/user/menu.vue";
export default {
  components: {
    MenuUser,
  },
  data() {
    const generateData = () => {
      const data = [];
      const states = [
        "California",
        "Illinois",
        "Maryland",
        "Texas",
        "Florida",
        "Colorado",
        "Connecticut ",
      ];
      const initials = ["CA", "IL", "MD", "TX", "FL", "CO", "CT"];
      states.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          initial: initials[index],
        });
      });
      return data;
    };
    return {
      data: generateData(),
      value: [],
      filterMethod(query, item) {
        return item.initial.toLowerCase().indexOf(query.toLowerCase()) > -1;
      },
    };
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
</style>