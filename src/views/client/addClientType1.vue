<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane name="1">
        <div class="firstStep">
          <div class="input">
            <div class="label">Client Id</div>
            <el-input placeholder="Please input" v-model="addClient.clientId">
            </el-input>
            <el-button type="info" @click="GenerationId"
              ><i class="fas fa-random"></i
            ></el-button>
          </div>
          <div class="input">
            <div class="label">Display Name</div>
            <el-input
              placeholder="Please input"
              v-model="addClient.clientName"
            ></el-input>
          </div>
          <div class="input">
            <div class="label">Display URL</div>
            <el-input
              placeholder="Please input"
              v-model="addClient.clientUri"
            ></el-input>
          </div>
          <div class="input">
            <div class="label">Logo URL <br /></div>
            <el-input
              placeholder="Please input"
              v-model="addClient.logoUri"
            ></el-input>
          </div>
          <div class="input">
            <div class="label">Descriptions</div>
            <el-input
              type="textarea"
              :autosize="{ minRows: 5 }"
              placeholder="Please input"
              v-model="addClient.description"
            >
            </el-input>
          </div>
          <div class="active" style="display: flex">
            <span style="width: 13%; font-weight: bold"
              >Required <br />Consent</span
            >
            <div class="switch-box">
              <label class="switch switch-green">
                <input
                  type="checkbox"
                  class="switch-input"
                  :checked="addClient.requireConsent"
                />
                <span class="switch-label" data-on="On" data-off="Off"></span>
                <span class="switch-handle"></span>
              </label>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane name="2">
        <h3>Enter a callback URL</h3>
        <h5>
          Tokens will be sent to this endpoint (you can configure more after
          setup)
        </h5>
        <div class="input">
          <div class="label">Callback URL</div>
          <el-input
            placeholder="Please input"
            v-model="addClient.redirectUris[0]"
          >
          </el-input>
        </div>
      </el-tab-pane>
      <el-tab-pane name="3">
        <h3>Enter a post-logout URL</h3>
        <h5>Optional (you can configure more after setup)</h5>
        <div class="input">
          <div class="label">Logout URL</div>
          <el-input
            placeholder="Please input"
            v-model="addClient.postLogoutRedirectUris[0]"
          >
          </el-input>
        </div>
      </el-tab-pane>
      <el-tab-pane name="4">
        <h4>Select identity Resources this client can access</h4>
        <el-transfer
          v-model="valueIdentity"
          :data="dataIdentity"
          :titles="['Available', 'Assigned']"
          style="width: 100%"
        >
        </el-transfer>
      </el-tab-pane>
      <el-tab-pane name="5">
        <el-transfer
          v-model="valueProtect"
          :data="dataProtect"
          :titles="['Available', 'Assigned']"
          style="width: 100%"
        >
        </el-transfer>
      </el-tab-pane>
      <el-tab-pane name="6">
        <div class="sixthStep">
          <table style="width: 100%">
            <tr>
              <td class="columnFirst">Client Id</td>
              <td>{{ addClient.clientId }}</td>
            </tr>
            <tr>
              <td class="columnFirst">Display Name</td>
              <td>{{ addClient.clientName }}</td>
            </tr>
            <tr>
              <td class="columnFirst">Display URL</td>
              <td>{{ addClient.clientUri }}</td>
            </tr>
            <tr>
              <td class="columnFirst">Description</td>
              <td>{{ addClient.description }}</td>
            </tr>
            <tr>
              <td class="columnFirst">Logo URL</td>
              <td>{{ addClient.logoUri }}</td>
            </tr>
            <tr>
              <td class="columnFirst">Require Consent</td>
              <td>{{ addClient.requireConsent }}</td>
            </tr>
            <tr>
              <td class="columnFirst">Callback URL</td>
              <td>{{ addClient.redirectUris[0] }}</td>
            </tr>
            <tr>
              <td class="columnFirst">Logout URL</td>
              <td>{{ addClient.postLogoutRedirectUris[0] }}</td>
            </tr>
            <tr>
              <td class="columnFirst">Identity Resourse</td>
              <td>
                {{ valueIdentity.map((e) => dataIdentity[e].label) }}
              </td>
            </tr>
            <tr>
              <td class="columnFirst">Protect Resourse</td>
              <td>
                {{ valueProtect.map((e) => dataProtect[e].label) }}
              </td>
            </tr>
          </table>
        </div>
      </el-tab-pane>
    </el-tabs>
    <span slot="footer" class="dialog-footer">
      <el-button type="success" @click="next(1), addClientClient()">{{
        button
      }}</el-button>
      <el-button type="info" @click="next(-1)">Back</el-button>
    </span>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>