<template>
  <div>
    <div class="container">
      <div class="search">
        <el-input placeholder="Seach..." v-model="input"></el-input>
      </div>

      <div
        class="addRoles"
        style="display: flex; width: fit-content; margin-left: auto"
      >
        <div class="button" style="display: flex; width: fit-content">
          <el-button type="success" @click="dialogVisible = true"
            >Add Resource</el-button
          >
        </div>

        <el-dialog
          title="New Identity Resource"
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
                  <div class="label">ID</div>
                  <el-input
                    placeholder="Please input"
                    v-model="addIdentity.name"
                  >
                  </el-input>
                </div>
                <div class="input">
                  <div class="label">Display Name</div>
                  <el-input
                    placeholder="Please input"
                    v-model="addIdentity.displayName"
                  ></el-input>
                </div>
                <div class="input">
                  <div class="label">Descriptions</div>
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 5 }"
                    placeholder="Please input"
                    v-model="addIdentity.description"
                  >
                  </el-input>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane name="2">
              <h4>Select identity Resources this client can access</h4>
              <el-transfer
                v-model="value"
                :data="data"
                :titles="['Available', 'Assigned']"
                style="width: 100%"
                @change="changeClaims"
              >
              </el-transfer>
            </el-tab-pane>
          </el-tabs>
          <span slot="footer" class="dialog-footer">
            <el-button type="success" @click="next(1)">{{ button }}</el-button>
            <el-button type="info" @click="next(-1)">Back</el-button>
          </span>
        </el-dialog>
      </div>

      <div class="tableUser" style="margin-top: 20px">
        <el-table :data="identityData" style="width: 100%" stripe>
          <el-table-column prop="name" label="Name" sortable> </el-table-column>
          <el-table-column prop="id" label="ID"> </el-table-column>
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
          <el-table-column width="70">
            <template style="display: flex" slot-scope="scope">
              <el-button
                circle
                @click="edit(scope)"
                v-if="!scope.row.nonEditable"
                ><i class="fas fa-pencil-alt"></i
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="changeCurrentPage">
        <p style="font-size: 12px; color: #9b9797; margin-top: 20px">
          {{ identityData.length }} results(s) found
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { IdentityModule } from "@/store/modules/resources/identity.ts";
import { ClaimsModule } from "@/store/modules/claim";
import { addIdentityResourcesApi } from "@/api/identityResources";
export default {
  data() {
    return {
      dialogVisible: false,
      input: "",
      isSaveable: false,
      activeName: "1",
      width: 50,
      button: "Next",
      data: [],
      value: [],
      addIdentity: {
        name: "",
        displayName: "",
        description: "",
        allowedClaims: [],
      },
    };
  },
  computed: {
    identityData() {
      return IdentityModule.GetIdentity;
    },
    claimsData() {
      return ClaimsModule.GetClaims;
    },
  },
  methods: {
    open2() {
      this.$message({
        message: "Data has been changed successfully",
        type: "success",
        showClose: "true",
      });
    },
    next(e) {
      if (e > 0) {
        if (parseInt(this.activeName) < 2) {
          this.activeName = (parseInt(this.activeName) + 1).toString();
          this.width += 50;
          if (this.activeName == "2") this.button = "Save";
          else this.button = "Next";
        } else {
          this.addIdentityClient();
        }
      } else {
        if (parseInt(this.activeName) > 1) {
          this.activeName = (parseInt(this.activeName) - 1).toString();
          this.width -= 50;
          this.button = "Next";
        }
      }
    },
    edit(e) {
      this.$router.push("/IdentityResources/details");
      IdentityModule.changePosition(e.$index);
    },
    changeClaims() {
      this.addIdentity.allowedClaims = this.value.map((e) => {
        return this.data[e].label;
      });
    },
    async addIdentityClient() {
      this.dialogVisible = false;
      await addIdentityResourcesApi(this.addIdentity);
      setTimeout(await IdentityModule.getIdentity, 500);
      this.addIdentity.name = "";
      this.addIdentity.displayName = "";
      this.addIdentity.description = "";
      this.addIdentity.allowedClaims = [];
      this.activeName = "1";
    },
  },
  async mounted() {
    await IdentityModule.getIdentity();
    await ClaimsModule.getClaims("");
    for (let i = 0; i < this.claimsData.length; i++) {
      this.data.push({
        key: i,
        label: this.claimsData[i].name,
      });
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