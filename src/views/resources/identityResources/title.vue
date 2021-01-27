<template>
  <div>
    <div class="top">
      <div class="container">
        <span>Home {{breakcrum}}</span>
        <h2>Identity Resources</h2>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { BreakCrumbModule } from "@/store/modules/breakCrumb";

export default {
 computed:{
    breakcrum(){
      return BreakCrumbModule.Router;
    }
  },

};
</script>

<style scoped lang='scss'>
.top {
  padding: 10px 0;
  background: #ecf0f1;
}
</style>