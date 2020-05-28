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
          <md-radio v-model="dataJob.strategy" value="interrupt">Interrupt</md-radio>
        </div>
      </md-card-content>
      <md-card-actions>
        <md-button class="md-raised md-primary" @click="addTask">Add</md-button>
        <md-button class="md-raised md-primary" @click="save">Save</md-button>
      </md-card-actions>
    </md-card>

    <draggable
      :list="dataJob.tasks"
      :disabled="!enabled"
      class="list-group"
      ghost-class="ghost"
      @start="dragging = true"
      @end="dragging = false"
    >
      <Task
        class="list-group-item"
        v-for="task in dataJob.tasks"
        :key="task.key"
        :current="task"
        :jdbcServerList="dataJdbcServerList"
        :jcoServerList="dataJcoServerList"
        @delete="deleteTask"
      ></Task>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import Task from "@/views/Jobs/Task.vue";
import { uuid } from "vue-uuid";
export default {
  name: "Job",
  components: {
    draggable,
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
      enabled: true,
      dragging: false
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
              this.dataJob = results;
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
            this.alertContent = "取得紀錄詳情失敗";
            this.alertVisible = true;
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
            this.alertContent = "取得紀錄詳情失敗";
            this.alertVisible = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
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
</style>
