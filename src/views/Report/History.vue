<template>
  <div>
    <md-card>
      <md-card-header> </md-card-header>
      <md-card-content>
        <md-table>
          <md-table-row>
            <md-table-head md-numeric>#</md-table-head>
            <md-table-head>Log ID</md-table-head>
            <md-table-head>Start Time</md-table-head>
            <md-table-head>End Time</md-table-head>
            <md-table-head>Status</md-table-head>
            <md-table-head>Action</md-table-head>
          </md-table-row>
          <md-table-row
            v-for="(item, index) in dataJobLog.recentLogs"
            v-bind:key="item.jobId"
          >
            <md-table-cell md-numeric>{{ index + 1 }}</md-table-cell>
            <md-table-cell>{{ item.jobLogId }}</md-table-cell>
            <md-table-cell>{{ item.startTime }}</md-table-cell>
            <md-table-cell>{{ item.endTime }}</md-table-cell>
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
      </md-card-content>
    </md-card>
    <JobLogDetailDialog
      :jobLogId="jobLogDetailDialog.jobLogId"
      :showDialog="jobLogDetailDialog.showDialog"
      @closeDialog="jobLogDetailDialog.showDialog = false"
    >
    </JobLogDetailDialog>
  </div>
</template>
<script>
import JobLogDetailDialog from "@/views/Report/JobLogDetailDialog.vue";
export default {
  name: "History",
  props: {
    current: {
      type: Object,
      default: function() {
        return {
          recentLogs: [],
        };
      },
    },
  },
  components: {
    JobLogDetailDialog,
  },
  data() {
    return {
      dataJobLog: this.current,
      jobLogDetailDialog: {
        jobLogId: "",
        showDialog: false,
      },
    };
  },
  created() {
    if (!this.current.jobId) {
      this.$router.push({ name: "Report" });
    }
  },
  methods: {
    onJobLogDetailButtonClick(item) {
      this.jobLogDetailDialog.jobLogId = item.jobLogId;
      this.jobLogDetailDialog.showDialog = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.md-card {
  padding: $padding;
  margin: $padding;
}
</style>
