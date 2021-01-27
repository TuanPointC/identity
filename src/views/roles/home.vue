<template>
  <div>
    <div class="container">
      <div class="search">
        <el-input placeholder="Seach..." v-model="input"></el-input>
      </div>

      <div class="addRoles">
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
            <el-input
              placeholder="Please input"
              v-model="addRolesClient.name"
              @keyup.native="checkFillFullInputAddRoles"
            ></el-input>
          </div>
          <div class="input">
            <div class="label">Descriptions</div>
            <el-input
              type="textarea"
              :autosize="{ minRows: 5 }"
              placeholder="Please input"
              v-model="addRolesClient.description"
              @keyup.native="checkFillFullInputAddRoles"
            >
            </el-input>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button
              type="success"
              @click="(dialogVisible = false), addRolesClientFunc(), open2()"
              :disabled="disableButtonSaveAddRoles"
              >Save</el-button
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
        <el-table :data="rolesData" style="width: 100%" stripe>
          <el-table-column prop="name" label="Username"> </el-table-column>
          <el-table-column prop="description" label="Description">
          </el-table-column>
          <el-table-column width="150">
            <template slot-scope="scope" style="display: flex">
              <span
                v-if="scope.row.reserved"
                style="
                  font-weight: bolder;
                  background: #c0c4cc;
                  padding: 0 15px;
                  border-radius: 15px;
                  border: 1px solid;
                "
                >Reserved</span
              >
            </template>
          </el-table-column>
          <el-table-column width="100">
            <template style="display: flex" slot-scope="scope">
              <router-link to="/Roles/details">
                <el-button circle @click="position(scope)"
                  ><i class="fas fa-pencil-alt"></i></el-button
              ></router-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="changeCurrentPage">
        <p style="font-size: 12px; color: #9b9797; margin-top: 20px">
          {{ rolesData.length }} results(s) found
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { RolesModule } from "@/store/modules/roles";

export default {
  data() {
    return {
      value: "",
      dialogVisible: false,
      input: "",
      disableButtonSaveAddRoles: true,
      addRolesClient: {
        name: "",
        description: "",
      },
      editRolesClient: {
        id: "",
        name: "",
        description: "",
      },
    };
  },
  computed: {
    rolesData() {
      return RolesModule.GetRoles;
    },
  },
  methods: {
    open2() {
      this.$message({
        message: "Congrats, this is a success message.",
        type: "success",
      });
    },
    async addRolesClientFunc() {
      await RolesModule.addRoles(this.addRolesClient);
      setTimeout(RolesModule.getRolesApi, 500);
      this.addRolesClient.name = "";
      this.addRolesClient.description = "";
    },
    checkFillFullInputAddRoles() {
      if (
        this.addRolesClient.name != "" &&
        this.addRolesClient.description != ""
      ) {
        this.disableButtonSaveAddRoles = false;
      } else {
        this.disableButtonSaveAddRoles = true;
      }
    },
    position(e) {
      RolesModule.changePosition(e.$index);
    },
  },
  mounted() {
    RolesModule.getRolesApi();
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