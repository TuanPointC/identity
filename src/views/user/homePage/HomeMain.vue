<template>
  <div style="margin-bottom: 20px">
    <div class="container">
      <search-component />
      <buton-mode-component />
      <change-size-page-component />
      <table-users />
      <change-current-page-component />
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { UserModule } from "@/store/modules/user";
import SearchComponent from "./SearchComponent.vue";
import ButonModeComponent from "./ButtonModeComponent.vue";
import ChangeSizePageComponent from "./ChangeSizePageFolder/ChangeSizePageComponent.vue";
import ChangeCurrentPageComponent from "./ChangeCurrentPage.vue";
import TableUsers from "./TableUsers.vue";
@Component({
  name: "HomeMain",
  components: {
    SearchComponent,
    ButonModeComponent,
    ChangeSizePageComponent,
    ChangeCurrentPageComponent,
    TableUsers,
  },
})
export default class extends Vue {
  async mounted() {
    await UserModule.getuserapi();
  }
}
</script>

<style lang='scss' scoped>
</style>