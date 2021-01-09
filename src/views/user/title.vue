<template>
  <div>
    <div class="top">
      <div class="container">
        <span>Home  {{name}}</span>
        <h2>User</h2>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default{
  data(){
    return{
      name:''
    }
  }
}
</script>

<style scoped lang='scss'>
.top {
  padding: 10px 0;
  background: #ecf0f1;
}
</style>