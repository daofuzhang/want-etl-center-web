<template>
  <div>
    <md-dialog
      :md-active.sync="show"
      @md-opened="onDialogShow"
      @md-closed="onDialogClose"
    >
      <md-content class="dialog-content">
        <md-tabs md-dynamic-height>
          <md-tab md-label="Parameter">
              <json-viewer :value="dataJobLogDetail.parameter" :expand-depth=3></json-viewer>
          </md-tab>
          <md-tab md-label="Log">
            <md-content class="log">
              <span
                v-for="(line, index) in dataJobLogDetail.message"
                v-bind:key="index"
                v-bind:class="{ 'text-danger': line.type == 1 }"
                >>{{ line.content }}</span
              >
            </md-content>
          </md-tab>
          <md-tab md-label="Manual">
              <md-field>
                <md-textarea v-model="manualCommand" md-autogrow></md-textarea>
              </md-field>
          </md-tab>
        </md-tabs>
      </md-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="show = false">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>
<script>

export default {
  name: "JobLogDetailDialog",
  props: {
    jobId: {
      type: String,
    },
    jobLogId: {
      type: String,
    },
    showDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: false,
      dataJobLogDetail: {
        parameter: {}
      },
      manualCommand: "",
      timerGetJobLogList: null,
    };
  },
  created() {
    this.show = this.showDialog;
  },
  watch: {
    jobId() {
      this.getManualCommand();
    },
    jobLogId() {
      this.getJobLogDetail();
    },
    showDialog() {
      this.show = this.showDialog;
    },
    "dataJobLogDetail.status": function() {
      if (this.show && this.dataJobLogDetail.status === "running") {
        this.timerSetGetJobLogList();
      } else {
        this.timerClearGetJobLogList();
      }
    },
  },
  methods: {
    timerSetGetJobLogList() {
      this.timerGetJobLogList = setInterval(() => {
        this.getJobLogDetail();
      }, 2000);
    },
    timerClearGetJobLogList() {
      if (this.timerGetJobLogList) clearInterval(this.timerGetJobLogList);
    },
    onDialogShow() {
      this.$emit("showDialog");
    },
    onDialogClose() {
      this.timerClearGetJobLogList();
      this.$emit("closeDialog");
    },
    getJobLogDetail() {
      this.$http({
        method: "post",
        url: "report/getJobReportLog",
        params: {
          jobLogId: this.jobLogId,
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
            this.$nextTick(() => {
              this.dataJobLogDetail = { ...respData.data };
            });
          } else {
            // 請求失敗
            this.alertContent = "取得紀錄詳情失敗";
            this.alertVisible = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getManualCommand() {
      this.$http({
        method: "post",
        url: "job/manualCommand",
        params: {
          jobId: this.jobId,
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
            this.$nextTick(() => {
              this.manualCommand = 'java -cp want-etl-worker.jar:resources:lib/sapjco3.jar com.want.App ' + respData.data;
            });
          } else {
            // 請求失敗
            this.alertContent = "取得紀錄詳情失敗";
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
.parameter {
  white-space: pre-wrap;
}

.dialog-content {
  width: 1000px;
  height: 600px;
  padding: $padding;
  overflow: auto;

  .log {
    display: inline-grid;
    padding: $padding;
  }
}

.md-dialog {
  .md-dialog-container {
    max-width: 768px;
  }
}

.md-card {
  padding: $padding;
  margin: $padding;
}
</style>
