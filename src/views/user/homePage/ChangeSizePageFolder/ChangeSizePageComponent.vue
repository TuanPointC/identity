<template>
  <div class="changeSizePage-addUser">
    <el-select
      v-model="value"
      placeholder="5 per page"
      @change="changePageSize(value)"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <dialog-add-new-user />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import DialogAddNewUser from "./DialogAddNewUser.vue";
@Component({
  name: "ChangeSizePageComponent",
  components: {
    DialogAddNewUser,
  },
})
export default class extends Vue {
  private options = [
    {
      value: "5",
      label: "5 per page",
    },
    {
      value: "10",
      label: "10 per page",
    },
    {
      value: "15",
      label: "15 per page",
    },
    {
      value: "20",
      label: "20 per page",
    },
    {
      value: "25",
      label: "25 per page",
    },
  ];
  private value = "";
}
</script>

<style lang='scss' scoped>
.changeSizePage-addUser {
  display: flex;
  justify-content: space-between;
}
</style>