<template>
  <div class="tableUser" style="margin-top: 20px">
    <el-table :data="GetUser.results" style="width: 100%" stripe>
      <el-table-column width="50">
        <template slot-scope="scope">
          <i
            class="far fa-trash-alt"
            style="color: red"
            v-if="GetUser.results[scope.$index].isDeleted"
          ></i>
          <i
            class="far fa-check-circle"
            style="color: green"
            v-if="
              !GetUser.results[scope.$index].isDeleted &&
              !GetUser.results[scope.$index].isBlocked
            "
          ></i>
        </template>
      </el-table-column>
      <el-table-column label="Username">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="Full Name">
        <template slot-scope="scope">
          {{ scope.row.firstName + " " + scope.row.lastName }}
        </template>
      </el-table-column>
      <el-table-column prop="email" label="Email Address"> </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button circle @click.native="editData(scope)"
            ><i class="fas fa-pencil-alt"></i
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { UserModule } from "@/store/modules/user.ts";
@Component({
  name: "TableUser",
})
export default class extends Vue {
  private get GetUser() {
    return UserModule.GetUser;
  }
  private async editData(e: { $index: number }) {
    await UserModule.changeEditPosition(e.$index);
    this.$router.push("/Users/details");
  }
}
</script>

<style lang='scss' scoped>
.tableUser {
  button {
    display: block;
    margin-left: auto;
  }
}
</style>