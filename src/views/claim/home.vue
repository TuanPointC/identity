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

      <div class="addRoles">
        <el-button type="success" @click="dialogVisible = true"
          >Add Claim Type</el-button
        >
        <el-dialog
          title="New Claim"
          :visible.sync="dialogVisible"
          width="70%"
          center
        >
          <div class="input">
            <div class="label">Name</div>
            <el-input
              placeholder="Please input"
              v-model="addClaims.name"
              @keyup.native="checkFillFullInput"
            ></el-input>
          </div>
          <div class="input">
            <div class="label">Value Type</div>
            <el-input
              placeholder="Please input"
              v-model="addClaims.valueType"
              @keyup.native="checkFillFullInput"
            ></el-input>
          </div>
          <div class="input">
            <div class="label">Rule</div>
            <el-input
              placeholder="Please input"
              v-model="addClaims.rule"
              @keyup.native="checkFillFullInput"
            ></el-input>
          </div>
          <div class="input">
            <div class="label">Rule Validation <br />Failure Description</div>
            <el-input
              placeholder="Please input"
              v-model="addClaims.ruleValidationFailureDescription"
              @keyup.native="checkFillFullInput"
            ></el-input>
          </div>
          <div class="input">
            <div class="label">Descriptions</div>
            <el-input
              type="textarea"
              :autosize="{ minRows: 5 }"
              placeholder="Please input"
              v-model="addClaims.description"
              @keyup.native="checkFillFullInput"
            >
            </el-input>
          </div>
          <div class="active" style="display: flex">
            <span style="width: 13%; font-weight: bold">Required</span>
            <div class="switch-box">
              <label class="switch switch-green">
                <input
                  type="checkbox"
                  class="switch-input"
                  v-model="addClaims.required"
                />
                <span class="switch-label" data-on="On" data-off="Off"></span>
                <span class="switch-handle"></span>
              </label>
            </div>
          </div>
          <div class="active" style="display: flex; margin-top: 20px">
            <span style="width: 13%; font-weight: bold">User Editable</span>
            <div class="switch-box">
              <label class="switch switch-green">
                <input
                  type="checkbox"
                  class="switch-input"
                  v-model="addClaims.userEditable"
                />
                <span class="switch-label" data-on="On" data-off="Off"></span>
                <span class="switch-handle"></span>
              </label>
            </div>
          </div>
          <span
            slot="footer"
            class="dialog-footer"
            style="display: flex; justify-content: space-between"
          >
            <el-button
              type="success"
              @click="(dialogVisible = false), open2(), addClaimCient()"
              :disabled="!isSaveable"
              >Save</el-button
            >
            <el-button @click="dialogVisible = false">Cancel</el-button>
          </span>
        </el-dialog>
      </div>

      <div class="tableUser" style="margin-top: 20px">
        <el-table :data="claimsData" style="width: 100%" stripe>
          <el-table-column prop="name" label="Name" sortable> </el-table-column>
          <el-table-column label="Type" sortable>
            <template slot-scope="scope">
              <el-tag type="warning" size="small">{{
                scope.row.valueType
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="description" label="Description">
          </el-table-column>
          <el-table-column label="Required" sortable align="center" width="120">
            <template slot-scope="scope">
              <i class="fas fa-times" v-if="!scope.row.required"></i>
              <i class="far fa-check-circle" v-if="scope.row.required"></i>
            </template>
          </el-table-column>
          <el-table-column
            label="User Editable"
            sortable
            align="center"
            width="150"
          >
            <template slot-scope="scope">
              <i class="fas fa-times" v-if="!scope.row.required"></i>
              <i class="far fa-check-circle" v-if="scope.row.required"></i>
            </template>
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
          <el-table-column width="70">
            <template style="display: flex" slot-scope="scope">
              <el-button circle @click="editClaim(scope)"
                ><i class="fas fa-pencil-alt"></i
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="changeCurrentPage">
        <p style="font-size: 12px; color: #9b9797; margin-top: 20px">
          {{ claimsData.length }} results(s) found
        </p>
      </div>
    </div>
  </div>
</template>

<script >
import { ClaimsModule } from "@/store/modules/claim";
import { addClaimsApi } from "@/api/claim";

export default {
  data() {
    return {
      value: "",
      dialogVisible: false,
      input: "",
      isSaveable: false,
    };
  },
  computed: {
    claimsData() {
      return ClaimsModule.GetClaims;
    },
    addClaims() {
      return ClaimsModule.AddClaims;
    },
  },
  methods: {
    open2() {
      this.$message({
        message: "Congrats, this is a success message.",
        type: "success",
      });
    },

    async addClaimCient() {
      await addClaimsApi();
      setTimeout(ClaimsModule.getClaims, 500);
      ClaimsModule.resetAddClaims();
    },

    search() {
      ClaimsModule.getClaims(this.input);
    },

    checkFillFullInput() {
      if (
        this.addClaims.name != "" &&
        this.addClaims.ruleValidationFailureDescription != "" &&
        this.addClaims.valueType != "" &&
        this.addClaims.description != ""
      ) {
        this.isSaveable = true;
      } else {
        this.isSaveable = false;
      }
    },

    async editClaim(e) {
      await ClaimsModule.changePosition(e.$index);
      this.$router.push("/ClaimTypes/details");
    },
  },
  async mounted() {
    await ClaimsModule.getClaims("");
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