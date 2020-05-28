<template>
  <div class="card-container">
    <md-card v-for="(node) in dataNodeList" v-bind:key="node.id">
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">{{node.name}}</div>
        </md-card-header-text>
      </md-card-header>

      <md-card-content>
        <p v-show="node.address">{{node.address}}</p>
        <p v-show="node.id">{{node.id}}</p>
        <p>Active: {{node.active}} / {{node.maxActive}}</p>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
export default {
  name: "Nodes",
  data() {
    return {
      dataNodeList: []
    };
  },
  created() {
    this.getNodeList();
  },
  methods: {
    getNodeList() {
      this.$http({
        method: "post",
        url: "dashboard/getNodes",
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
            this.dataNodeList = [];
            this.$nextTick(() => {
              results.forEach(element => {
                this.dataNodeList.push({ ...element });
              });
            });
          } else {
            // 請求失敗
            this.alertContent = "取得紀錄詳情失敗";
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
    width: 280px;
    margin: 0 10px 10px 0;
    vertical-align: top;
  }
}
</style>
