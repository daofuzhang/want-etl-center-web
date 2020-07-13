<template>
  <div>
    <md-card>
      <md-card-header>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Running</h1>
        </div>
      </md-card-header>
      <md-card-content>
        <md-table>
          <md-table-row>
            <md-table-head md-numeric>#</md-table-head>
            <md-table-head>Name</md-table-head>
            <md-table-head>Start Time</md-table-head>
            <md-table-head>End Time</md-table-head>
            <md-table-head>Duration</md-table-head>
            <md-table-head>Status</md-table-head>
            <md-table-head>Action</md-table-head>
          </md-table-row>
          <md-table-row
            v-for="(item, index) in dataRunningJobLogList"
            v-bind:key="item.jobId"
          >
            <md-table-cell md-numeric>{{ index + 1 }}</md-table-cell>
            <md-table-cell>{{ item.name }}</md-table-cell>
            <md-table-cell>{{ item.startTime }}</md-table-cell>
            <md-table-cell>{{ item.endTime }}</md-table-cell>
            <md-table-cell
              ><span class="text-duration">{{
                item.duration
              }}</span></md-table-cell
            >
            <md-table-cell
              ><span
                v-bind:class="{
                  'text-running  ': item.status == 'running',
                  'text-warning': item.status == 'interrupt',
                  'text-danger': item.status == 'error',
                }"
                >{{ item.status }}</span
              ></md-table-cell
            >
            <md-table-cell>
              <md-button
                class="md-icon-button"
                @click="onJobLogDetailButtonClick(item)"
              >
                <md-icon>details</md-icon>
              </md-button>
              <md-button
                class="md-icon-button"
                @click="onJobStopButtonClick(item)"
              >
                <md-icon>stop</md-icon>
              </md-button>
            </md-table-cell>
          </md-table-row>
        </md-table>
        <Pagination
          @pagination-page-current="getRunningJobLogCurrentPage"
          :total="dataRunningJobLogTotal"
          :pageTotal="dataRunningJobLogPageTotal"
          :current="dataRunningJobLogPagination.page"
          :visible="dataRunningJobLogPagination.visible"
        ></Pagination>
      </md-card-content>
    </md-card>

    <md-card>
      <md-card-header>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Error</h1>
        </div>
      </md-card-header>
      <md-card-content>
        <md-table>
          <md-table-row>
            <md-table-head md-numeric>#</md-table-head>
            <md-table-head>Name</md-table-head>
            <md-table-head>Start Time</md-table-head>
            <md-table-head>End Time</md-table-head>
            <md-table-head>Duration</md-table-head>
            <md-table-head>Status</md-table-head>
            <md-table-head>Action</md-table-head>
          </md-table-row>
          <md-table-row
            v-for="(item, index) in dataErrorJobLogList"
            v-bind:key="item.jobId"
          >
            <md-table-cell md-numeric>{{ index + 1 }}</md-table-cell>
            <md-table-cell>{{ item.name }}</md-table-cell>
            <md-table-cell>{{ item.startTime }}</md-table-cell>
            <md-table-cell>{{ item.endTime }}</md-table-cell>
            <md-table-cell
              ><span class="text-duration">{{
                item.duration
              }}</span></md-table-cell
            >
            <md-table-cell
              ><span
                v-bind:class="{
                  'text-running  ': item.status == 'running',
                  'text-warning': item.status == 'interrupt',
                  'text-danger': item.status == 'error',
                }"
                >{{ item.status }}</span
              ></md-table-cell
            >
            <md-table-cell>
              <md-button
                class="md-icon-button"
                @click="onJobLogDetailButtonClick(item)"
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
          <h1 class="md-title">Done</h1>
        </div>
      </md-card-header>
      <md-card-content>
        <md-table>
          <md-table-row>
            <md-table-head md-numeric>#</md-table-head>
            <md-table-head>Name</md-table-head>
            <md-table-head>Start Time</md-table-head>
            <md-table-head>End Time</md-table-head>
            <md-table-head>Duration</md-table-head>
            <md-table-head>Status</md-table-head>
            <md-table-head>Action</md-table-head>
          </md-table-row>
          <md-table-row
            v-for="(item, index) in dataDoneJobLogList"
            v-bind:key="item.jobId"
          >
            <md-table-cell md-numeric>{{ index + 1 }}</md-table-cell>
            <md-table-cell>{{ item.name }}</md-table-cell>
            <md-table-cell>{{ item.startTime }}</md-table-cell>
            <md-table-cell>{{ item.endTime }}</md-table-cell>
            <md-table-cell
              ><span class="text-duration">{{
                item.duration
              }}</span></md-table-cell
            >
            <md-table-cell
              ><span
                v-bind:class="{
                  'text-running': item.status == 'running',
                  'text-warning': item.status == 'interrupt',
                  'text-danger': item.status == 'error',
                }"
                >{{ item.status }}</span
              ></md-table-cell
            >
            <md-table-cell>
              <md-button
                class="md-icon-button"
                @click="onJobLogDetailButtonClick(item)"
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

    <JobLogDetailDialog
      :jobId="jobLogDetailDialog.jobId"
      :jobLogId="jobLogDetailDialog.jobLogId"
      :showDialog="jobLogDetailDialog.showDialog"
      @closeDialog="jobLogDetailDialog.showDialog = false"
    >
    </JobLogDetailDialog>

    <md-dialog-confirm
      :md-active.sync="stopJobDialog.active"
      :md-title="stopJobDialog.title"
      md-confirm-text="Yes"
      md-cancel-text="No"
      @md-confirm="onStopJobDialogConfirm"
    />
  </div>
