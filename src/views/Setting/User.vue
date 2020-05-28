<template>
  <md-table md-card>
    <md-table-toolbar>
      <md-button :md-active.sync="showDialog" class="md-dense md-raised md-primary">
        <div class="md-ripple">
          <div
            class="md-button-content"
            @click="
              (showDialog = true),
                (mailGroup = {})
            "
          >Add User</div>
        </div>
      </md-button>
    </md-table-toolbar>

    <md-table-row>
      <md-table-head md-numeric>#</md-table-head>
      <md-table-head>ID</md-table-head>
      <md-table-head>Name</md-table-head>
      <md-table-head>Edit</md-table-head>
      <md-table-head>Delete</md-table-head>
    </md-table-row>
  </md-table>
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
