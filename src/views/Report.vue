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
        <!-- <div class="md-layout md-gutter">
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
                <md-option></md-option>
                <md-option
                  v-for="item in lastTimeOptions"
                  v-bind:key="item.key"
                  :value="item.value"
                  >{{ item.name }}</md-option
                >
              </md-select>
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
        </div> -->
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-30">
            <md-field>
              <label>Group</label>
              <md-select v-model="search.group">
                <md-option></md-option>
                <md-option
                  v-for="item in groupOptions"
                  v-bind:key="item.key"
                  :value="item.value"
                  >{{ item.name }}</md-option
                >
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-size-30">
            <md-field>
              <label>Folder</label>
              <md-select v-model="search.folder">
                <md-option></md-option>
                <md-option
                  v-for="item in folderOptions"
                  v-bind:key="item.key"
                  :value="item.value"
                  >{{ item.name }}</md-option
                >
              </md-select>
            </md-field>
          </div>
        </div>
        <div class="md-layout md-gutter">
          <div class="md-layout-item">
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
            <md-table-head>Name</md-table-head>
            <md-table-head>Log ID</md-table-head>
            <md-table-head>Start Time</md-table-head>
            <md-table-head>End Time</md-table-head>
            <md-table-head>Duration</md-table-head>
            <md-table-head>Status</md-table-head>
            <md-table-head>Action</md-table-head>
          </md-table-row>
          <md-table-row
            v-for="(item, index) in dataJobLogList"
            v-bind:key="item.jobId"
          >
            <md-table-cell md-numeric>{{ index + 1 }}</md-table-cell>
            <md-table-cell>{{ item.jobId }}</md-table-cell>
            <md-table-cell>{{ item.name }}</md-table-cell>
            <md-table-cell>{{ item.jobLogId }}</md-table-cell>
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
              <md-button
                class="md-icon-button"
                @click="onHistoryButtonClick(item)"
              >
                <md-icon>history</md-icon>
              </md-button>
            </md-table-cell>
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
    <JobLogDetailDialog
      :jobId="jobLogDetailDialog.jobId"
      :jobLogId="jobLogDetailDialog.jobLogId"
      :showDialog="jobLogDetailDialog.showDialog"
      @closeDialog="jobLogDetailDialog.showDialog = false"
    >
    </JobLogDetailDialog>
  </div>
</template>

<script>
import Pagination from "@/components/common/BasePagination";
import JobLogDetailDialog from "@/views/Report/JobLogDetailDialog.vue";
import { uuid } from "vue-uuid";
export default {
  name: "TableBasic",
  components: {
    Pagination,
    JobLogDetailDialog,
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
      dataTotal: -1, // 紀錄總數
      dataPageTotal: -1, // 紀錄總頁數
      dataPagination: {
        page: 1, // 所在頁碼
        visible: true, // 是否顯示分頁
      },
      jobLogDetailDialog: {
        jobLogId: "",
        showDialog: false,
      },
      timerGetJobLogList: null,
    };
  },
  created() {
    this.getGroupList();
    this.getJobLogList();
  },
  mounted() {
    this.timerSetGetJobLogList();
  },
  beforeRouteLeave(to, from, next) {
    this.timerClearGetJobLogList();
    next();
  },
  watch: {
    "search.group"() {
      this.search.group = this.search.group == false ? null : this.search.group;
      this.search.folder = null;
      this.folderOptions = [];
      this.groupOptions.forEach((group) => {
        if (this.search.group == group.value) {
          this.folderOptions = group.folderOptions;
          return;
        }
      });
      this.getJobLogList();
    },
    "search.folder"() {
      this.search.folder =
        this.search.folder == false ? null : this.search.folder;
      this.getJobLogList();
    },
    "search.status"() {
      this.getJobLogList();
    },
  },
  methods: {
    timerSetGetJobLogList() {
      this.timerGetJobLogList = setInterval(() => {
        this.getJobLogList();
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
    onHistoryButtonClick(item) {
      this.$router.push({ name: "History", params: { current: item } });
    },
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
  },
};
</script>
<style lang="scss" scoped>
.md-card {
  padding: 10px;
  margin: 10px;
}
</style>
