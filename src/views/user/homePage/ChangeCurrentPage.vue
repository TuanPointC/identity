<template>
  <div class="changeCurrentPage">
    <p>
      Page {{  }} of {{  }} ~
      {{  }} results(s) found
    </p>
    <div class="modeChange">
      <el-button><i class="fas fa-angle-double-left"></i></el-button>
      <el-button><i class="fas fa-chevron-left"></i></el-button>
      <el-button><i class="fas fa-chevron-right"></i></el-button>
      <el-button><i class="fas fa-angle-double-right"></i></el-button>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
@Component({
  name: "ChangeCurrentPage",
})
export default class extends Vue {}
</script>

<style  lang='scss' scoped >
.changeCurrentPage {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 75px;
  p {
    font-size: 12px;
    color: rgb(155, 151, 151);
  }
  .modeChange {
    button {
      margin: 0;
      padding: 8px 12px;
      border-radius: 0;
    }
  }
}
</style>