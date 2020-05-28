<template>
  <div>
    <div class="card-container">
      <md-card v-for="(item) in list" v-bind:key="item.id">
        <md-card-header>
          <md-card-header-text>
            <div class="md-title">{{item.name}}</div>
          </md-card-header-text>

          <md-button
            @click="
              (showDialog = true),
                (endpoint = {...item})
            "
            class="md-icon-button md-plain"
          >
            <md-icon>edit</md-icon>
          </md-button>
          <md-dialog-confirm
            :md-active.sync="active"
            md-title="確定要刪除?"
            md-confirm-text="確定"
            md-cancel-text="取消"
            @md-cancel="active = false"
            @md-confirm="deleteEndpoint(item.id)"
          />

          <md-button class="md-icon-button md-plain" @click="active = true">
            <md-icon>delete</md-icon>
          </md-button>
        </md-card-header>

        <md-card-content>
          <p>● Type: {{item.type}}</p>
          <p v-show="item.url">● URL: {{item.url}}</p>
          <p v-show="item.ashost">● ashost: {{item.ashost}}</p>
          <p v-show="item.client">● client: {{item.client}}</p>
          <p v-show="item.sysnr">● sysnr: {{item.sysnr}}</p>
          <p v-show="item.lang">● lang: {{item.lang}}</p>
          <p>● User: {{item.user}}</p>
          <p v-show="item.peekLimit">● peek_limit: {{item.peekLimit}}</p>
          <p v-show="item.poolCapacity">● pool_capacity: {{item.poolCapacity}}</p>
        </md-card-content>
      </md-card>

      <md-speed-dial class="md-bottom-right">
        <md-button
          class="md-fab md-primary"
          @click="
              (showDialog = true),
                (endpoint = {...item})
            "
        >
          <md-icon>add</md-icon>
        </md-button>
      </md-speed-dial>

      <md-dialog-alert
        :md-active.sync="alertVisible"
        :md-content="alertContent"
        md-confirm-text="Close"
      />

      <md-dialog :md-active.sync="showDialog">
        <md-dialog-content class="page-container md-layout-column">
          <md-field md-clearable>
            <label>Name</label>
            <md-input v-model="endpoint.name"></md-input>
          </md-field>

          <md-field>
            <label>Type</label>
            <md-select v-model="endpoint.type" name="type" id="type">
              <md-option
                v-for="(item) in dataBaseTypes"
                v-bind:key="item.id"
                v-model="item.name"
              >{{item.name}}</md-option>
            </md-select>
          </md-field>

          <md-field v-show="endpoint.type != 'SAP - JCO'" md-clearable>
            <label>URL</label>
            <md-input v-model="endpoint.url"></md-input>
          </md-field>

          <md-field v-show="endpoint.type == 'SAP - JCO'" md-clearable>
            <label>ashost</label>
            <md-input v-model="endpoint.ashost"></md-input>
          </md-field>

          <md-field v-show="endpoint.type == 'SAP - JCO'" md-clearable>
            <label>client</label>
            <md-input v-model="endpoint.client"></md-input>
          </md-field>

          <md-field v-show="endpoint.type == 'SAP - JCO'" md-clearable>
            <label>sysnr</label>
            <md-input v-model="endpoint.sysnr"></md-input>
          </md-field>

          <md-field v-show="endpoint.type == 'SAP - JCO'" md-clearable>
            <label>lang</label>
            <md-input v-model="endpoint.lang"></md-input>
          </md-field>

          <md-field v-show="endpoint.type == 'SAP - JCO'" md-clearable>
            <label>peak_limit</label>
            <md-input v-model="endpoint.peakLimit"></md-input>
          </md-field>

          <md-field v-show="endpoint.type == 'SAP - JCO'" md-clearable>
            <label>pool_capacity</label>
            <md-input v-model="endpoint.poolCapacity"></md-input>
          </md-field>

          <md-field md-clearable>
            <label>User</label>
            <md-input v-model="endpoint.user"></md-input>
          </md-field>

          <md-field>
            <label>Password</label>
            <md-input v-model="endpoint.passwd" type="password"></md-input>
          </md-field>

          <md-dialog-actions>
            <md-button
              class="md-primary"
              @click="
          (showDialog = false),
          (saveEndpoint(endpoint))
          "
            >Save</md-button>
            <md-button class="md-primary" @click="showDialog = false">Close</md-button>
          </md-dialog-actions>
        </md-dialog-content>
      </md-dialog>
    </div>
  </div>
</template>



<script>
export default {
  name: "RegularCards",
  data() {
    return {
      list: [],
      endpoint: {},
      dataBaseTypes: [],
      showDialog: false,
      active: false,
      alertContent: "",
      alertVisible: false
    };
  },
  created() {
    this.getEndpoints();
    this.getDataBaseTypes();
  },
  methods: {
    getEndpoints() {
      this.$http({
        method: "post",
        url: "setting/getEndpoints",
        data: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(resp => {
          const respData = resp.data;
          if (respData.returnCode === 1) {
            // 請求成功
            // console.log("respData.data.content = ", respData.data);
            const results = respData.data;
            this.list = [];

            results.forEach(item => {
              let newResult = { ...item };
              this.list.push(newResult);
            });
          } else {
            // 請求失敗
            this.alertContent = "取得列表失敗";
            this.alertVisible = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getDataBaseTypes() {
      this.$http({
        method: "post",
        url: "setting/getDataBaseTypes",
        data: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(resp => {
          const respData = resp.data;
          if (respData.returnCode === 1) {
            // console.log("dataBaseTypes = ", this.dataBaseTypes);
            const results = respData.data;
            this.dataBaseTypes = [];

            results.forEach(item => {
              let newResult = { name: item };
              this.dataBaseTypes.push(newResult);
            });
          } else {
            // 請求失敗
            this.alertContent = "取得列表失敗";
            this.alertVisible = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    saveEndpoint(input) {
      this.$http({
        method: "post",
        url: "setting/saveEndpoint",
        data: JSON.stringify({ ...input }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(resp => {
          const respData = resp.data;
          if (respData.returnCode === 1) {
            this.alertContent = "新增成功";
            this.alertVisible = true;
            this.getEndpoints();
          } else {
            // 請求失敗
            this.alertContent = respData.returnMessage;
            this.alertVisible = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteEndpoint(id) {
      this.$http({
        method: "post",
        url: "setting/deleteEndpoint",
        params: {
          id: id
        },
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(resp => {
          const respData = resp.data;
          if (respData.returnCode === 1) {
            this.alertContent = "刪除成功";
            this.alertVisible = true;
            this.getEndpoints();
          } else {
            // 請求失敗
            this.alertContent = respData.returnMessage;
            this.alertVisible = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>


<style lang="scss" scoped>
.card-container {
  padding: 10px;

  .md-card {
    display: inline-block;
    width: 400px;
    margin: 0 10px 10px 0;
    vertical-align: top;
  }
}

.md-dialog {
  min-width: 500px;
}
</style>

<style lang="scss" scoped>
small {
  display: block;
}
</style>