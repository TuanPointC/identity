
<template>
  <div style="margin-bottom: 20px">
    <MenuRoles />
    <div class="container">
      <div class="search">
        <el-input
          placeholder="Seach..."
          v-model="input"
          @keyup.native="search"
        ></el-input>
      </div>

      <div class="changeSizePage-addUser" style="margin-top: 20px">
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
          >Manage Users</el-button
        >
        <el-dialog
          title="Role User Management"
          :visible.sync="dialogVisible"
          width="70%"
          center
        >
          <div class="content" style="display: flex">
            <div class="search-block">
              <p>
                <b>Search all users of {{ getRoles[getPosition].name }}</b>
              </p>
              <el-input
                placeholder="Search..."
                v-model="input1"
                @keyup.native="searchManagement"
              ></el-input>
              <div class="tag">
                <el-tag
                  style="display: block"
                  v-for="(item, index) in filter"
                  :key="index"
                  :type="item.type"
                  :disable-transitions="true"
                  effect="dark"
                  @click="changeTag(index)"
                >
                  <b>{{ item.data.username }}</b>
                  <i> ({{ item.data.email }})</i>
                </el-tag>
              </div>
            </div>
            <div class="result-searching">
              <div class="adding">
                <p>Adding({{ adding.length }})</p>
                <el-tag
                  style="display: block"
                  type="success"
                  v-for="(item, index) in adding"
                  :key="index"
                >
                  <b>{{ item.username }}</b> <i> ({{ item.email }})</i></el-tag
                >
              </div>
              <div class="removing">
                <p>Removing({{ removing.length }})</p>
                <el-tag
                  style="display: block"
                  type="danger"
                  v-for="(item, index) in removing"
                  :key="index"
                  ><b>{{ item.username }}</b> <i> ({{ item.email }})</i></el-tag
                >
              </div>
            </div>
          </div>
          <span
            slot="footer"
            class="dialog-footer"
            style="display: flex; justify-content: space-between"
          >
            <el-button
              type="success"
              @click="
                (dialogVisible = false),
                  changeUsersRoles(),
                  (filter = []),
                  (adding = []),
                  (removing = [])
              "
              >Save</el-button
            >
            <el-button
              @click="
                (dialogVisible = false),
                  (filter = []),
                  (adding = []),
                  (removing = [])
              "
              >Cancel</el-button
            >
          </span>
        </el-dialog>
      </div>

      <div class="tableData" style="margin-top: 20px">
        <el-table :data="usersRolesDataResults" style="width: 100%" stripe>
          <el-table-column label="Username">
            <template slot-scope="scope">
              {{ scope.row.username }}
            </template>
          </el-table-column>
          <el-table-column label="Full Name">
            <template slot-scope="scope">
              {{ scope.row.firstName + " " + scope.row.lastName }}
            </template>
          </el-table-column>
          <el-table-column prop="email" label="Email Address">
          </el-table-column>
          <el-table-column width="100">
            <template slot-scope="scope">
              <el-button circle @click.native="dialogVisible1 = true,subject=scope.row.subject">
                <i class="fas fa-times" style="color: red"></i
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          title="Warning"
          :visible.sync="dialogVisible1"
          width="30%"
          center
        >
          <span>This user will be deleted from the dataset</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible1 = false">Cancel</el-button>
            <el-button type="danger" @click="dialogVisible1 = false,deleteUserFromRole()"
              >Delete</el-button
            >
          </span>
        </el-dialog>
      </div>

      <div class="changeCurrentPage">
        <p>
          Page {{ usersRolesData.currentPage }} of
          {{ usersRolesData.pageCount }} ~
          {{ usersRolesData.totalCount }} results(s) found
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
import MenuRoles from "@/views/roles/menu";
import { RolesModule } from "@/store/modules/roles";
import { getUsers } from "@/api/user";
import { getUsersRoles, edituseraRolesApi ,deleteUserRoles} from "@/api/roles";
export default {
  components: {
    MenuRoles,
  },
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
      dialogVisible1: false,
      input: "",
      input1: "",
      allUsers: [],
      len1: 0,
      usersInRole: [],
      len2: 0,
      filter: [],
      adding: [],
      removing: [],
      subject:'',
    };
  },
  computed: {
    getPosition() {
      return RolesModule.Position;
    },
    getRoles() {
      return RolesModule.GetRoles;
    },
    usersRolesData() {
      return RolesModule.GetUserRoles;
    },
    getUserRolesPageSize() {
      return RolesModule.GetUserRolesPageSize;
    },
    usersRolesDataResults(){
      return RolesModule.GetUserRoles.results;
    }
  },
  async mounted() {
    if (RolesModule.Position < 0) {
      this.$router.push("/Roles");
    } else {
      await RolesModule.getUsersRolesApi();
    }
  },
  methods: {
    changePageSize(e) {
      this.getUserRolesPageSize.pageSize = e;
      RolesModule.getUsersRolesApi();
    },
    changeCurrentPage(e) {
      if (e > 0) {
        if (
          e + this.usersRolesData.currentPage <
          this.usersRolesData.pageCount
        ) {
          this.getUserRolesPageSize.page++;
        } else {
          this.getUserRolesPageSize.page = this.usersRolesData.pageCount;
        }
      } else {
        if (e + this.usersRolesData.currentPage > 1) {
          this.getUserRolesPageSize.page--;
        } else {
          this.getUserRolesPageSize.page = 1;
        }
      }
      RolesModule.getUsersRolesApi();
    },
    search() {
      this.getUserRolesPageSize.q = this.input;
      RolesModule.getUsersRolesApi();
    },

    async searchManagement() {
      if (this.input1.length > 1) {
        this.allUsers = (await getUsers({ q: this.input1 })).results.filter(
          function (e) {
            if (e.isDeleted == false) return e;
          }
        );
        this.usersInRole = await (await getUsersRoles({ q: this.input1 }))
          .results;
        this.len1 = this.allUsers.length;
        this.len2 = this.usersInRole.length;
        this.filter = [];
        this.adding = [];
        this.removing = [];
        for (let i = 0; i < this.allUsers.length; i++) {
          if (
            this.usersInRole
              .map((e) => e.subject)
              .indexOf(this.allUsers[i].subject) > -1
          ) {
            this.filter.push({ data: this.allUsers[i], type: "success" });
          } else {
            this.filter.push({ data: this.allUsers[i], type: "danger" });
          }
        }
      }
    },

    async changeUsersRoles() {
      const data = [];
      for (let i = 0; i < this.adding.length; i++) {
        data.push({
          subject: this.adding[i].subject,
          username: this.adding[i].username,
          addOrRemove: "Add",
        });
      }
      for (let i = 0; i < this.removing.length; i++) {
        data.push({
          subject: this.removing[i].subject,
          username: this.removing[i].username,
          addOrRemove: "Remove",
        });
      }
      await edituseraRolesApi(data);
      setInterval(RolesModule.getUsersRolesApi,500); 
    },
  
    changeTag(e) {
      if (this.filter[e].type == "success") {
        this.filter[e].type = "danger";
        if (
          this.usersInRole
            .map((e) => e.subject)
            .indexOf(this.filter[e].data.subject) != -1
        )
          this.removing.push(this.filter[e].data);
        const position = this.adding
          .map((e) => e.subject)
          .indexOf(this.filter[e].data.subject);
        if (position > -1) {
          this.adding = this.adding
            .slice(0, position)
            .concat(this.adding.slice(position + 1, this.adding.length));
        }
      } else {
        this.filter[e].type = "success";
        if (
          this.usersInRole
            .map((e) => e.subject)
            .indexOf(this.filter[e].data.subject) == -1
        )
          this.adding.push(this.filter[e].data);
        const position = this.removing
          .map((e) => e.subject)
          .indexOf(this.filter[e].data.subject);
        if (position > -1) {
          this.removing = this.removing
            .slice(0, position)
            .concat(this.removing.slice(position + 1, this.removing.length));
        }
      }
    },

    async deleteUserFromRole(){
      await deleteUserRoles(this.subject, [this.getRoles[this.getPosition].name]);
      setInterval(RolesModule.getUsersRolesApi,500); 
    }
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
  .search-block {
    flex-basis: 50%;
    margin-right: 40px;
  }
  .adding {
    margin-bottom: 40px;
  }
  p {
    margin: 10px 0;
  }
  span {
    margin: 5px;
    cursor: pointer;
  }
}
.tag {
    height: 300px;
    overflow-y: scroll;
}
.result-searching {
  flex-basis: 50%;
}
.tableData {
  .cell button {
    display: block;
    width: fit-content;
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