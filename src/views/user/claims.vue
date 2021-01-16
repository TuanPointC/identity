<template>
  <div>
    <Menu />
    <div class="container">
      <div class="addRoles" style="margin-top: 20px">
        <el-button type="success" @click="dialogVisible = true"
          >Add Role</el-button
        >
        <el-dialog
          title="New Role"
          :visible.sync="dialogVisible"
          width="60%"
          center
        >
          <div class="input">
            <div class="label">Name</div>
            <el-input placeholder="Please input"></el-input>
          </div>
          <div class="input">
            <div class="label">Descriptions</div>
            <el-input
              type="textarea"
              :autosize="{ minRows: 5 }"
              placeholder="Please input"
            >
            </el-input>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button
              type="success"
              @click="(dialogVisible = false), open2()"
              :disabled="disableButtonSaveAddRoles"
              >Save</el-button
            >
            <el-button
              type="success"
              @click="dialogVisible = false"
              :disabled="disableButtonSaveAddRoles"
              >Save & Configure</el-button
            >
            <el-button
              @click="
                dialogVisible = false;
                addRolesClient.name = '';
                addRolesClient.description = '';
              "
              >Cancel</el-button
            >
          </span>
        </el-dialog>
      </div>

      <div class="tableUser" style="margin-top: 20px">
        <el-table
          :data="userData.results[position].claims"
          style="width: 100%"
          stripe
        >
          <el-table-column prop="type" label="Type"> </el-table-column>
          <el-table-column prop="value" label="Value"> </el-table-column>
          <el-table-column width="50">
            <template style="display: flex">
              <el-button circle><i class="fas fa-pencil-alt"></i></el-button>
            </template>
          </el-table-column>
          <el-table-column width="70">
            <template style="display: flex">
              <el-button circle
                ><i class="fas fa-times" style="color: red"></i
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="count">
        <p style="font-size: 12px; color: #9b9797; margin-top:20px"
          >{{ userData.results[position].claims.length }} result(s) found</p
        >
      </div>
    </div>
  </div>
</template>

<script>
import Menu from "./menu.vue";
import { UserModule } from "@/store/modules/user";
export default {
  components: {
    Menu,
  },
  data() {
    return {
      value: "",
      dialogVisible: false,
      input: "",
      disableButtonSaveAddRoles: true,
    };
  },
  computed: {
    userData() {
      return UserModule.GetUser;
    },
    position() {
      return UserModule.EditPosition;
    },
  },
  methods: {
    open2() {
      this.$message({
        message: "Congrats, this is a success message.",
        type: "success",
      });
    },
  },
  mounted() {
    if (this.position < 0) {
      this.$router.push("/Users");
    }
  },
};
</script>

<style lang='scss' scoped>
.search {
  margin: 20px 0;
}

.addRoles {
  button {
    margin-left: auto;
    display: block;
  }
  .dialog-footer {
    display: flex;
    justify-content: flex-start;
    margin-left: 0;
    button {
      margin-left: 10px;
    }
  }
  .input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
    input {
      width: 85%;
    }
    .label {
      width: 15%;
      font-weight: bolder;
    }
  }
}

.tableUser {
  button {
    display: block;
    margin-left: auto;
  }
}
</style>