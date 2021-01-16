<template>
  <div>
    <MenuRoles />
    <div class="container" style="margin-top: 40px">
      <div class="input">
        <span>Name</span>
        <el-input
          v-model="rolesData[currentPosition].name"
          :disabled="CanEdit"
          @keyup.native="chanedInput"
        ></el-input>
      </div>
      <hr />
      <div class="input">
        <span>Description</span>
        <el-input
          type="textarea"
          :rows="6"
          v-model="rolesData[currentPosition].description"
          :disabled="CanEdit"
          @keyup.native="chanedInput"
        ></el-input>
      </div>
      <hr />
      <div class="buttonFunction">
        <div class="group1">
          <el-button type="success" @click="open2 ,editRole()" :disabled="changed"
            >Save</el-button
          >
        </div>
        <div class="group2">
          <el-button type="danger" @click="centerDialogVisible1 = true"
            >Delete</el-button
          >
          <el-dialog
            title="Warning"
            :visible.sync="centerDialogVisible1"
            width="30%"
            center
          >
            <span
              >It should be noted that the content will not be aligned in center
              by default</span
            >
            <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible1 = false"
                >Cancel</el-button
              >
              <router-link to="/Roles">
                <el-button
                  type="danger"
                  @click="
                    (centerDialogVisible1 = false), open2(), deleteRolesClient()
                  "
                  >Delete</el-button
                ></router-link
              >
            </span>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuRoles from "@/views/roles/menu";
import { RolesModule } from "@/store/modules/roles";
import { deleteRoles, editRolesApi } from "@/api/roles";
export default {
  components: {
    MenuRoles,
  },
  data() {
    return {
      centerDialogVisible1: false,
      CanEdit: true,
      changed: true,
    };
  },
  computed: {
    currentPosition() {
      return RolesModule.Position;
    },
    rolesData() {
      return RolesModule.GetRoles;
    },
    rolesName() {
      return RolesModule.Name;
    },
  },
  methods: {
    open2() {
      this.$message({
        message: "Data has been saved successfully",
        type: "success",
      });
    },
    deleteRolesClient() {
      deleteRoles();
    },
    chanedInput() {
      this.changed = false;
    },
    async editRole() {
      await editRolesApi();
      await RolesModule.getRolesApi();
      this.$router.push('/Roles');
    },
  },
  async mounted() {
    if (this.currentPosition < 0) {
      this.$router.push("/Roles");
    } else {
      this.CanEdit = this.rolesData[this.currentPosition].reserved;
    }
  },
};
</script>

<style lang="scss" scoped>
.top {
  padding: 10px 0;
  background: #ecf0f1;
}
hr {
  border-top: none;
  border-color: rgb(202, 202, 202);
  margin: 20px 0;
}
button {
  margin-right: 20px !important;
}
.input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
  .el-input {
    width: 90%;
    display: block;
  }
  .el-textarea {
    width: 90%;
  }
  span {
    width: 10%;
  }
}
.buttonFunction {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>