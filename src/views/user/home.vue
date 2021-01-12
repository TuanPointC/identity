<template>
  <div style="margin-bottom: 20px">
    <div class="container">
      <div class="search">
        <el-input
          placeholder="Seach..."
          v-model="input"
          @keyup.native="search"
        ></el-input>
      </div>
      <div class="button-mode">
        <el-button @click="changeState('active')">Active</el-button>
        <el-button @click="changeState('blocked')"
          ><i class="fas fa-exclamation-triangle"></i> Blocked</el-button
        >
        <el-button @click="changeState('deleted')"
          ><i class="fas fa-trash-alt"></i> Deleted</el-button
        >
      </div>
      <div class="changeSizePage-addUser">
        <el-select
          v-model="value"
          placeholder="5 per page"
          @change="changePageSize(value)"
        >
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
            <el-input
              placeholder="Please input"
              v-model="addUserData.firstName"
              @keyup.native="checkFillFullInput"
            ></el-input>
          </div>
          <div class="input">
            <div class="label">Last Name</div>
            <el-input
              placeholder="Please input"
              v-model="addUserData.lastName"
              @keyup.native="checkFillFullInput"
            ></el-input>
          </div>
          <div class="input">
            <div class="label">Username</div>
            <el-input
              placeholder="Please input"
              v-model="addUserData.username"
              @keyup.native="checkFillFullInput"
            ></el-input>
          </div>
          <div class="input">
            <div class="label">Email Adress</div>
            <el-input
              placeholder="Please input"
              v-model="addUserData.email"
              @keyup.native="checkFillFullInput"
            ></el-input>
          </div>
          <div class="input">
            <div class="label">Password</div>
            <el-input
              type="password"
              placeholder="Please input"
              v-model="addUserData.password"
              @keyup.native="checkPassword(), checkFillFullInput()"
            ></el-input>
          </div>
          <span
            v-show="!addUser.passwordIsCorrect"
            style="color: red; width: 85%; display: block; margin-left: auto"
          >
            Password must have from 6 to 20 characters which contain at least
            one numeric digit, one uppercase and one lowercase letter</span
          >
          <span slot="footer" class="dialog-footer">
            <el-button
              type="success"
              @click="(dialogVisible = false), addUserRequest()"
              :disabled="!addUser.filFullInput"
              >Save</el-button
            >
            <el-button
              type="success"
              @click="dialogVisible = false"
              :disabled="!addUser.filFullInput"
              >Save & Configure</el-button
            >
            <el-button
              type="primary"
              @click="dialogVisible = false"
              :disabled="!addUser.filFullInput"
              >Save & Add Another</el-button
            >
            <el-button @click="(dialogVisible = false), resetAddUserData()"
              >Cancel</el-button
            >
          </span>
        </el-dialog>
      </div>

      <div class="tableUser" style="margin-top: 20px">
        <el-table :data="GetUser.results" style="width: 100%" stripe>
          <el-table-column prop="username" label="Username"> </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              {{ scope.row.firstName + " " + scope.row.lastName }}
            </template>
          </el-table-column>
          <el-table-column prop="email" label="Email Address">
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <router-link to="/Users/details">
                <el-button circle @click="editData(scope)"
                  ><i class="fas fa-pencil-alt"></i></el-button
              ></router-link>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="changeCurrentPage">
        <p>
          Page {{ GetUser.currentPage }} of {{ GetUser.pageCount }} ~
          {{ GetUser.totalCount }} results(s) found
        </p>
        <div class="modeChange">
          <el-button @click="changeCurrentPage(-10000)"
            ><i class="fas fa-angle-double-left"></i
          ></el-button>
          <el-button @click="changeCurrentPage(-1)"
            ><i class="fas fa-chevron-left"></i
          ></el-button>
          <el-button @click="changeCurrentPage(1)"
            ><i class="fas fa-chevron-right"></i
          ></el-button>
          <el-button @click="changeCurrentPage(10000)"
            ><i class="fas fa-angle-double-right"></i
          ></el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { UserModule } from "@/store/modules/user";
import { addUserApi } from "@/api/user";
export default {
  data() {
    return {
      options: [
        {
          value: "5",
          label: "5 per page",
        },
        {
          value: "10",
          label: "10 per page",
        },
        {
          value: "15",
          label: "15 per page",
        },
        {
          value: "20",
          label: "20 per page",
        },
        {
          value: "25",
          label: "25 per page",
        },
      ],
      value: "",
      dialogVisible: false,
      input: "",
      addUser: {
        passwordIsCorrect: true,
        filFullInput: false,
      },
    };
  },
  computed: {
    GetUser() {
      return UserModule.GetUser;
    },
    RequestGetUser() {
      return UserModule.RequestGetUser;
    },
    addUserData() {
      return UserModule.AddUser;
    },
    GetPositionEditUser(){
      return UserModule.EditPosition;
    }
  },

  methods: {
    changePageSize(e) {
      this.RequestGetUser.pageSize = e;
      this.RequestGetUser.page = 1;
      UserModule.getuserapi();
    },
    changeCurrentPage(e) {
      if (e > 0) {
        if (e + this.GetUser.currentPage < this.GetUser.pageCount) {
          this.RequestGetUser.page++;
        } else {
          this.RequestGetUser.page = this.GetUser.pageCount;
        }
      } else {
        if (e + this.GetUser.currentPage > 1) {
          this.RequestGetUser.page--;
        } else {
          this.RequestGetUser.page = 1;
        }
      }
      UserModule.getuserapi();
    },
    changeState(e) {
      this.RequestGetUser.state = e;
      this.RequestGetUser.page = 1;
      UserModule.getuserapi();
    },
    search() {
      this.RequestGetUser.q = this.input;
      setTimeout(UserModule.getuserapi(), 5000);
    },
    checkPassword() {
      const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      if (this.addUserData.password.match(passw)) {
        this.addUser.passwordIsCorrect = true;
      } else {
        this.addUser.passwordIsCorrect = false;
      }
    },
    checkFillFullInput() {
      if (
        this.addUserData.firstName != "" &&
        this.addUserData.lastName != "" &&
        this.addUserData.email != "" &&
        this.addUserData.username != "" &&
        this.addUserData.password != "" &&
        this.addUser.passwordIsCorrect
      ) {
        this.addUser.filFullInput = true;
      } else this.addUser.filFullInput = false;
    },
    resetAddUserData() {
      this.addUserData.firstName = "";
      this.addUserData.lastName = "";
      this.addUserData.email = "";
      this.addUserData.password = "";
      this.addUserData.username = "";
    },
    async addUserRequest() {
      await addUserApi();
      this.resetAddUserData();
    },
   async editData(e) {
      UserModule.changeEditPosition(e.$index);
    },
  },

  async mounted() {
    await UserModule.getuserapi();
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 75px;
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