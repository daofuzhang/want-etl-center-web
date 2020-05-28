<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-content class="page-container md-layout-column">
        <md-field md-clearable>
          <label>Group Name</label>
          <md-input v-model="mailGroup.name"></md-input>
        </md-field>

        <md-field md-clearable>
          <label>Description</label>
          <md-input v-model="mailGroup.description"></md-input>
        </md-field>

        <md-dialog-actions>
          <md-button
            class="md-primary"
            @click="
          (showDialog = false),
          (saveMailGroup(mailGroup))
          "
          >Save</md-button>
          <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        </md-dialog-actions>
      </md-dialog-content>
    </md-dialog>

    <md-dialog :md-active.sync="showGroupMembersDialog">
      <md-dialog-content class="page-container md-layout-column">
        <md-field>
          <label>Group Name</label>
          <md-input v-model="groupName" readonly></md-input>
        </md-field>

        <div>
          <md-field>
            <label for="Search">Search</label>
            <md-select v-model="mailGroupMemberNames" multiple>
              <md-option
                v-for="(item, index) in mails"
                v-bind:key="index"
                :value="item.name"
              >{{item.name}}</md-option>
            </md-select>
          </md-field>
        </div>
        <!-- <div>
          <md-chips class="md-primary" v-model="mailGroupMemberNames" md-delete></md-chips>
        </div>-->

        <md-dialog-actions>
          <md-button
            class="md-primary"
            @click="
          (showGroupMembersDialog = false),
          (mappingMailGroupId()),
          (saveMailGroupMembers())
          "
          >Save</md-button>
          <md-button class="md-primary" @click="showGroupMembersDialog = false">Close</md-button>
        </md-dialog-actions>
      </md-dialog-content>
    </md-dialog>

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
            >Add Mail Group</div>
          </div>
        </md-button>
      </md-table-toolbar>

      <md-table-row>
        <md-table-head md-numeric>#</md-table-head>
        <md-table-head>Name</md-table-head>
        <md-table-head>Description</md-table-head>
        <md-table-head>Members</md-table-head>
        <md-table-head>Delete</md-table-head>
      </md-table-row>

      <md-table-row v-for="(item, index) in list" v-bind:key="item.id">
        <md-table-cell md-numeric>{{ index + 1 }}</md-table-cell>
        <md-table-cell>
          <a href="#" @click="(showDialog=true), (mailGroup={...item})">{{ item.name }}</a>
        </md-table-cell>
        <md-table-cell>
          <a href="#" @click="(showDialog=true), (mailGroup={...item})">{{ item.description }}</a>
        </md-table-cell>
        <md-table-cell>
          <md-button
            class="md-icon-button md-plain"
            @click="
              (showGroupMembersDialog = true),
              (mailGroupId = item.id),
              (groupName = item.name ),
                (getMailGroupMembers(item.id))
            "
          >
            <md-icon>person</md-icon>
          </md-button>
        </md-table-cell>
        <md-table-cell>
          <div>
            <md-dialog-confirm
              :md-active.sync="active"
              md-title="確定要刪除?"
              md-confirm-text="確定"
              md-cancel-text="取消"
              @md-cancel="active = false"
              @md-confirm="deleteMailGroup(item.id)"
            />

            <!-- <md-button class="md-primary md-raised" @click="active = true">Confirm</md-button> -->

            <md-button class="md-icon-button md-plain" @click="active = true">
              <md-icon>delete</md-icon>
            </md-button>
          </div>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "AutocompleteTemplate",
  data: () => ({
    list: [],
    mailGroupMembers: [],
    mailGroup: {},
    mailGroupMember: {},
    mailGroupMemberNames: [],
    selectMails: [],
    mails: [],
    mailNames: [],
    groupName: "",
    showDialog: false,
    active: false,
    showGroupMembersDialog: false,
    mailGroupId: "",
    saveToMailGroupData: []
  }),
  created() {
    this.getMailGroups();
    this.getMails();
  },
  methods: {
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
            this.list = [];

            results.forEach(item => {
              let newResult = { ...item };
              this.list.push(newResult);
            });
          } else {
            // 請求失敗
            this.alertContent = "取得列表失敗";
            this.alertVisible = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getMailGroupMembers(mailGroupId) {
      this.$http({
        method: "post",
        url: "setting/getMailGroupMembers",
        params: {
          mailGroupId: mailGroupId
        },
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(resp => {
          this.mailGroupMembers = [];
          this.mailGroupMemberNames = [];
          const respData = resp.data;
          if (respData.returnCode === 1) {
            // console.log("respData.data.content = ", respData.data);
            const results = respData.data;
            this.mailGroupMembers = [];

            results.forEach(item => {
              let newResult = { ...item };
              this.mailGroupMembers.push(newResult);
              this.mailGroupMemberNames.push(item.name);
            });
          } else {
            // 請求失敗
            this.alertContent = "取得列表失敗";
            this.alertVisible = true;
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
            this.mails = [];

            results.forEach(item => {
              let newResult = { ...item };
              this.mails.push(newResult);
              this.mailNames.push(item.name);
            });
            console.log("mailNames = ", this.mailNames);
          } else {
            // 請求失敗
            this.alertContent = "取得列表失敗";
            this.alertVisible = true;
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
            this.alertContent = "新增成功";
            this.alertVisible = true;
            this.getMailGroups();
          } else {
            // 請求失敗
            this.alertContent = respData.returnMessage;
            this.alertVisible = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    saveMailGroupMembers() {
      // console.log("mailGroupId : " , this.mailGroupId);
      // console.log("this.mails[i].name  : ", this.mails[i].name );
      // console.log("mailGroupMemberNames  : ", this.mailGroupMemberNames );
      this.$http({
        method: "post",
        url: "setting/saveMailGroupMembers",
        data: JSON.stringify({
          id: this.mailGroupId,
          mails: this.saveToMailGroupData
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(resp => {
          const respData = resp.data;
          if (respData.returnCode === 1) {
            this.alertContent = "新增成功";
            this.alertVisible = true;
          } else {
            // 請求失敗
            this.alertContent = respData.returnMessage;
            this.alertVisible = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteMailGroup(id) {
      this.$http({
        method: "post",
        url: "setting/deleteMailGroup",
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
            this.alertContent = "刪除成功";
            this.alertVisible = true;
            this.getMailGroups();
          } else {
            // 請求失敗
            this.alertContent = respData.returnMessage;
            this.alertVisible = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    mappingMailGroupId() {
      this.saveToMailGroupData = [];

      for (var i = 0; i < this.mails.length; i++) {
        // console.log("mailGroupId : " , this.mailGroupId);
        // console.log("this.mails[i].name  : ", this.mails[i].name );
        // console.log("mailGroupMemberNames  : ", this.mailGroupMemberNames );
        if (this.mailGroupMemberNames.includes(this.mails[i].name)) {
          this.saveToMailGroupData.push(this.mails[i].id);
        }
      }
      // console.log("saveToMailGroupData : ", this.saveToMailGroupData);
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
