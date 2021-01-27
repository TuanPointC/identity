<template>
  <div>
    <MenuIdentity />
    <div class="container">
      <div class="active" style="display: flex">
        <span style="width: 20%">Enabled</span>
        <div class="switch-box">
          <label class="switch switch-green">
            <input
              type="checkbox"
              class="switch-input"
              v-model="detailsidentity.enabled"
            />
            <span class="switch-label" data-on="On" data-off="Off"></span>
            <span class="switch-handle"></span>
          </label>
        </div>
      </div>
      <div class="input">
        <span> Resource ID</span>
        <el-input type="text" v-model="detailsidentity.name"></el-input>
      </div>
      <hr />
      <div class="input">
        <span>Display Name</span>
        <el-input v-model="detailsidentity.displayName"></el-input>
      </div>
      <hr />
      <div class="input">
        <span>Description</span>
        <el-input
          type="textarea"
          :autosize="{ minRows: 5 }"
          v-model="detailsidentity.description"
        ></el-input>
      </div>
      <hr />
      <div class="active" style="display: flex">
        <span style="width: 20%">Required</span>
        <div class="switch-box">
          <label class="switch switch-green">
            <input
              type="checkbox"
              class="switch-input"
              v-model="detailsidentity.required"
            />
            <span class="switch-label" data-on="On" data-off="Off"></span>
            <span class="switch-handle"></span>
          </label>
        </div>
      </div>
      <hr />
      <div class="active" style="display: flex">
        <span style="width: 20%">Show In Discovery Document</span>
        <div class="switch-box">
          <label class="switch switch-green">
            <input
              type="checkbox"
              class="switch-input"
              v-model="detailsidentity.showInDiscoveryDocument"
            />
            <span class="switch-label" data-on="On" data-off="Off"></span>
            <span class="switch-handle"></span>
          </label>
        </div>
      </div>
      <hr />
      <div class="active" style="display: flex">
        <span style="width: 20%">Emphasize</span>
        <div class="switch-box">
          <label class="switch switch-green">
            <input
              type="checkbox"
              class="switch-input"
              v-model="detailsidentity.emphasize"
            />
            <span class="switch-label" data-on="On" data-off="Off"></span>
            <span class="switch-handle"></span>
          </label>
        </div>
      </div>
      <div class="buttonFunction">
        <el-button type="success" @click="saveEdit(), open2()">Save</el-button>
        <el-button type="danger" @click="centerDialogVisible1 = true"
          >Delete</el-button
        >
        <el-dialog
          title="Warning"
          :visible.sync="centerDialogVisible1"
          width="30%"
          center
        >
          <span>Do you want to delete?</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible1 = false">Cancel</el-button>
            <el-button
              type="danger"
              @click="
                (centerDialogVisible1 = false), open2(), deleteIdentityClient()
              "
              >Delete</el-button
            >
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import MenuIdentity from "@/views/resources/identityResources/menu";
import { IdentityModule } from "@/store/modules/resources/identity";
import {
  editIdentityResourceApi,
  deleteIdentityResourceApi,
} from "@/api/identityResources";
export default {
  components: {
    MenuIdentity,
  },
  data() {
    return {
      input: "",
      centerDialogVisible1: false,
      centerDialogVisible: false,
      changed: false,
      active: true,
      detailsidentity: {
        id: "",
        name: "",
        displayName: "",
        description: "",
        enabled: true,
        required: true,
        emphasize: true,
        showInDiscoveryDocument: true,
        allowedClaims: [],
        nonEditable: true,
      },
    };
  },
  computed:{
    position(){
      return IdentityModule.Position;
    }
  },

  methods: {
    open2() {
      this.$message({
        message: "Data has been changed successfully",
        type: "success",
        showClose: "true",
      });
    },
    async saveEdit() {
      await editIdentityResourceApi(this.detailsidentity);
      setTimeout(IdentityModule.getIdentity(), 1000);
      this.$router.push("/IdentityResources");
    },
    async deleteIdentityClient() {
      await deleteIdentityResourceApi();
      await setTimeout(IdentityModule.getIdentity(), 1000);
      this.$router.push("/IdentityResources");
    },
  },
  mounted() {
    if (this.position < 0) {
      this.$router.push("/IdentityResources");
    }
    else{
      this.detailsidentity = IdentityModule.GetIdentity[IdentityModule.Position];
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
.buttonFunction {
  margin: 20px 0;
}
.active {
  margin-top: 20px;
}
.input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
  .el-input {
    width: 80%;
    display: block;
  }
  .el-textarea {
    width: 80%;
    display: block;
  }
}
.buttonFunction {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.switch {
  position: relative;
  display: inline-block;
  vertical-align: top;
  width: 70px;
  height: 30px;
  border-radius: 18px;
  cursor: pointer;
  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
    0 15px 40px rgba(166, 173, 201, 0.2);
}

.switch-input {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}

.switch-label {
  position: relative;
  display: block;
  height: inherit;
  font-size: 15px;
  text-transform: uppercase;
  background: #eceeef;
  border-radius: inherit;
  transition: 0.15s ease-out;
}
.switch-label:before,
.switch-label:after {
  position: absolute;
  top: 50%;
  margin-top: -0.5em;
  line-height: 1;
  transition: inherit;
}
.switch-label:before {
  content: attr(data-off);
  right: 11px;
  color: #aaa;
  text-shadow: 0 1px rgba(255, 255, 255, 0.5);
}
.switch-label:after {
  content: attr(data-on);
  left: 11px;
  color: white;
  opacity: 0;
}

.switch-input:checked ~ .switch-label:before {
  opacity: 0;
}
.switch-input:checked ~ .switch-label:after {
  opacity: 1;
}

.switch-handle {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 22px;
  height: 22px;
  background: white;
  border-radius: 10px;
  transition: left 0.15s ease-out;
}
.switch-handle:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -6px 0 0 -6px;
  width: 12px;
  height: 12px;
  background: #f9f9f9;
  border-radius: 6px;
}
.switch-input:checked ~ .switch-handle {
  left: 40px;
}

.switch-green > .switch-input:checked ~ .switch-label {
  background: #4fb845;
}
</style>