<template>
  <div>
    <MenuClient />
    <div class="container">
      <div class="active" style="display: flex">
        <span style="margin-right: 60px">Require Secret</span>
        <div class="switch-box">
          <label class="switch switch-green">
            <input
              type="checkbox"
              class="switch-input"
              :checked="ClientData[Position].requireClientSecret"
            />
            <span class="switch-label" data-on="On" data-off="Off"></span>
            <span class="switch-handle"></span>
          </label>
        </div>
      </div>
      <div class="input">
        <span> Type</span>
        <el-input v-model="addClientSecretClient.type"></el-input>
      </div>
      <hr />
      <div class="input">
        <div class="label">Value</div>
        <el-input
          placeholder="Please input"
          v-model="addClientSecretClient.value"
        >
        </el-input>
        <el-button type="info"><i class="fas fa-random"></i></el-button>
      </div>
      <hr />
      <div class="input">
        <span>Description</span>
        <el-input
          type="textarea"
          :autosize="{ minRows: 5 }"
          v-model="addClientSecretClient.description"
        ></el-input>
      </div>
      <hr />
      <div class="buttonFunction">
        <div class="group1">
          <el-button
            type="success"
            @click="
              open2(), addClientSecretFunc()
            "
            >Add</el-button
          >
          <el-button type="info">Clear</el-button>
          <el-dialog
            title="Reset password"
            :visible.sync="centerDialogVisible"
            width="50%"
            center
          >
            <div class="input">
              <div class="label" style="width: 20%">New Password</div>
              <el-input placeholder="Please input"></el-input>
            </div>
            <div class="input">
              <div class="label" style="width: 20%">Repeat password</div>
              <el-input placeholder="Please input"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible = false">Cancel</el-button>
              <el-button
                type="success"
                @click="(centerDialogVisible = false), open2()"
                >Save</el-button
              >
            </span>
          </el-dialog>
        </div>
      </div>
      <div class="secretTable" style="margin-top: 20px">
        <el-table
          :data="ClientData[Position].clientSecrets"
          style="width: 100%"
        >
          <el-table-column prop="type" label="Type"> </el-table-column>
          <el-table-column prop="value" label="Value"> </el-table-column>
          <el-table-column prop="description" label="Description">
          </el-table-column>
          <el-table-column prop="expiration" label="Expiration">
          </el-table-column>
          <el-table-column width="100">
            <template slot-scope="scope">
              <el-button circle @click="deleteClientSecretApi(scope)">
                <i class="fas fa-times" style="color: red"></i
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import MenuClient from "@/views/client/menu";
import { ClientModule } from "@/store/modules/client";
import {
  deleteClientApi,
  addClientApiSecret,
  deleteClientSecretApi,
} from "@/api/client";
import { uid } from 'uid';
export default {
  components: {
    MenuClient,
  },
  data() {
    return {
      centerDialogVisible1: false,
      centerDialogVisible: false,
      changed: false,
      active: true,

      addClientSecretClient: {
        type: "",
        value: "",
        description: "",
        expiration: "",
      },
    };
  },
  computed: {
    ClientData() {
      return ClientModule.GetClient;
    },
    Position() {
      return ClientModule.Position;
    },
  },
  methods: {
    open2() {
      this.$message({
        message: "Data has been saved successfully",
        type: "success",
      });
    },
    async deleteFunc() {
      await deleteClientApi();
      await setTimeout(await ClientModule.getClient(""), 3000);
      this.$router.push("/Clients");
    },

    randomValue(){
      this.addClientSecretClient.value=uid(25);
    },

    async addClientSecretFunc() {
      this.addClientSecretClient.expiration = new Date();
      this.addClientSecretClient.expiration = this.addClientSecretClient.expiration.toISOString();
      await addClientApiSecret(this.addClientSecretClient);
      setTimeout(ClientModule.getClient(""), 3000);
    },

    async deleteClientSecretApi(e) {
      await deleteClientSecretApi(e.$index);
      setTimeout(ClientModule.getClient(""), 3000);
    },
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

.active {
  margin-top: 20px;
}
.input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
  position: relative;
  .el-input {
    width: 90%;
    display: block;
  }
  .el-textarea {
    width: 90%;
    display: block;
  }
  button {
    position: absolute;
    right: 0;
  }
}
.buttonFunction {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.secretTable {
  button.el-button.el-button--default.is-circle {
    display: block;
    width: 40px;
    height: 40px;
  }
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