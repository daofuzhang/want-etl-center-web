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
          <h1 class="md-title">User</h1>
        </div>
      </md-table-toolbar>

      <md-table-row>
        <md-table-head md-numeric>#</md-table-head>
        <md-table-head>ID</md-table-head>
        <md-table-head>Name</md-table-head>
        <md-table-head>Edit</md-table-head>
      </md-table-row>

      <md-table-row v-for="(item, index) in dataUserList" v-bind:key="item.id">
        <md-table-cell md-numeric>{{ index + 1 }}</md-table-cell>
        <md-table-cell>{{ item.id }}</md-table-cell>
        <md-table-cell>{{ item.name }}</md-table-cell>
        <md-table-cell>
          <md-button class="md-icon-button md-plain" @click="onEditUserButtonClick(item)">
            <md-icon>edit</md-icon>
          </md-button>
          <md-button class="md-icon-button md-plain" @click="onDeleteUserButtonClick(item.id)">
            <md-icon>delete</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>

    <md-speed-dial class="md-bottom-right">
      <md-button class="md-fab md-primary" @click="
              onAddButtonClick()
            ">
        <md-icon>add</md-icon>
      </md-button>
    </md-speed-dial>

    <md-dialog :md-active.sync="editDialog.active">
      <md-dialog-content class="page-container md-layout-column">
        <md-field :md-clearable="editDialog.clearable">
          <label>Id</label>
          <md-input :readonly="editDialog.isReadonly" v-model="editDialog.user.id"></md-input>
        </md-field>

        <md-field md-clearable>
          <label>Name</label>
          <md-input v-model="editDialog.user.name"></md-input>
        </md-field>

        <md-field md-clearable>
          <label>mail</label>
          <md-input v-model="editDialog.user.mail"></md-input>
        </md-field>

        <md-dialog-actions>
          <md-button class="md-primary" @click="onEditUserConfirm()">Save</md-button>
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
      @md-confirm="onDeleteUserDialogConfirm()"
    />
  </div>
</template>

<script>
export default {
  name: "ErrorsMessages",
  data: () => ({
    dataUserList: [],
    editDialog: {
      user: {},
      active: false,
      clearable: false,
      isReadonly: false
    },
    deleteDialog: {
      id: "",
      active: false
    },
    alert: {
      content: "",
      visible: false
    }
  }),
  created() {
    this.getUsers();
  },
  methods: {
    isNotNull(value) {
      if (value == null) {
        return false;
      } else {
        return true;
      }
    },
    onAddButtonClick() {
      this.editDialog.user = {};
      this.editDialog.active = true;
      this.editDialog.clearable = true;
      this.editDialog.isReadonly = false;
    },
    onEditUserButtonClick(item) {
      this.editDialog.user = { ...item };
      this.editDialog.active = true;
      this.editDialog.clearable = false;
      this.editDialog.isReadonly = true;
    },
    onEditUserConfirm() {
      this.editDialog.active = false;
      this.saveUser(this.editDialog.user);
    },
    onDeleteUserButtonClick(id) {
      this.deleteDialog.id = id;
      this.deleteDialog.active = true;
    },
    onDeleteUserDialogConfirm() {
      this.deleteUser(this.deleteDialog.id);
    },
    getUsers() {
      this.$http({
        method: "post",
        url: "setting/getUsers",
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
            this.dataUserList = [];

            results.forEach(item => {
              let newResult = { ...item };
              this.dataUserList.push(newResult);
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
    saveUser(input) {
      this.$http({
        method: "post",
        url: "setting/saveUser",
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
            this.getUsers();
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
    deleteUser(id) {
      this.$http({
        method: "post",
        url: "setting/deleteUser",
        params: {
          id: id
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
            this.getUsers();
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
  },
  computed: {
    messageClass() {
      return {
        "md-invalid": this.hasMessages
      };
    }
  }
};
</script>
