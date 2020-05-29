<template>
  <div>
    <md-card>
      <md-card-header>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">異常</h1>
        </div>
      </md-card-header>
      <md-card-content>
        <md-table>
          <md-table-row>
            <md-table-head md-numeric>#</md-table-head>
            <md-table-head>Name</md-table-head>
            <md-table-head>Description</md-table-head>
            <md-table-head>Start Time</md-table-head>
            <md-table-head>End Time</md-table-head>
            <md-table-head>Status</md-table-head>
            <md-table-head>Details</md-table-head>
          </md-table-row>
          <md-table-row v-for="(item, index) in dataErrorJobLogList" v-bind:key="item.jobId">
            <md-table-cell md-numeric>{{ index + 1 }}</md-table-cell>
            <md-table-cell>{{ item.name }}</md-table-cell>
            <md-table-cell>{{ item.description }}</md-table-cell>
            <md-table-cell>{{ item.startTime }}</md-table-cell>
            <md-table-cell>{{ item.endTime }}</md-table-cell>
            <md-table-cell>{{ item.status }}</md-table-cell>
            <md-table-cell>
              <md-button
                @click="
                  onJobLogDetailButtonClick(item) 
                "
              >
                <md-icon>details</md-icon>
              </md-button>
            </md-table-cell>
          </md-table-row>
        </md-table>
        <Pagination
          @pagination-page-current="getErrorJobLogCurrentPage"
          :total="dataErrorJobLogTotal"
          :pageTotal="dataErrorJobLogPageTotal"
          :current="dataErrorJobLogPagination.page"
          :visible="dataErrorJobLogPagination.visible"
        ></Pagination>
      </md-card-content>
    </md-card>

    <md-card>
      <md-card-header>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">已完成</h1>
        </div>
      </md-card-header>
      <md-card-content>
        <md-table>
          <md-table-row>
            <md-table-head md-numeric>#</md-table-head>
            <md-table-head>Name</md-table-head>
            <md-table-head>Description</md-table-head>
            <md-table-head>Start Time</md-table-head>
            <md-table-head>End Time</md-table-head>
            <md-table-head>Status</md-table-head>
            <md-table-head>Details</md-table-head>
          </md-table-row>
          <md-table-row v-for="(item, index) in dataDoneJobLogList" v-bind:key="item.jobId">
            <md-table-cell md-numeric>{{ index + 1 }}</md-table-cell>
            <md-table-cell>{{ item.name }}</md-table-cell>
            <md-table-cell>{{ item.description }}</md-table-cell>
            <md-table-cell>{{ item.startTime }}</md-table-cell>
            <md-table-cell>{{ item.endTime }}</md-table-cell>
            <md-table-cell>{{ item.status }}</md-table-cell>
            <md-table-cell>
              <md-button
                @click="onJobLogDetailButtonClick(item)
                  
                "
              >
                <md-icon>details</md-icon>
              </md-button>
            </md-table-cell>
          </md-table-row>
        </md-table>
        <Pagination
          @pagination-page-current="getDoneJobLogCurrentPage"
          :total="dataDoneJobLogTotal"
          :pageTotal="dataDoneJobLogPageTotal"
          :current="dataDoneJobLogPagination.page"
          :visible="dataDoneJobLogPagination.visible"
        ></Pagination>
      </md-card-content>
    </md-card>

    <md-dialog :md-active.sync="showDialog">
      <div class="page-container md-layout-column">
        <md-toolbar class="md-transparent" md-elevation="0">
          <md-button class="md-icon-button" @click="showNavigation = true">
            <md-icon>menu</md-icon>
          </md-button>
          <span class="md-title">Sync Log</span>
        </md-toolbar>

        <md-drawer :md-active.sync="showNavigation" md-swipeable>
          <md-toolbar class="md-transparent" md-elevation="0">
            <span class="md-title">History</span>
          </md-toolbar>
          <md-list>
            <md-list-item
              v-for="item in dataJobLog.recentLogs"
              v-bind:key="item.jobLogId"
              @click="(showNavigation = false), getJobLogDetail(item)"
            >
              <span class="md-list-item-text">{{ item.jobLogId }}</span>
            </md-list-item>
          </md-list>
        </md-drawer>

        <md-content class="dialog-content">
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-50">
              <md-field>
                <label>Log ID</label>
                <md-input v-model="dataJobLogDetail.jobLogId" :disabled="true"></md-input>
              </md-field>
              <md-field>
                <label>Status</label>
                <md-input v-model="dataJobLogDetail.status" :disabled="true"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-size-50">
              <md-field>
                <label>Start Time</label>
                <md-input v-model="dataJobLogDetail.startTime" :disabled="true"></md-input>
              </md-field>
              <md-field>
                <label>End Time</label>
                <md-input v-model="dataJobLogDetail.endTime" :disabled="true"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-size-100">
              <md-field>
                <label>Parameter</label>
                <md-textarea v-model="dataJobLogDetail.parameter" :disabled="true"></md-textarea>
              </md-field>
              <span class="md-subheading">Log</span>
              <md-content class="md-scrollbar">
                <span
                  v-for="(line, index) in dataJobLogDetail.message"
                  v-bind:key="index"
                  v-bind:class="{ 'text-danger': line.type == 1 }"
                >>{{ line.content }}</span>
              </md-content>
            </div>
          </div>
        </md-content>
      </div>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/common/BasePagination";
