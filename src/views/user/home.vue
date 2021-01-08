<template>
  <div class="container">
    <div class="search">
      <el-input placeholder="Seach..." v-model="input"></el-input>
    </div>
    <div class="button-mode">
      <el-button>Active</el-button>
      <el-button><i class="fas fa-exclamation-triangle"></i> Blocked</el-button>
      <el-button><i class="fas fa-trash-alt"></i> Deleted</el-button>
    </div>
    <div class="changeSizePage-addUser">
      <el-select v-model="value" placeholder="Select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button type="success" @click="dialogVisible = true"
        >Add User</el-button
      >
      <el-dialog
        title="New User"
        :visible.sync="dialogVisible"
        width="60%"
        center
      >
        <div class="input">
          <div class="label">First Name</div>
          <el-input placeholder="Please input"></el-input>
        </div>
        <div class="input">
          <div class="label">Last Name</div>
          <el-input placeholder="Please input"></el-input>
        </div>
        <div class="input">
          <div class="label">Username</div>
          <el-input placeholder="Please input"></el-input>
        </div>
        <div class="input">
          <div class="label">Email Adress</div>
          <el-input placeholder="Please input"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="success" @click="dialogVisible = false"
            >Save</el-button
          >
          <el-button type="success" @click="dialogVisible = false"
            >Save & Configure</el-button
          >
          <el-button type="primary" @click="dialogVisible = false"
            >Save & Add Another</el-button
          >
          <el-button @click="dialogVisible = false">Cancel</el-button>
        </span>
      </el-dialog>
    </div>

    <div class="tableUser" style="margin-top: 20px">
      <el-table :data="tableData" style="width: 100%" stripe>
        <el-table-column prop="date" label="Username"> </el-table-column>
        <el-table-column prop="name" label="Full Name"> </el-table-column>
        <el-table-column prop="address" label="Email Address">
        </el-table-column>
        <el-table-column>
          <el-button circle><i class="fas fa-pencil-alt"></i></el-button
        ></el-table-column>
      </el-table>
    </div>

    <div class="changeCurrentPage">
      <p>Page 1 of 1 ~ 1 results(s) found</p>
      <div class="modeChange">
        <el-button><i class="fas fa-angle-double-left"></i></el-button>
        <el-button><i class="fas fa-chevron-right"></i></el-button>
        <el-button><i class="fas fa-chevron-right"></i></el-button>
        <el-button><i class="fas fa-angle-double-right"></i></el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: "Option1",
          label: "Option1",
        },
        {
          value: "Option2",
          label: "Option2",
        },
        {
          value: "Option3",
          label: "Option3",
        },
        {
          value: "Option4",
          label: "Option4",
        },
        {
          value: "Option5",
          label: "Option5",
        },
      ],
      value: "",
      dialogVisible: false,
      input: "",
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-04",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
      ],
    };
  },
};
</script>

<style lang='scss' scoped>
.search {
  margin: 20px 0 0 0;
}
.button-mode {
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  button {
    width: 33%;
  }
}

.changeSizePage-addUser {
  display: flex;
  justify-content: space-between;
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

.changeCurrentPage {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    font-size: 12px;
    color: rgb(155, 151, 151);
  }
  .modeChange {
    button {
      margin: 0;
      padding: 8px 12px;
      border-radius: 0;
    }
  }
}
</style>