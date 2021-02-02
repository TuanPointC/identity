<template>
  <div class="search">
    <el-input
      placeholder="Seach..."
      v-model="input"
      @keyup.native="search"
    ></el-input>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "searchComponent",
})
export default class extends Vue {
  private input = "";
}
</script>

<style lang='scss' scoped>
.search {
  margin: 20px 0 0 0;
}
</style>