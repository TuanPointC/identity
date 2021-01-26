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
          <div
            class="horizontal"
            :style="{
              width: width + '%',
              background: 'red',
              height: '3px',
              margin: '-25px 0px 10px',
            }"
          ></div>
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
            <el-tab-pane name="2">
              <h3>Enter a callback URL</h3>
              <h5>
                Tokens will be sent to this endpoint (you can configure more
                after setup)
              </h5>
              <div class="input">
                <div class="label">Callback URL</div>
                <el-input
                  placeholder="Please input"
                  v-model="addClient.redirectUris[0]"
                >
                </el-input>
              </div>
            </el-tab-pane>
            <el-tab-pane name="3">
              <h3>Enter a post-logout URL</h3>
              <h5>Optional (you can configure more after setup)</h5>
              <div class="input">
                <div class="label">Logout URL</div>
                <el-input
                  placeholder="Please input"
                  v-model="addClient.postLogoutRedirectUris[0]"
                >
                </el-input>
              </div>
            </el-tab-pane>
            <el-tab-pane name="4">
              <h4>Select identity Resources this client can access</h4>
              <el-transfer
                v-model="valueIdentity"
                :data="dataIdentity"
                :titles="['Available', 'Assigned']"
                style="width: 100%"
              >
              </el-transfer>
            </el-tab-pane>
            <el-tab-pane name="5">
              <el-transfer
                v-model="valueProtect"
                :data="dataProtect"
                :titles="['Available', 'Assigned']"
                style="width: 100%"
              >
              </el-transfer>
            </el-tab-pane>
            <el-tab-pane name="6">
              <div class="sixthStep">
                <table style="width: 100%">
                  <tr>
                    <td class="columnFirst">Client Id</td>
                    <td>{{ addClient.clientId }}</td>
                  </tr>
                  <tr>
                    <td class="columnFirst">Display Name</td>
                    <td>{{ addClient.clientName }}</td>
                  </tr>
                  <tr>
                    <td class="columnFirst">Display URL</td>
                    <td>{{ addClient.clientUri }}</td>
                  </tr>
                  <tr>
                    <td class="columnFirst">Description</td>
                    <td>{{ addClient.description }}</td>
                  </tr>
                  <tr>
                    <td class="columnFirst">Logo URL</td>
                    <td>{{ addClient.logoUri }}</td>
                  </tr>
                  <tr>
                    <td class="columnFirst">Require Consent</td>
                    <td>{{ addClient.requireConsent }}</td>
                  </tr>
                  <tr>
                    <td class="columnFirst">Callback URL</td>
                    <td>{{ addClient.redirectUris[0] }}</td>
                  </tr>
                  <tr>
                    <td class="columnFirst">Logout URL</td>
                    <td>{{ addClient.postLogoutRedirectUris[0] }}</td>
                  </tr>
                  <tr>
                    <td class="columnFirst">Identity Resourse</td>
                    <td>
                      {{ valueIdentity.map((e) => dataIdentity[e].label) }}
                    </td>
                  </tr>
                  <tr>
                    <td class="columnFirst">Protect Resourse</td>
                    <td>
                      {{ valueProtect.map((e) => dataProtect[e].label) }}
                    </td>
                  </tr>
                </table>
              </div>
            </el-tab-pane>
          </el-tabs>
          <span slot="footer" class="dialog-footer">
            <el-button type="success" @click="next(1), addClientClient()">{{
              button
            }}</el-button>
            <el-button type="info" @click="next(-1)">Back</el-button>
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
              <el-button
                circle
                v-if="!scope.row.nonEditable"
                @click="editFunc(scope)"
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
import { getIdentityResources } from "@/api/identityResources";
import { getProtectedResources } from "@/api/protectedResorces";
export default {
  data() {
    return {
      button: "Next",
      width: 16.6667,
      value: "",
      dialogVisible: false,
      input: "",
      activeName: "1",
      addClient: {
        clientType: "BrowserBased",
        clientId: "",
        clientName: "",
        clientUri: "",
        logoUri: "",
        description: "",
        requireConsent: false,
        redirectUris: [""],
        postLogoutRedirectUris: [""],
        allowedScopes: [],
        allowedCorsOrigins: ["http://localhost:5000"],
        clientSecrets: [
          {
            type: "",
            value: "",
            description: "",
            expiration: "",
          },
        ],
      },
      dataIdentity: [],
      valueIdentity: [],
      dataProtect: [],
      valueProtect: [],
    };
  },
  methods: {
    open2() {
      this.$message({
        message: "Congrats, this is a success message.",
        type: "success",
      });
    },
    next(e) {
      if (e > 0) {
        if (parseInt(this.activeName) < 7) {
          this.activeName = (parseInt(this.activeName) + 1).toString();
          this.width += 16.666667;
          if (this.activeName == "6") this.button = "Save";
          else this.button = "Next";
        }
      } else {
        if (parseInt(this.activeName) > 1) {
          this.activeName = (parseInt(this.activeName) - 1).toString();
          this.width -= 16.6667;
          this.button = "Next";
        }
      }
    },
    GenerationId() {
      this.addClient.clientId = uid(25);
    },
    async addClientClient() {
      if (this.activeName == "7") {
        for (let i = 0; i < this.valueIdentity.length; i++) {
          this.addClient.allowedScopes.push(
            this.dataIdentity[this.valueIdentity[i]].label
          );
        }
        for (let i = 0; i < this.valueProtect.length; i++) {
          if (
            this.addClient.allowedScopes.indexOf(
              this.dataProtect[this.valueProtect[i]].label
            ) == -1
          ) {
            this.addClient.allowedScopes.push(
              this.dataProtect[this.valueProtect[i]].label
            );
          }
        }
        await addClientApi(this.addClient);
        await setTimeout(await ClientModule.getClient(""), 1000);
        this.dialogVisible = false;
      }
    },
    async editFunc(e) {
      await ClientModule.changePosition(e.$index);
      this.$router.push("/Clients/details");
    },
  },
  computed: {
    ClientData() {
      return ClientModule.GetClient;
    },
  },
  async mounted() {
    await ClientModule.getClient("");
    const data2 = await getProtectedResources("");
    const data1 = await getIdentityResources("");
    for (let i = 0; i < data1.length; i++) {
      this.dataIdentity.push({
        key: i,
        label: data1[i].name,
      });
    }
    for (let i = 0; i < data2.length; i++) {
      this.dataProtect.push({
        key: i,
        label: data1[i].name,
      });
    }
  },
};
</script>

<style lang='scss' scoped>
td.columnFirst {
  width: 26%;
  color: gray;
  font-weight: bold;
}
table,
tr {
  border: 1px solid rgba(114, 111, 111, 0.048);
  border-collapse: collapse;
}
td {
  padding: 15px;
  text-align: left;
}
tr {
  cursor: pointer;
  &:hover {
    background: rgba(228, 227, 227, 0.432);
  }
}
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
.el-transfer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
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