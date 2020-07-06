<template>
  <div>
    <md-dialog-alert
      :md-active.sync="alert.visible"
      :md-content="alert.content"
      md-confirm-text="Close"
    />
    <md-card>
      <md-card-header>
        <div class="md-title">Batch Endpoint</div>
      </md-card-header>
      <md-card-content>
        <md-field>
          <label>Endpoint</label>
          <md-select v-model="selectedEndpointId" name="type" id="type">
            <md-option
              v-for="(item) in oracleServers"
              v-bind:key="item.id"
              v-model="item.id"
            >{{item.name}}</md-option>
          </md-select>
        </md-field>
      </md-card-content>

      <md-card-actions>
        <md-button
          class="md-dense md-raised md-primary"
          @click="saveBatchLogger(selectedEndpointId)"
        >Save</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>


<script>
export default {
  name: "BatchLogger",
  data() {
    return {
      oracleServers: [],
      selectedEndpointId: "",
      alert: {
        content: "",
        visible: false
      }
    };
  },
  created() {
    this.getOracleServers();
  },
  methods: {
    getOracleServers() {
      this.$http({
        method: "post",
        url: "setting/getOracleServers",
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
            this.oracleServers = [];

            results.forEach(item => {
              let newResult = { ...item };
              this.oracleServers.push(newResult);

              if(item.batchLogger == true){
                this.selectedEndpointId = item.id;
              }
            });
          } else {
            // 請求失敗
            this.alert.content = "取得列表失敗";
            this.alert.visible = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    saveBatchLogger(id) {
      this.$http({
        method: "post",
        url: "setting/saveBatchLogger",
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
            this.alert.content = "更新成功";
            this.alert.visible = true;
            this.getEndpoints();
          } else {
            // 請求失敗
            this.alert.content = respData.returnMessage;
            this.alert.visible = true;
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
.md-card {
  width: 320px;
  margin: 4px;
  // display: inline-block;
  vertical-align: top;
}
</style>