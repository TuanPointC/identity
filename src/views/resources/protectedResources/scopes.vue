<template>
  <div>
    <MenuProtected />
    <div class="container">
      <div class="addRoles">
        <el-button type="success" @click="dialogVisible = true"
          >Add Scope</el-button
        >
        <el-dialog
          title="New Identity Resource"
          :visible.sync="dialogVisible"
          width="70%"
          center
        >
          <addScopeTemplate v-on:saveClick="saveAddScope" />
        </el-dialog>
      </div>
      <div class="scopesTable">
        <el-collapse v-model="activeNames" accordion>
          <el-collapse-item
            :name="index + 1"
            v-for="(item, index) in scope"
            :key="index"
          >
            <template slot="title">
              <p>{{ item.displayName }}</p>
              <el-button circle><i class="fas fa-pencil-alt"></i></el-button>
            </template>
            <el-radio-group v-model="radio1">
              <el-radio-button label="Details"></el-radio-button>
              <el-radio-button label="Claims"></el-radio-button>
            </el-radio-group>

            <div class="details" v-if="radio1 == 'Details'">
              <div class="input">
                <span> Scope ID</span>
                <el-input type="text" v-model="item.name"></el-input>
              </div>
              <hr />
              <div class="input">
                <span>Display Name</span>
                <el-input v-model="item.displayName"></el-input>
              </div>
              <hr />
              <div class="input">
                <span>Description</span>
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 5 }"
                  v-model="item.description"
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
                      v-model="item.required"
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
              <hr />
              <div class="active" style="display: flex">
                <span style="width: 20%">Show In Discovery Document</span>
                <div class="switch-box">
                  <label class="switch switch-green">
                    <input
                      type="checkbox"
                      class="switch-input"
                      v-model="item.showInDiscoveryDocument"
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
              <hr />
              <div class="active" style="display: flex">
                <span style="width: 20%">Emphasize</span>
                <div class="switch-box">
                  <label class="switch switch-green">
                    <input
                      type="checkbox"
                      class="switch-input"
                      v-model="item.emphasize"
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
              <div class="buttonFunction">
                <el-button type="success" @click="saveEditScope(item), open2()"
                  >Save</el-button
                >
                <el-button
                  type="danger"
                  @click="
                    (centerDialogVisible1 = true), deleteScopesFunc(item.id)
                  "
                  >Delete</el-button
                >
              </div>
            </div>

            <div class="claims" v-if="radio1 == 'Claims'">
              <el-transfer
                v-model="value[index]"
                :data="data"
                :titles="['Available', 'Assigned']"
                @change="open2(), saveTransfer(index)"
              >
              </el-transfer>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="changeCurrentPage">
        <p style="font-size: 12px; color: #9b9797; margin-top: 20px">
          {{ protectedData[position].scopes.length }} results(s) found
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import MenuProtected from "@/views/resources/protectedResources/menu";
import { ProtectedModule } from "@/store/modules/resources/protected";
import { editScopes, deleteScopes } from "@/api/protectedResorces";
import { ClaimsModule } from "@/store/modules/claim";
import addScopeTemplate from "./addScope.vue";

export default {
  components: {
    MenuProtected,
    addScopeTemplate,
  },
  data() {
    return {
      dialogVisible: false,
      activeNames: [],
      radio1: "Details",
      scope: [],
      value: [],
      data: [],
      valueChild: [],
      dataChild: [],
    };
  },
  computed: {
    protectedData() {
      return ProtectedModule.GetProtected;
    },
    position() {
      return ProtectedModule.Position;
    },
    cliamsData() {
      return ClaimsModule.GetClaims;
    },
  },
  methods: {
    rowClick(row) {
      this.$refs["elTable"].toggleRowExpansion(row);
    },
    async saveEditScope(e) {
      await editScopes(e);
    },
    open2() {
      this.$message({
        message: "Data has been changed successfully",
        type: "success",
        showClose: "true",
      });
    },
    saveTransfer(e) {
      this.scope[e].userClaims = [];
      this.value[e].map((k) => {
        this.scope[e].userClaims.push(this.data[k].label);
      });
      editScopes(this.scope[e]);
      setTimeout(ProtectedModule.getProtected, 500);
    },
    async deleteScopesFunc(e) {
      deleteScopes(e);
      setTimeout(ProtectedModule.getProtected, 500);
      setTimeout(() => {
        this.scope = this.protectedData[this.position].scopes;
      }, 800);
      this.activeNames = [];
      this.open2();
    },

    saveAddScope() {
      this.dialogVisible = false;
      setTimeout(ProtectedModule.getProtected, 500);
      setTimeout(() => {
        this.scope = this.protectedData[this.position].scopes;
      }, 800);
      this.activeNames = [];
      this.open2();
    },
  },
  async mounted() {
    if (this.position < 0) {
      this.$router.push("/ProtectedResources");
    } else {
      ProtectedModule.getProtected();
      this.scope = this.protectedData[this.position].scopes;
      await ClaimsModule.getClaims();
      for (let i = 0; i < this.cliamsData.length; i++) {
        this.data.push({
          key: i,
          label: this.cliamsData[i].name,
        });
      }
      const v = this.data.map((e) => e.label);
      const t = [];
      for (let i = 0; i < this.scope.length; i++) {
        for (let j = 0; j < this.scope[i].userClaims.length; j++) {
          t.push(v.indexOf(this.scope[i].userClaims[j]));
        }
        this.value.push(t);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.addRoles {
  margin: 20px 0;
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
</style>