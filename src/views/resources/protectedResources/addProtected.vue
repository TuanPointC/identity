<template>
  <div>
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
            <el-input placeholder="Please input" v-model="protectedData.name">
            </el-input>
          </div>
          <div class="input">
            <div class="label">Display Name</div>
            <el-input
              placeholder="Please input"
              v-model="protectedData.displayName"
            ></el-input>
          </div>
          <div class="input">
            <div class="label">Descriptions</div>
            <el-input
              type="textarea"
              :autosize="{ minRows: 5 }"
              placeholder="Please input"
              v-model="protectedData.description"
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
        >
        </el-transfer>
      </el-tab-pane>
    </el-tabs>
    <span slot="footer" class="dialog-footer">
      <el-button type="success" @click="next(1)">{{ button }}</el-button>
      <el-button type="info" @click="next(-1)">Back</el-button>
    </span>
  </div>
</template>

<script>
import { ClaimsModule } from "@/store/modules/claim";
import { ProtectedModule } from "@/store/modules/resources/protected";
import { addProtectedResourceApi } from "@/api/protectedResorces";
export default {
  data() {
    return {
      button: "Next",
      activeName: "1",
      width: 50,
      protectedData: {
        name: "",
        displayName: "",
        description: "",
        allowedClaims: [],
      },
      data: [],
      value: [],
    };
  },
  computed: {
    claimsData() {
      return ClaimsModule.GetClaims;
    },
  },
  methods: {
    next(e) {
      if (e > 0) {
        if (parseInt(this.activeName) < 2) {
          this.activeName = (parseInt(this.activeName) + 1).toString();
          this.width += 50;
          if (this.activeName == "2") this.button = "Save";
          else this.button = "Next";
        } else {
          this.save();
        }
      } else {
        if (parseInt(this.activeName) > 1) {
          this.activeName = (parseInt(this.activeName) - 1).toString();
          this.width -= 50;
          this.button = "Next";
        }
      }
    },
    save() {
      this.protectedData.allowedClaims = this.value.map((e) => {
        return this.data[e].label;
      });
      addProtectedResourceApi(this.protectedData);
      setTimeout(ProtectedModule.getProtected, 500);
      this.$emit("saveClick");
      this.protectedData.name = "";
      this.protectedData.displayName = "";
      this.protectedData.description = "";
      this.protectedData.allowedClaims = [];
      this.activeName = "1";
    },
  },
  async mounted() {
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

<style lang="scss" scoped>
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
</style>