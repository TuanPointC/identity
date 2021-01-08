<template>
  <div>
    <div class="top">
      <div class="container">
        <span>Home</span>
        <h1>Roles</h1>
      </div>
    </div>
    <div class="container">
      <div class="search">
        <el-input placeholder="Seach..." v-model="input"></el-input>
      </div>

      <div class="addRoles">
        <el-button type="success" @click="dialogVisible = true"
          >Add User</el-button
        >
        <el-dialog
          title="New Role"
          :visible.sync="dialogVisible"
          width="60%"
          center
        >
          <div class="input">
            <div class="label">First Name</div>
            <el-input placeholder="Please input"></el-input>
          </div>
          <div class="input">
            <div class="label">Descriptions</div>
            <el-input
              type="textarea"
              :autosize="{ minRows: 5 }"
              placeholder="Please input"
            >
            </el-input>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="success" @click="dialogVisible = false"
              >Save</el-button
            >
            <el-button type="success" @click="dialogVisible = false"
              >Save & Configure</el-button
            >
            <el-button @click="dialogVisible = false">Cancel</el-button>
          </span>
        </el-dialog>
      </div>

      <div class="tableUser" style="margin-top: 20px">
        <el-table :data="tableData" style="width: 100%" stripe>
          <el-table-column prop="date" label="Username"> </el-table-column>
          <el-table-column prop="name" label="Description"> </el-table-column>
          <el-table-column width="100">
            <el-button circle><i class="fas fa-pencil-alt"></i></el-button>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      dialogVisible: false,
      input: "",
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
        },
        {
          date: "2016-05-02",
          name: "Tom",
        },
        {
          date: "2016-05-04",
          name: "Tom",
        },
        {
          date: "2016-05-01",
          name: "Tom",
        },
      ],
    };
  },
};
</script>

<style lang='scss' scoped>
.top {
  padding: 10px 0;
  background: #ecf0f1;
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
</style>