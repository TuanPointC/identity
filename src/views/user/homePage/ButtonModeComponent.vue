<template>
  <div class="button-mode">
    <el-button>Active</el-button>
    <el-button><i class="fas fa-exclamation-triangle"></i> Blocked</el-button>
    <el-button><i class="fas fa-trash-alt"></i> Deleted</el-button>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
@Component({
  name: "ButtonModeComponent",
})
export default class extends Vue {}
</script>

<style lang='scss' scoped>
.button-mode {
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  button {
    width: 33%;
  }
}
</style>