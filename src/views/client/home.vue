<template>
  <div>
    <div class="container">
      <div class="search">
        <el-input
          placeholder="Seach..."
          v-model="input"
          @keyup.native="search"
        ></el-input>
      </div>

      <div
        class="addRoles"
        style="display: flex; width: fit-content; margin-left: auto"
      >
        <div class="button" style="display: flex; width: fit-content">
          <el-button type="success" @click="dialogVisible = true"
            >Add Client</el-button
          >
          <el-button style="margin: 0 10px"
            ><i class="fas fa-upload"></i
          ></el-button>
        </div>
        <el-button><i class="fas fa-download"></i></el-button>
        <el-dialog
          title="New Cient"
          :visible.sync="dialogVisible"
          width="70%"
          center
        >
          <el-tabs v-model="activeName">
            <el-tab-pane name="1">
              <div class="firstStep">
                <div class="input">
                  <div class="label">Client Id</div>
                  <el-input
                    placeholder="Please input"
                    v-model="addClient.clientId"
                  >
                  </el-input>
                  <el-button type="info" @click="GenerationId"
                    ><i class="fas fa-random"></i
                  ></el-button>
                </div>
                <div class="input">
                  <div class="label">Display Name</div>
                  <el-input
                    placeholder="Please input"
                    v-model="addClient.clientName"
                  ></el-input>
                </div>
                <div class="input">
                  <div class="label">Display URL</div>
                  <el-input
                    placeholder="Please input"
                    v-model="addClient.clientUri"
                  ></el-input>
                </div>
                <div class="input">
                  <div class="label">Logo URL <br /></div>
                  <el-input
                    placeholder="Please input"
                    v-model="addClient.logoUri"
                  ></el-input>
                </div>
                <div class="input">
                  <div class="label">Descriptions</div>
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 5 }"
                    placeholder="Please input"
                    v-model="addClient.description"
                  >
                  </el-input>
                </div>
                <div class="active" style="display: flex">
                  <span style="width: 13%; font-weight: bold"
                    >Required <br />Consent</span
                  >
                  <div class="switch-box">
                    <label class="switch switch-green">
                      <input
                        type="checkbox"
                        class="switch-input"
                        :checked="addClient.requireConsent"
                      />
                      <span
                        class="switch-label"
                        data-on="On"
                        data-off="Off"
                      ></span>
                      <span class="switch-handle"></span>
                    </label>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane name="2">Config</el-tab-pane>
            <el-tab-pane name="3">Role</el-tab-pane>
            <el-tab-pane name="4">Task</el-tab-pane>
          </el-tabs>
          <span
            slot="footer"
            class="dialog-footer"
            style="display: flex; justify-content: space-between"
          >
            <el-button type="success" @click="open2(), next()">Save</el-button>
            <el-button @click="dialogVisible = false">Cancel</el-button>
          </span>
        </el-dialog>
      </div>

      <div class="tableUser" style="margin-top: 20px">
        <el-table :data="ClientData" style="width: 100%" stripe>
          <el-table-column prop="clientName" label="Name" sortable>
          </el-table-column>
          <el-table-column prop="description" label="Description">
          </el-table-column>
          <el-table-column width="150">
            <template slot-scope="scope" style="display: flex">
              <span
                v-if="scope.row.nonEditable"
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
          <el-table-column width="150">
            <template style="display: flex" slot-scope="scope">
              <el-button circle v-if="!scope.row.nonEditable"
                ><i class="fas fa-pencil-alt"></i
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="changeCurrentPage">
        <p style="font-size: 12px; color: #9b9797; margin-top: 20px">
          {{ ClientData.length }} results(s) found
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ClientModule } from "@/store/modules/client";
import { addClientApi } from "@/api/client";
import { uid } from "uid";
export default {
  data() {
    return {
      value: "",
      dialogVisible: false,
      input: "",
      activeName: "1",
      addClient: {
        clientType: "",
        clientId: "",
        clientName: "",
        clientUri: "",
        logoUri: "",
        description: "",
        requireConsent: false,
        redirectUris: [],
        postLogoutRedirectUris: [],
        allowedScopes: [],
        allowedCorsOrigins: [],
        clientSecrets: [
          {
            type: "",
            value: "",
            description: "",
            expiration: "",
          },
        ],
      },
    };
  },
  methods: {
    open2() {
      this.$message({
        message: "Congrats, this is a success message.",
        type: "success",
      });
    },
    next() {
      this.activeName =(parseInt(this.activeName)+1).toString();
     
    },
    GenerationId() {
      this.addClient.clientId = uid(25);
    },
    addClientClient() {
      addClientApi(this.addClient);
    },
  },
  computed: {
    ClientData() {
      return ClientModule.GetClient;
    },
  },
  async mounted() {
    await ClientModule.getClient("");
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
    position: relative;
    input {
      width: 85%;
    }
    .label {
      width: 15%;
      font-weight: bolder;
    }
    button[data-v-10fb620e] {
      position: absolute;
      right: 0;
    }
  }
}

.tableUser {
  button {
    display: block;
    margin-left: auto;
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