export default {
  name: "Last24hours",
  components: {
    Pagination
  },
  data() {
    return {
      dataErrorJobLogList: [],
      dataErrorJobLogTotal: -1, // 紀錄總數
      dataErrorJobLogPageTotal: -1, // 紀錄總頁數
      dataErrorJobLogPagination: {
        page: 1, // 所在頁碼
        visible: true // 是否顯示分頁
      },

      dataDoneJobLogList: [],
      dataDoneJobLogTotal: -1, // 紀錄總數
      dataDoneJobLogPageTotal: -1, // 紀錄總頁數
      dataDoneJobLogPagination: {
        page: 1, // 所在頁碼
        visible: true // 是否顯示分頁
      },

      dataJobLog: {},
      dataJobLogDetail: {},
      showDialog: false,
      showNavigation: false,
      showSidepanel: false
    };
  },
  created() {
    this.getErrorJobLogList();
    this.getDoneJobLogList();
  },
  methods: {
    onJobLogDetailButtonClick(item) {
      this.dataJobLog = item;
      this.getJobLogDetail(item.recentLogs[0]);
      this.showNavigation = false;
      this.showDialog = true;
    },
    getErrorJobLogCurrentPage(value) {
      this.dataErrorJobLogPagination.page = value;
      this.getErrorJobLogList();
    },
    getErrorJobLogList() {
      this.$http({
        method: "post",
        url: "report/getJobReportPage",
        data: JSON.stringify({
          status: "error",
          pageIndx: this.dataErrorJobLogPagination.page,
          pageSize: 10
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(resp => {
          const respData = resp.data;
          if (respData.returnCode === 1) {
            // 請求成功
            // console.log("respData.data.content = ", respData.data.content);
            const results = respData.data.content;
            this.dataErrorJobLogList = [];

            this.$nextTick(() => {
              this.dataErrorJobLogTotal = respData.data.totalElements;

              if (this.dataErrorJobLogTotal > 0) {
                this.dataErrorJobLogPageTotal = respData.data.totalPage;

                results.forEach(item => {
                  let newResult = { ...item };
                  this.dataErrorJobLogList.push(newResult);
                });

                this.dataErrorJobLogPagination.visible = true;
              }
            });
          } else {
            // 請求失敗
            this.alertContent = "取得紀錄列表失敗";
            this.alertVisible = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getDoneJobLogCurrentPage(value) {
      this.dataDoneJobLogPagination.page = value;
      this.getDoneJobLogLList();
    },
    getDoneJobLogList() {
      this.$http({
        method: "post",
        url: "report/getJobReportPage",
        data: JSON.stringify({
          status: "done",
          pageIndx: this.dataDoneJobLogPagination.page,
          pageSize: 10
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(resp => {
          const respData = resp.data;
          if (respData.returnCode === 1) {
            // 請求成功
            // console.log("respData.data.content = ", respData.data.content);
            const results = respData.data.content;
            this.dataDoneJobLogList = [];

            this.$nextTick(() => {
              this.dataDoneJobLogTotal = respData.data.totalElements;

              if (this.dataDoneJobLogTotal > 0) {
                this.dataDoneJobLogPageTotal = respData.data.totalPage;

                results.forEach(item => {
                  let newResult = { ...item };
                  this.dataDoneJobLogList.push(newResult);
                });

                this.dataDoneJobLogPagination.visible = true;
              }
            });
          } else {
            // 請求失敗
            this.alertContent = "取得紀錄列表失敗";
            this.alertVisible = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getJobLogDetail(item) {
      if (item == undefined) {
        return;
      }
      this.$http({
        method: "post",
        url: "report/getJobReportLog",
        params: {
          jobLogId: item.jobLogId
        },
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(resp => {
          const respData = resp.data;
          if (respData.returnCode === 1) {
            // 請求成功
            // console.log("respData.data.content = ", respData.data);
            this.$nextTick(() => {
              this.dataJobLogDetail = { ...respData.data };
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
.white-space {
  white-space: pre-wrap;
}

.text-danger {
  color: red;
}

.dialog-content {
  height: 500px;
  padding: $padding;
  overflow: auto;

  .md-scrollbar {
    display: inline-grid;
    padding: $padding;
  }
}

.md-card {
  margin: 10px;
}
</style>
