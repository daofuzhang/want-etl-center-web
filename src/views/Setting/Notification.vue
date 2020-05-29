<template>
  <div>
    <md-dialog-alert
      :md-active.sync="alert.visible"
      :md-content="alert.content"
      md-confirm-text="Close"
    />

    <md-table md-card>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Notification</h1>
        </div>
        <div class="md-toolbar-section-end"></div>
      </md-table-toolbar>

      <md-table-row>
        <md-table-head md-numeric>#</md-table-head>
        <md-table-head>Name</md-table-head>
        <md-table-head>Description</md-table-head>
        <md-table-head>Edit</md-table-head>
      </md-table-row>

      <md-table-row v-for="(item, index) in dataMailGroupList" v-bind:key="item.id">
        <md-table-cell md-numeric>{{ index + 1 }}</md-table-cell>
        <md-table-cell>{{ item.name }}</md-table-cell>
        <md-table-cell>{{ item.description }}</md-table-cell>
        <md-table-cell>
          <md-button class="md-icon-button md-plain" @click="onEditButtonClick(item)">
            <md-icon>edit</md-icon>
          </md-button>
          <md-button class="md-icon-button md-plain" @click="onDeleteButtonClick(item)">
            <md-icon>delete</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>

    <md-speed-dial class="md-bottom-right">
      <md-button class="md-fab md-primary" @click="onAddButtonClick()">
        <md-icon>add</md-icon>
      </md-button>
    </md-speed-dial>

    <md-dialog :md-active.sync="editDialog.active">
      <md-dialog-content class="page-container md-layout-column">
        <md-field md-clearable>
          <label>Group Name</label>
          <md-input v-model="editDialog.mailGroup.name"></md-input>
        </md-field>

        <md-field md-clearable>
          <label>Description</label>
          <md-input v-model="editDialog.mailGroup.description"></md-input>
        </md-field>

        <md-field>
          <label for="Search">Search</label>
          <md-select v-model="editDialog.mailGroup.mailIds" multiple>
            <md-option
              v-for="(item, index) in dataMailList"
              v-bind:key="index"
              :value="item.id"
            >{{item.name}}</md-option>
          </md-select>
        </md-field>

        <md-dialog-actions>
          <md-button class="md-primary" @click="onEditDialogConfirm()">Save</md-button>
          <md-button class="md-primary" @click="editDialog.active = false">Close</md-button>
        </md-dialog-actions>
      </md-dialog-content>
    </md-dialog>

    <md-dialog-confirm
      :md-active.sync="deleteDialog.active"
      md-title="確定要刪除?"
      md-confirm-text="確定"
      md-cancel-text="取消"
      @md-cancel="deleteDialog.active = false"
      @md-confirm="onDeleteDialogConfirm()"
    />
  </div>
</template>

<script>
export default {
  name: "AutocompleteTemplate",
  data() {
    return {
      dataMailGroupList: [],
      dataMailList: [],
      editDialog: {
        active: false,
        mailGroup: {}
      },
      deleteDialog: {
        active: false,
        mailGroup: {}
      },
      alert: {
        content: "",
        visible: false
      }
    };
  },
  created() {
    this.getMailGroups();
    this.getMails();
  },
  methods: {
    onAddButtonClick() {
      this.editDialog.mailGroup = {};
      this.editDialog.active = true;
    },
    onEditButtonClick(item) {
      this.editDialog.mailGroup = { ...item };
      this.editDialog.active = true;
    },
    onEditDialogConfirm() {
      this.saveMailGroup(this.editDialog.mailGroup);
      this.editDialog.active = false;
    },
    onDeleteButtonClick(item) {
      this.deleteDialog.mailGroup = { ...item };
      this.deleteDialog.active = true;
    },
    onDeleteDialogConfirm() {
      this.deleteMailGroup(this.deleteDialog.mailGroup);
      this.deleteDialog.active = false;
    },
    getMailGroups() {
      this.$http({
        method: "post",
        url: "setting/getMailGroups",
        data: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(resp => {
          const respData = resp.data;
          if (respData.returnCode === 1) {
            // console.log("respData.data.content = ", respData.data);
            const results = respData.data;
            this.dataMailGroupList = [];

            results.forEach(item => {
              let newResult = { ...item };
              this.dataMailGroupList.push(newResult);
            });
          } else {
            // 請求失敗
            this.alert.content = "取得列表失敗";
            this.alert.visible = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getMails() {
      this.$http({
        method: "post",
        url: "setting/getMails",
        data: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(resp => {
          const respData = resp.data;
          if (respData.returnCode === 1) {
            // console.log("respData.data.content = ", respData.data);
            const results = respData.data;
            this.dataMailList = [];

            results.forEach(item => {
              let newResult = { ...item };
              this.dataMailList.push(newResult);
            });
          } else {
            // 請求失敗
            this.alert.content = "取得列表失敗";
            this.alert.visible = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    saveMailGroup(input) {
      this.$http({
        method: "post",
        url: "setting/saveMailGroup",
        data: JSON.stringify({ ...input }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(resp => {
          const respData = resp.data;
          if (respData.returnCode === 1) {
            this.alert.content = "更新成功";
            this.alert.visible = true;
            this.getMailGroups();
          } else {
            // 請求失敗
            this.alert.content = respData.returnMessage;
            this.alert.visible = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteMailGroup(input) {
      this.$http({
        method: "post",
        url: "setting/deleteMailGroup",
        params: {
          id: input.id
        },
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(resp => {
          const respData = resp.data;
          if (respData.returnCode === 1) {
            this.alert.content = "刪除成功";
            this.alert.visible = true;
            this.getMailGroups();
          } else {
            // 請求失敗
            this.alert.content = respData.returnMessage;
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

<style lang="scss" scoped>
.white-space {
  white-space: pre-wrap;
}

.dialog-content {
  min-width: 1200px;
  height: 500px;
  padding: $padding;
  overflow: auto;

  .md-scrollbar {
    display: inline-grid;
    padding: $padding;
  }
}

.md-dialog {
  min-width: 500px;
  padding: $padding;
}
</style>
