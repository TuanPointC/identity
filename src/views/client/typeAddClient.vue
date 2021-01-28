<template>
  <div class="block">
    <div class="typeAdd">
      <el-button type="success" plain @click="type('Single Page App','this is signle page app')"
        ><div class="text">
          <div class="text1" style="text-align: left">
            <h3>Single Page App</h3>
            <span style="color: gray; font-size: 15px; margin-top: 5px"
              >Authorization code flow + PKCE</span
            >
          </div>
        </div>
        <i class="fab fa-chrome"></i
      ></el-button>
      <el-button type="success" plain
      @click="type('Native','this is Native')"
        ><div class="text">
          <div class="text1" style="text-align: left">
            <h3>Native</h3>
            <span style="color: gray; font-size: 15px; margin-top: 5px"
              >Authorization code flow + PKCE</span
            >
          </div>
        </div>
        <i class="fas fa-mobile-alt"></i
      ></el-button>
      <el-button type="success" plain
      @click="type('Device','this is Device')"
        ><div class="text">
          <div class="text1" style="text-align: left">
            <h3>Device</h3>
            <span style="color: gray; font-size: 15px; margin-top: 5px"
              >Device flow using external browser</span
            >
          </div>
        </div>
        <i class="fas fa-wifi"></i
      ></el-button>
      <el-button type="success" plain
      @click="type('Machine','this is Machine')"
        ><div class="text">
          <div class="text1" style="text-align: left">
            <h3>Machine</h3>
            <span style="color: gray; font-size: 15px; margin-top: 5px"
              >Client credentials</span
            >
          </div>
        </div>
        <i class="fas fa-microchip"></i
      ></el-button>
    </div>
    <hr />
    <div class="description">
      <b>{{ description.title }}</b>
      <p>{{ description.content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      description: {
        title: "Machine",
        content:
          "A machine-to-machine of communication. No users are involved in the process. Tokens will be sent via back-channel communication",
      },
    };
  },
  methods:{
      type(e,t){
          this.description.title=e;
          this.description.content=t;
      }
  }
};
</script>

<style  lang="scss" >
.typeAdd {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  button {
    margin-left: 0 !important;
    width: 49%;
    margin: 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 17px;
    padding-left: 12px;
    span {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      //color: rgb(31, 30, 30);

      i.fas.fa-check-square {
        width: 40px;
        height: 40px;
        font-size: 75px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .text {
      display: flex;
      align-items: center;
      i {
        margin-right: 35px;
      }
    }
    i {
      font-size: 35px;
      color: rgba(105, 104, 104, 0.233);
    }
  }
}
hr {
  border-top: none;
  margin: 20px 0;
}
</style>