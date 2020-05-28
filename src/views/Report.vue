<template>
  <div>
    <md-card>
      <md-card-header>
        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <md-field>
              <label>Job ID / Message Keyword...</label>
              <md-input v-model="search.keyword"></md-input>
              <md-button class="md-icon-button" @click="getJobLogList">
                <md-icon>search</md-icon>
              </md-button>
            </md-field>
          </div>
        </div>
        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <md-radio v-model="timeType" :value="0">Select int Last</md-radio>
            <md-radio v-model="timeType" :value="1">Duration</md-radio>
          </div>
        </div>
        <div class="md-layout md-gutter" v-if="timeType === 0">
          <div class="md-layout-item md-size-30">
            <md-field>
              <label>Select int Last</label>
              <md-select v-model="search.lastTime">
                <md-option
                  v-for="item in lastTimeOptions"
                  v-bind:key="item.key"
                  :value="item.value"
                  >{{ item.name }}</md-option
                ></md-select
              >
            </md-field>
          </div>
        </div>
        <div class="md-layout md-gutter" v-if="timeType === 1">
          <div class="md-layout-item md-size-30">
            <md-field>
              <md-icon>event</md-icon>
              <label>From Time</label>
              <md-input v-model="search.fromTime"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-30">
            <md-field>
              <md-icon>event</md-icon>
              <label>To Time</label>
              <md-input v-model="search.toTime"></md-input>
            </md-field>
          </div>
        </div>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-30">
            <md-field>
              <label>Group</label>
              <md-select v-model="search.group">
                <md-option
                  v-for="item in groupOptions"
                  v-bind:key="item.key"
                  :value="item.value"
                  >{{ item.name }}</md-option
                ></md-select
              >
            </md-field>
          </div>
          <div class="md-layout-item md-size-30">
            <md-field>
              <label>Folder</label>
              <md-select v-model="search.folder">
                <md-option
                  v-for="item in folderOptions"
                  v-bind:key="item.key"
                  :value="item.value"
                  >{{ item.name }}</md-option
                ></md-select
              >
            </md-field>
          </div>
        </div>
        <div class="md-layout md-gutter">
          <div class="md-layout-item ">
            <md-checkbox v-model="search.status" value="wait"
              >Waiting</md-checkbox
            >
            <md-checkbox v-model="search.status" value="running"
              >Running</md-checkbox
            >
            <md-checkbox v-model="search.status" value="done">Done</md-checkbox>
            <md-checkbox v-model="search.status" value="interrupt"
              >Interrupt</md-checkbox
            >
            <md-checkbox v-model="search.status" value="error"
              >Error</md-checkbox
            >
          </div>
        </div>
      </md-card-header>
      <md-card-content>
        <md-table>
          <md-table-row>
            <md-table-head md-numeric>#</md-table-head>
            <md-table-head>Job ID</md-table-head>
            <md-table-head>Description</md-table-head>
            <md-table-head>Log ID</md-table-head>
            <md-table-head>Start Time</md-table-head>
            <md-table-head>End Time</md-table-head>
            <md-table-head>Duration</md-table-head>
            <md-table-head>Status</md-table-head>
            <md-table-head>Details</md-table-head>
          </md-table-row>
          <md-table-row
            v-for="(item, index) in dataJobLogList"
            v-bind:key="item.jobId"
          >
            <md-table-cell md-numeric>{{ index + 1 }}</md-table-cell>
            <md-table-cell>{{ item.jobId }}</md-table-cell>
            <md-table-cell>{{ item.description }}</md-table-cell>
            <md-table-cell>{{ item.jobLogId }}</md-table-cell>
            <md-table-cell>{{ item.startTime }}</md-table-cell>
            <md-table-cell>{{ item.endTime }}</md-table-cell>
            <md-table-cell>{{ item.duration }}</md-table-cell>
            <md-table-cell>{{ item.status }}</md-table-cell>
            <md-table-cell>
              <md-button
                @click="
                  (showDialog = true),
                    (showNavigation = false),
                    (dataJobLog = item),
                    getJobLogDetail(item.recentLogs[0])
                "
                ><md-icon>details</md-icon></md-button
              ></md-table-cell
            >
          </md-table-row>
        </md-table>
        <Pagination
          @pagination-page-current="getCurrentPage"
          :total="dataTotal"
          :pageTotal="dataPageTotal"
          :current="dataPagination.page"
          :visible="dataPagination.visible"
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
                <md-input
                  v-model="dataJobLogDetail.jobLogId"
                  :disabled="true"
                ></md-input>
              </md-field>
              <md-field>
                <label>Status</label>
                <md-input
                  v-model="dataJobLogDetail.status"
                  :disabled="true"
                ></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-size-50">
              <md-field>
                <label>Start Time</label>
                <md-input
                  v-model="dataJobLogDetail.startTime"
                  :disabled="true"
                ></md-input>
              </md-field>
              <md-field>
                <label>End Time</label>
                <md-input
                  v-model="dataJobLogDetail.endTime"
                  :disabled="true"
                ></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-size-100">
              <md-field>
                <label>Parameter</label>
                <md-textarea
                  v-model="dataJobLogDetail.parameter"
                  :disabled="true"
                ></md-textarea>
              </md-field>
              <span class="md-subheading">Log</span>
              <md-content class="md-scrollbar">
                <span
                  v-for="(line, index) in dataJobLogDetail.message"
                  v-bind:key="index"
                  v-bind:class="{ 'text-danger': line.type == 1 }"
                >
                  >{{ line.content }}</span
                >
              </md-content>
            </div>
          </div>
        </md-content>
      </div>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false"
          >Close</md-button
        >
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/common/BasePagination";
import { uuid } from "vue-uuid";
export default {
  name: "TableBasic",
  components: {
    Pagination,
  },
  data() {
    return {
      timeType: 0,
      lastTimeOptions: [
        {
          key: uuid.v4(),
          name: "5 min",
          value: 300,
        },
        {
          key: uuid.v4(),
          name: "10 min",
          value: 600,
        },
        {
          key: uuid.v4(),
          name: "30 min",
          value: 3000,
        },
      ],
      groupOptions: [],
      folderOptions: [],
      search: {
        keyword: null,
        lastTime: null,
        fromTime: null,
        toTime: null,
        group: null,
        folder: null,
        status: null,
      },
      dataGroupList: [],
      dataJobLogList: [],
      dataJobLog: {},
      dataJobLogDetail: {},
      dataTotal: -1, // 紀錄總數
      dataPageTotal: -1, // 紀錄總頁數
      dataPagination: {
        page: 1, // 所在頁碼
        visible: true, // 是否顯示分頁
      },
      showDialog: false,
      showNavigation: false,
      showSidepanel: false,
    };
  },
  created() {
    this.getGroupList();
    this.getJobLogList();
  },
  watch: {
    "search.group"() {
      this.search.folder = null;
      this.groupOptions.forEach((group) => {
        if (this.search.group == group.value) {
          this.folderOptions = group.folderOptions;
          return;
        }
      });
      this.getJobLogList();
    },
    "search.folder"() {
      this.getJobLogList();
    },
    "search.status"() {
      this.getJobLogList();
    },
  },
  methods: {
    getCurrentPage(value) {
      this.dataPagination.page = value;
      this.getLogList();
    },
    getGroupList() {
      this.$http({
        method: "post",
        url: "job/getGroups",
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
            this.groupOptions = [];
            this.$nextTick(() => {
              results.forEach((group) => {
                let options = [];
                group.folders.forEach((folder) => {
                  let folderOption = {
                    key: uuid.v4(),
                    name: folder.name,
                    value: folder.id,
                  };
                  options.push(folderOption);
                });
                let groupOption = {
                  key: uuid.v4(),
                  name: group.name,
                  value: group.id,
                  folderOptions: options,
                };
                this.groupOptions.push(groupOption);
              });
              console.log(this.groupOptions);
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
    getJobLogList() {
      this.$http({
        method: "post",
        url: "report/getJobReportPage",
        data: JSON.stringify({
          keyword: this.search.keyword,
          groupId: this.search.group,
          folderId: this.search.folder,
          status: this.search.status,
          pageIndx: this.dataPagination.page,
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
            this.dataJobLogList = [];

            this.$nextTick(() => {
              this.dataTotal = respData.data.totalElements;

              if (this.dataTotal > 0) {
                this.dataPageTotal = respData.data.totalPage;

                results.forEach((item) => {
                  let newResult = { ...item };
                  this.dataJobLogList.push(newResult);
                });

                this.dataPagination.visible = true;
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
    getJobLogDetail(item) {
      if (item == undefined) {
        return;
      }
      this.$http({
        method: "post",
        url: "report/getJobReportLog",
        params: {
          jobLogId: item.jobLogId,
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
  padding: 10px;
  margin: 10px;
}
</style>
