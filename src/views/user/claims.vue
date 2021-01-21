<template>
  <div>
    <Menu />
    <div class="container">
      <div class="addRoles" style="margin-top: 20px">
        <el-button type="success" @click="dialogVisible = true"
          >Add Claim</el-button
        >
        <el-dialog
          title="New Role"
          :visible.sync="dialogVisible"
          width="60%"
          center
        >
          <div class="input">
            <div class="label">Name</div>
            <el-select v-model="value" placeholder="Select" @change="change">
              <el-option
                v-for="item in options"
                :key="item.value.name"
                :value="item.value.name"
              >
              </el-option>
            </el-select>
          </div>
          <div class="input">
            <div class="label">Descriptions</div>
            <el-input
              type="text"
              v-if="sl != 'Boolean'"
              v-model="value1"
            ></el-input>
            <el-select
              v-model="value1"
              placeholder="Select"
              v-if="sl == 'Boolean'"
            >
              <el-option
                v-for="item in options1"
                :key="item.value"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button
              type="success"
              @click="(dialogVisible = false), open2(), addUserClaimsClient()"
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
        <el-table
          :data="userData.results[position].claims"
          style="width: 100%"
          stripe
        >
          <el-table-column prop="type" label="Type"> </el-table-column>
          <el-table-column prop="value" label="Value"> </el-table-column>
          <el-table-column width="50">
            <template style="display: flex" slot-scope="scope">
              <el-button
                circle
                @click="
                  (centerDialogVisibleEdit = true),
                    editUserClaimsClient(scope.row)
                "
                ><i class="fas fa-pencil-alt"></i
              ></el-button>
            </template>
          </el-table-column>
          <el-table-column width="70">
            <template style="display: flex" slot-scope="scope">
              <el-button
                circle
                @click="
                  (centerDialogVisibleDelete = true), (deleteClaim = scope.row)
                "
                ><i class="fas fa-times" style="color: red"></i
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-dialog
        title="Warning"
        :visible.sync="centerDialogVisibleDelete"
        width="50%"
        center
      >
        <span
          >It should be noted that the content will not be aligned in center by
          default</span
        >
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisibleDelete = false"
            >Cancel</el-button
          >
          <el-button
            type="danger"
            @click="
              (centerDialogVisibleDelete = false), deleteUserClaimsClient()
            "
            >Delete</el-button
          >
        </span>
      </el-dialog>

      <el-dialog
        title="Value"
        :visible.sync="centerDialogVisibleEdit"
        width="50%"
        center
      >
        <el-input
          type="text"
          v-if="sl != 'Boolean'"
          v-model="editClaim.value"
          @keyup.native="show"
        ></el-input>
        <el-select
          v-model="editClaim.value"
          placeholder="Select"
          v-if="sl == 'Boolean'"
          style="width: 100%"
        >
          <el-option
            v-for="item in options1"
            :key="item.value"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisibleEdit = false">Cancel</el-button>
          <el-button
            type="success"
            @click="
              (centerDialogVisibleEdit = false), open2(), saveUserClaimsClient()
            "
            >Save</el-button
          >
        </span>
      </el-dialog>

      <div class="count">
        <p style="font-size: 12px; color: #9b9797; margin-top: 20px">
          {{ userData.results[position].claims.length }} result(s) found
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from "./menu.vue";
import { UserModule } from "@/store/modules/user";
import { ClaimsModule } from "@/store/modules/claim";
import { addUserClaims, deleteUserClaims, editUserClaims } from "@/api/user";
export default {
  components: {
    Menu,
  },
  data() {
    return {
      value: "",
      dialogVisible: false,
      input: "",
      disableButtonSaveAddRoles: false,
      options: [],
      options1: [{ value: "True" }, { value: "False" }],
      value1: "",
      sl: "",
      centerDialogVisibleDelete: false,
      centerDialogVisibleEdit: false,
      deleteClaim: { value: "hihi", type: "" },
      editClaim: {},
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
    change(e) {
      const index = this.options.map((e) => e.value.name).indexOf(e);
      this.sl = this.options[index].value.valueType;
    },

    async addUserClaimsClient() {
      await addUserClaims({ type: this.value, value: this.value1 });
      setTimeout(UserModule.getuserapi, 500);
    },

    async deleteUserClaimsClient() {
      await deleteUserClaims({
        type: this.deleteClaim.type,
        value: this.deleteClaim.value,
      });
      setTimeout(UserModule.getuserapi, 500);
    },

    editUserClaimsClient(e) {
      this.change(e.type);
      this.editClaim = e;
      this.deleteClaim.value = this.editClaim.value;
      this.deleteClaim.type = this.editClaim.type;
    },

    show() {
      console.log(this.deleteClaim.value);
      console.log(this.editClaim.value);
    },
    async saveUserClaimsClient() {
      await editUserClaims({
        oldClaimType: this.deleteClaim.type,
        oldClaimValue: this.deleteClaim.value,
        newClaimType: this.editClaim.type,
        newClaimValue: this.editClaim.value,
      });
      setTimeout(UserModule.getuserapi, 500);
    },
  },
  async mounted() {
    if (this.position < 0) {
      this.$router.push("/Users");
    } else {
      await ClaimsModule.getClaims("");
      for (let i = 0; i < ClaimsModule.GetClaims.length; i++) {
        this.options.push({ value: ClaimsModule.GetClaims[i] });
      }
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
    .el-select {
      width: 95%;
    }
    .el-input {
      width: 95%;
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