<template>
  <div>
    <md-table md-card>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">User</h1>
        </div>
      </md-table-toolbar>

      <md-table-row>
        <md-table-head md-numeric>#</md-table-head>
        <md-table-head>ID</md-table-head>
        <md-table-head>Name</md-table-head>
        <md-table-head>Edit</md-table-head>
        <md-table-head>Delete</md-table-head>
      </md-table-row>
    </md-table>

    <md-speed-dial class="md-bottom-right">
      <md-button
        class="md-fab md-primary"
        @click="
              (showDialog = true),
                (mailGroup = {})
            "
      >
        <md-icon>add</md-icon>
      </md-button>
    </md-speed-dial>
  </div>
</template>

<script>
export default {
  name: "ErrorsMessages",
  data: () => ({}),
  computed: {
    messageClass() {
      return {
        "md-invalid": this.hasMessages
      };
    }
  }
};
</script>
