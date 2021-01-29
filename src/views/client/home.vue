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

          <!-- <typeAddClient /> -->
          <addClientType2 />
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
//import typeAddClient from "@/views/client/typeAddClient";
import addClientType1 from "@/views/client/addClientType1";
import addClientType2 from "@/views/client/addClientType2";
export default {
  components: {
    //typeAddClient,
    addClientType2,
  },
  data() {
    return {
      dialogVisible: false,
      input: "",
    };
  },
  methods: {
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