</template>

<script>
import Pagination from "@/components/common/BasePagination";
import JobLogDetailDialog from "@/views/Report/JobLogDetailDialog.vue";
export default {
  name: "Last24hours",
  components: {
    Pagination,
    JobLogDetailDialog,
  },
  data() {
    return {
      dataRunningJobLogList: [],
      dataRunningJobLogTotal: -1, // 紀錄總數
      dataRunningJobLogPageTotal: -1, // 紀錄總頁數
      dataRunningJobLogPagination: {
        page: 1, // 所在頁碼
        visible: true, // 是否顯示分頁
      },
      dataErrorJobLogList: [],
      dataErrorJobLogTotal: -1, // 紀錄總數
      dataErrorJobLogPageTotal: -1, // 紀錄總頁數
      dataErrorJobLogPagination: {
        page: 1, // 所在頁碼
        visible: true, // 是否顯示分頁
      },
      dataDoneJobLogList: [],
      dataDoneJobLogTotal: -1, // 紀錄總數
      dataDoneJobLogPageTotal: -1, // 紀錄總頁數
      dataDoneJobLogPagination: {
        page: 1, // 所在頁碼
        visible: true, // 是否顯示分頁
      },
      jobLogDetailDialog: {
        jobLogId: "",
        showDialog: false,
      },
      stopJobDialog: {
        active: false,
        title: "",
        jobLogId: null,
      },
      timerGetJobLogList: null,
    };
  },
  created() {
    this.getRunningJobLogList();
    this.getErrorJobLogList();
    this.getDoneJobLogList();
  },
  mounted() {
    this.timerSetGetJobLogList();
  },
  beforeRouteLeave(to, from, next) {
    this.timerClearGetJobLogList();
    next();
  },
  methods: {
    timerSetGetJobLogList() {
      this.timerGetJobLogList = setInterval(() => {
        this.getRunningJobLogList();
        this.getErrorJobLogList();
        this.getDoneJobLogList();
      }, 5000);
    },
    timerClearGetJobLogList() {
      if (this.timerGetJobLogList) clearInterval(this.timerGetJobLogList);
    },
    onJobLogDetailButtonClick(item) {
      this.jobLogDetailDialog.jobId = item.jobId;
      this.jobLogDetailDialog.jobLogId = item.jobLogId;
      this.jobLogDetailDialog.showDialog = true;
    },
    onJobStopButtonClick(item) {
      this.stopJobDialog.title = "立即停止'" + item.name + "'?";
      this.stopJobDialog.jobLogId = item.jobLogId;
      this.stopJobDialog.active = true;
    },
    onStopJobDialogConfirm() {
      this.$http({
        method: "post",
        url: "job/stop",
        params: {
          jobLogId: this.stopJobDialog.jobLogId,
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          const respData = resp.data;
          if (respData.returnCode === 1) {
            // 請求成功
            // console.log("respData.data.content = ", respData.data);
            const results = respData.data;
          } else {
            // 請求失敗
            this.alert.content = "取得紀錄詳情失敗";
            this.alert.visible = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getRunningJobLogCurrentPage(value) {
      this.dataRunningJobLogPagination.page = value;
      this.getRunningJobLogList();
    },
    getRunningJobLogList() {
      this.$http({
        method: "post",
        url: "report/getJobReportPage",
        data: JSON.stringify({
          status: "running",
          pageIndx: this.dataRunningJobLogPagination.page,
          pageSize: 10,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          const respData = resp.data;
          if (respData.returnCode === 1) {
            // 請求成功
            // console.log("respData.data.content = ", respData.data.content);
            const results = respData.data.content;
            this.dataRunningJobLogList = [];

            this.$nextTick(() => {
              this.dataRunningJobLogTotal = respData.data.totalElements;

              if (this.dataRunningJobLogTotal > 0) {
                this.dataRunningJobLogPageTotal = respData.data.totalPage;

                results.forEach((item) => {
                  let newResult = { ...item };
                  this.dataRunningJobLogList.push(newResult);
                });

                this.dataRunningJobLogPagination.visible = true;
              }
            });
          } else {
            // 請求失敗
            this.alertContent = "取得紀錄列表失敗";
            this.alertVisible = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
          pageSize: 10,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
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

                results.forEach((item) => {
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
        .catch((error) => {
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
          pageSize: 10,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
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

                results.forEach((item) => {
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
        .catch((error) => {
          console.log(error);
        });
    },
  },
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
  z-index: auto;
  margin: 10px;
}
</style>
