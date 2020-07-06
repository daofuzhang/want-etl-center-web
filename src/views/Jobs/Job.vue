<template>
  <div>
    <md-card>
      <md-card-content>
        <md-field>
          <label>Description</label>
          <md-input v-model="dataJob.memo"></md-input>
        </md-field>
        <md-chips v-model="dataJob.expressions" md-placeholder="ex: 秒 分 時 日 月 星期"></md-chips>
        <div class="block">
          <h3>Error Control</h3>
          <md-radio v-model="dataJob.strategy" value="continues">Continue</md-radio>
          <md-radio v-model="dataJob.strategy" value="interrupted">Interrupt</md-radio>
        </div>

        <div class="block">
          <md-checkbox v-model="dataJob.sendBatchLogger">Send Batch Logger</md-checkbox>
        </div>
        <div class="block">
          <h3>Dynamic</h3>
          <div class="inset-container" style="display: block; min-height: 116px; overflow: auto;">
            <Dynamic
              style="margin: 10px;"
              v-for="(dynamic, index) in dataJob.dynamics"
              :key="dynamic.key"
              :index="index"
              :current="dynamic"
              @delete="deleteDynamic"
            ></Dynamic>
            <md-speed-dial class="md-bottom-right">
              <md-button class="md-fab md-primary" @click="addDynamic">
                <md-icon>add</md-icon>
              </md-button>
            </md-speed-dial>
          </div>
        </div>
        <div class="block">
          <h3>Task</h3>
          <md-switch v-model="enabled">Drag</md-switch>
          <div class="inset-container">
            <draggable
              style="display: block; min-height: 116px; overflow: auto;"
              :list="dataJob.tasks"
              :disabled="!enabled"
              class="list-group"
              ghost-class="ghost"
              @start="dragging = true"
              @end="dragging = false"
            >
              <Task
                style="margin: 10px;"
                v-for="(task, index) in dataJob.tasks"
                :key="task.key"
                :index="index"
                :current="task"
                :jdbcServerList="dataJdbcServerList"
                :jcoServerList="dataJcoServerList"
                @delete="deleteTask"
              ></Task>
            </draggable>
            <md-speed-dial class="md-bottom-right">
              <md-button class="md-fab md-primary" @click="addTask">
                <md-icon>add</md-icon>
              </md-button>
            </md-speed-dial>
          </div>
        </div>
      </md-card-content>
      <md-card-actions>
        <md-button class="md-raised md-primary" @click="confirmDialog.active = true">Save</md-button>
      </md-card-actions>

      <md-dialog-confirm
        :md-active.sync="confirmDialog.active"
        md-title="確定要儲存?"
        md-confirm-text="確定"
        md-cancel-text="取消"
        @md-cancel="confirmDialog.active = false"
        @md-confirm="save"
      />

       <md-dialog-alert
        :md-active.sync="alert.visible"
        :md-content="alert.content"
        md-confirm-text="Close"
      />
    </md-card>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import Dynamic from "@/views/Jobs/Dynamic.vue";
import Task from "@/views/Jobs/Task.vue";
import { uuid } from "vue-uuid";
export default {
  name: "Job",
  components: {
    draggable,
    Dynamic,
    Task
  },
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      dataJob: {},
      dataJdbcServerList: [],
      dataJcoServerList: [],
      enabled: false,
      dragging: false,
      confirmDialog: {
        active: false
      },
      alert: {
        content: "",
        visible: false
      }
    };
  },
  created() {
    this.getJDBCServerList();
    this.getJCOServerList();
    this.getJob();
  },
  watch: {
    id() {
      this.getJob();
    }
  },
  methods: {
    getJob() {
      this.$http({
        method: "post",
        url: "job/getJob",
        params: {
          jobId: this.id
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
            const results = respData.data;

            this.$nextTick(() => {
              results.tasks.forEach(task => {
                task.key = uuid.v4();
              });
              this.dataJob = { ...results };
            });
          } else {
            // 請求失敗
            this.alert.content = "取得紀錄詳情失敗";
            this.alert.visible = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getJDBCServerList() {
      this.$http({
        method: "post",
        url: "setting/getJDBCServers",
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
            this.$nextTick(() => {
              this.dataJdbcServerList = results;
            });
          } else {
            // 請求失敗
            this.alert.content = "取得紀錄詳情失敗";
            this.alert.visible = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getJCOServerList() {
      this.$http({
        method: "post",
        url: "setting/getJCOServers",
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
            this.jco_server_list = [];
            this.$nextTick(() => {
              this.dataJcoServerList = results;
            });
          } else {
            // 請求失敗
            this.alert.content = "取得紀錄詳情失敗";
            this.alert.visible = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    addDynamic: function() {
      this.dataJob.dynamics.push({ key: uuid.v4() });
    },
    deleteDynamic: function(dynamic) {
      this.dataJob.dynamics.splice(this.dataJob.dynamics.indexOf(dynamic), 1);
    },
    addTask: function() {
      this.dataJob.tasks.push({ key: uuid.v4() });
    },
    deleteTask: function(task) {
      this.dataJob.tasks.splice(this.dataJob.tasks.indexOf(task), 1);
    },
    save: function() {
      this.$http({
        method: "post",
        url: "job/saveJob",
        data: JSON.stringify({
          ...this.dataJob
        }),
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
            this.alert.content = "儲存成功";
            this.alert.visible = true;
          } else {
            // 請求失敗
            this.alert.content = "取得紀錄詳情失敗";
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

<style scoped>
.buttons {
  margin-top: 35px;
}

.ghost {
  background: #c8ebfb;
  opacity: 0.5;
}

.list-group-item {
  margin-top: 10px;
}

.inset-container {
  position: relative;
  box-shadow: inset 0 3px 1px -2px rgba(0, 0, 0, 0.2), inset 0 2px 2px 0 rgba(0, 0, 0, 0.14), inset 0 1px 5px 0 rgba(255, 178, 178, 0.12);
}
</style>
