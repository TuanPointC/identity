<template>
  <div>
    <el-button type="success" @click="dialogVisible = true">Add User</el-button>
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
          v-model="AddUser.firstName"
          @keyup.native="checkFillFullInput"
        ></el-input>
      </div>
      <div class="input">
        <div class="label">Last Name</div>
        <el-input
          placeholder="Please input"
          v-model="AddUser.lastName"
          @keyup.native="checkFillFullInput"
        ></el-input>
      </div>
      <div class="input">
        <div class="label">Username</div>
        <el-input
          placeholder="Please input"
          v-model="AddUser.username"
          @keyup.native="checkFillFullInput"
        ></el-input>
      </div>
      <div class="input">
        <div class="label">Email Adress</div>
        <el-input
          placeholder="Please input"
          v-model="AddUser.email"
          @keyup.native="checkFillFullInput"
        ></el-input>
      </div>
      <div class="input">
        <div class="label">Password</div>
        <el-input
          type="password"
          placeholder="Please input"
          v-model="AddUser.password"
          @keyup.native="checkPassword(), checkFillFullInput()"
        ></el-input>
      </div>
      <notification-password-is-not-correct v-show="!passwordIsCorrect" />
      <span slot="footer" class="dialog-footer">
        <el-button
          type="success"
          @click="dialogVisible = false"
          :disabled="!filFullInput"
          >Save</el-button
        >
        <el-button @click="(dialogVisible = false), resetAddUserData()"
          >Cancel</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { AddUserType } from "@/intenties/userTypeData";
import NotificationPasswordIsNotCorrect from "./NotificationPasswordIsNotCorrect.vue";
@Component({
  name: "DialogAddNewUser",
  components: {
    NotificationPasswordIsNotCorrect,
  },
})
export default class extends Vue {
  private dialogVisible = false;
  private filFullInput = false;
  private passwordIsCorrect = true;
  private AddUser: AddUserType = {
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    roles: [],
    claims: [] as {
      type: string;
      value: string;
    }[],
  };
  private checkFillFullInput() {
    if (
      this.AddUser.firstName != "" &&
      this.AddUser.lastName != "" &&
      this.AddUser.email != "" &&
      this.AddUser.username != "" &&
      this.AddUser.password != "" &&
      this.passwordIsCorrect
    ) {
      this.filFullInput = true;
    } else this.filFullInput = false;
  }
  private checkPassword() {
    const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (this.AddUser.password.match(passw)) {
      this.passwordIsCorrect = true;
    } else {
      this.passwordIsCorrect = false;
    }
  }
  private resetAddUserData() {
    this.AddUser.firstName = "";
    this.AddUser.lastName = "";
    this.AddUser.email = "";
    this.AddUser.password = "";
    this.AddUser.username = "";
  }
}
</script>

<style lang='scss' scoped>
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
</style>