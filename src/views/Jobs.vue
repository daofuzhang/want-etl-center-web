<template>
  <div class="full-control">
    <div class="list">
      <md-list :md-expand-single="expandSingle">
        <md-list-item @click="onGroupAddClick">
          <md-icon>add</md-icon>
          <span class="md-list-item-title">Add Group</span>
        </md-list-item>
        <md-list-item
          md-expand
          v-for="(group, index) in dataGrouplist"
          v-bind:key="index"
        >
          <span class="md-list-item-title">{{ group.name }}</span>
          <div class="md-list-action">
            <md-button
              class="md-icon-button"
              v-on:click.stop="onRunJobClick(group)"
            >
              <md-icon>offline_bolt</md-icon>
            </md-button>
            <md-menu md-direction="bottom-start">
              <md-button
                class="md-icon-button"
                v-on:click.stop="onItemActionClick"
                md-menu-trigger
              >
                <md-icon>more_vert</md-icon>
              </md-button>
              <md-menu-content>
                <md-menu-item @click="onGroupEditClick(group)"
                  >Edit</md-menu-item
                >
                <md-menu-item @click="onFolderAddClick(group)"
                  >Add Folder</md-menu-item
                >
                <md-menu-item
                  @click="
                    (groupDeleteDialog.active = true)(
                      (groupDeleteDialog.group = group)
                    )
                  "
                  >Delete</md-menu-item
                >
              </md-menu-content>
            </md-menu>
          </div>
          <md-list slot="md-expand">
            <md-list-item
              md-expand
              v-for="(folder, index) in group.folders"
              v-bind:key="index"
            >
              <span class="md-list-item-title">{{ folder.name }}</span>
              <div class="md-list-action">
                <md-button
                  class="md-icon-button"
                  v-on:click.stop="onRunJobClick(folder)"
                >
                  <md-icon>offline_bolt</md-icon>
                </md-button>
                <md-menu md-direction="bottom-start" :md-close-on-click="false">
                  <md-button
                    class="md-icon-button"
                    v-on:click.stop="onItemActionClick"
                    md-menu-trigger
                  >
                    <md-icon>more_vert</md-icon>
                  </md-button>
                  <md-menu-content>
                    <md-menu-item @click="onFolderEditClick(group, folder)"
                      >Edit</md-menu-item
                    >
                    <md-menu-item @click="onJobAddClick(group, folder)"
                      >Add Job</md-menu-item
                    >
                    <md-menu-item
                      @click="
                        (folderDeleteDialog.active = true)(
                          (folderDeleteDialog.folder = folder)
                        )
                      "
                      >Delete</md-menu-item
                    >
                  </md-menu-content>
                </md-menu>
              </div>
              <md-list slot="md-expand">
                <md-list-item
                  class="md-inset"
                  v-for="(job, index) in folder.jobs"
                  v-bind:key="index"
                >
                  <router-link :to="{ name: 'Job', params: { id: job.jobId } }">
                    {{ job.name }}
                  </router-link>
                  <div class="md-list-action">
                    <md-button
                      class="md-icon-button"
                      v-on:click.stop="onRunJobClick(job)"
                    >
                      <md-icon>offline_bolt</md-icon>
                    </md-button>
                    <md-menu md-direction="bottom-start">
                      <md-button
                        class="md-icon-button"
                        v-on:click.stop="onItemActionClick"
                        md-menu-trigger
                      >
                        <md-icon>more_vert</md-icon>
                      </md-button>
                      <md-menu-content>
                        <md-menu-item
                          @click="onJobEditClick(group, folder, job)"
                          >Edit</md-menu-item
                        >
                        <md-menu-item
                          @click="
                            (jobDeleteDialog.active = true)(
                              (jobDeleteDialog.job = job)
                            )
                          "
                          >Delete</md-menu-item
                        >
                      </md-menu-content>
                    </md-menu>
                  </div>
                </md-list-item>
              </md-list>
            </md-list-item>
          </md-list>
        </md-list-item>
      </md-list>
    </div>
    <div class="control">
      <router-view></router-view>
    </div>

    <md-dialog-confirm
      :md-active.sync="showRunJobDialog"
      :md-title="runJobDialogTitle"
      md-confirm-text="Yes"
      md-cancel-text="No"
      @md-confirm="onRunJobDialogConfirm"
    />

    <md-dialog :md-active.sync="showGroupDialog">
      <md-dialog-title>{{ groupDialog.title }}</md-dialog-title>
      <md-dialog-content>
        <md-field>
          <label>Name</label>
          <md-input v-model="groupDialog.name"></md-input>
        </md-field>
        <md-field>
          <label>Description</label>
          <md-input v-model="groupDialog.memo"></md-input>
        </md-field>
        <md-field>
          <label for="movies">Mail Group</label>
          <md-select v-model="groupDialog.mailGroupIds" multiple>
            <md-option
              v-for="(mailGroup, index) in dataMailGrouplist"
              v-bind:key="index"
              :value="mailGroup.id"
              >{{ mailGroup.name }}</md-option
            >
          </md-select>
        </md-field>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showGroupDialog = false"
          >Cancel</md-button
        >
        <md-button class="md-primary" @click="onGroupDialogSaveClick"
          >Save</md-button
        >
      </md-dialog-actions>
    </md-dialog>

    <md-dialog :md-active.sync="showFolderDialog">
      <md-dialog-title>{{ folderDialog.title }}</md-dialog-title>
      <md-dialog-content>
        <md-field>
          <label>Name</label>
          <md-input v-model="folderDialog.name"></md-input>
        </md-field>
        <md-field>
          <label>Description</label>
          <md-input v-model="folderDialog.memo"></md-input>
        </md-field>
        <md-field>
          <label for="movies">Mail Group</label>
          <md-select v-model="folderDialog.mailGroupIds" multiple>
            <md-option
              v-for="(mailGroup, index) in dataMailGrouplist"
              v-bind:key="index"
              :value="mailGroup.id"
              >{{ mailGroup.name }}</md-option
            >
          </md-select>
        </md-field>
        <md-field>
          <label>Location</label>
          <md-input v-model="folderDialog.location" readonly></md-input>
        </md-field>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showFolderDialog = false"
          >Cancel</md-button
        >
        <md-button class="md-primary" @click="onFolderDialogSaveClick"
          >Save</md-button
        >
      </md-dialog-actions>
    </md-dialog>

    <md-dialog :md-active.sync="showJobDialog">
      <md-dialog-title>{{ jobDialog.title }}</md-dialog-title>
      <md-dialog-content>
        <md-field>
          <label>Name</label>
          <md-input v-model="jobDialog.name"></md-input>
        </md-field>
        <md-field>
          <label>Description</label>
          <md-input v-model="jobDialog.memo"></md-input>
        </md-field>
        <md-field>
          <label for="movies">Mail Group</label>
          <md-select v-model="jobDialog.mailGroupIds" multiple>
            <md-option
              v-for="(mailGroup, index) in dataMailGrouplist"
              v-bind:key="index"
              :value="mailGroup.id"
              >{{ mailGroup.name }}</md-option
            >
          </md-select>
        </md-field>
        <md-field>
          <label>Location</label>
          <md-input v-model="jobDialog.location" readonly></md-input>
        </md-field>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showJobDialog = false"
          >Cancel</md-button
        >
        <md-button class="md-primary" @click="onJobDialogSaveClick"
          >Save</md-button
        >
      </md-dialog-actions>
    </md-dialog>

    <md-dialog-confirm
      :md-active.sync="groupDeleteDialog.active"
      md-title="確定要刪除?"
      md-confirm-text="確定"
      md-cancel-text="取消"
      @md-cancel="groupDeleteDialog.active = false"
      @md-confirm="onGroupDeleteClick(groupDeleteDialog.group)"
    ></md-dialog-confirm>

    <md-dialog-confirm
      :md-active.sync="folderDeleteDialog.active"
      md-title="確定要刪除?"
      md-confirm-text="確定"
      md-cancel-text="取消"
      @md-cancel="folderDeleteDialog.active = false"
      @md-confirm="onFolderDeleteClick(folderDeleteDialog.folder)"
    ></md-dialog-confirm>

    <md-dialog-confirm
      :md-active.sync="jobDeleteDialog.active"
      md-title="確定要刪除?"
      md-confirm-text="確定"
      md-cancel-text="取消"
      @md-cancel="jobDeleteDialog.active = false"
      @md-confirm="onJobDeleteClick(jobDeleteDialog.job)"
    ></md-dialog-confirm>

    <md-dialog-alert
      :md-active.sync="alert.visible"
      :md-content="alert.content"
      md-confirm-text="Close"
    />
  </div>
</template>

<script>
export default {
  name: "Jobs",
  data() {
    return {
      dataGrouplist: [],
      dataMailGrouplist: [],
      dataJob: {},
      expandSingle: false,
      showRunJobDialog: false,
      runJobDialogTitle: "",
      showGroupDialog: false,
      groupDialog: {
        id: "",
        title: "",
        memo: "",
        mailGroupIds: [],
      },
      showFolderDialog: false,
      folderDialog: {
        id: "",
        groupId: "",
        title: "",
        memo: "",
        mailGroupIds: [],
        location: "",
      },
      showJobDialog: false,
      jobDialog: {
        id: "",
        groupId: "",
        folderId: "",
        title: "",
        memo: "",
        mailGroupIds: [],
        location: "",
      },
      runJobIds: [],
      groupDeleteDialog: {
        active: false,
        groupId: "",
      },
      folderDeleteDialog: {
        active: false,
        folder: "",
      },
      jobDeleteDialog: {
        active: false,
        jobId: "",
      },
      alert: {
        content: "",
        visible: false,
      },
    };
  },
  created() {
    this.getGroupList();
    this.getMailGroupList();
  },
  methods: {
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
            this.dataGrouplist = [];
            this.$nextTick(() => {
              results.forEach((item) => {
                let newResult = { ...item };
                this.dataGrouplist.push(newResult);
              });
            });
          } else {
            // 請求失敗
            this.alert.content = "取得紀錄詳情失敗";
            this.alert.visible = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getMailGroupList() {
      this.$http({
        method: "post",
        url: "setting/getMailGroups",
        data: JSON.stringify({
          pageIndex: 1,
          pageSize: 10000,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          const respData = resp.data;
          if (respData.returnCode === 1) {
            // 請求成功
            // console.log("respData.data.content = ", respData.data);
            const results = respData.data.content;
            this.dataMailGrouplist = [];
            this.$nextTick(() => {
              results.forEach((item) => {
                let newResult = { ...item };
                this.dataMailGrouplist.push(newResult);
              });
            });
          } else {
            // 請求失敗
            this.alert.content = "取得紀錄詳情失敗";
            this.alert.visible = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onItemActionClick() {},
    onGroupAddClick() {
      this.groupDialog.title = "Add Group";
      this.groupDialog.id = "";
      this.groupDialog.name = "";
      this.groupDialog.memo = "";
      this.groupDialog.mailGroupIds = [];
      this.showGroupDialog = true;
    },
    onGroupEditClick(group) {
      this.groupDialog.title = "Edit Group";
      this.groupDialog.id = group.id;
      this.groupDialog.name = group.name;
      this.groupDialog.memo = group.memo;
      this.groupDialog.mailGroupIds = group.mailGroupIds;
      this.showGroupDialog = true;
    },
    onGroupDeleteClick(group) {
      this.$http({
        method: "post",
        url: "job/deleteGroup",
        params: {
          groupId: group.id,
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
            const results = respData.data;
            this.alert.content = "刪除成功";
            this.alert.visible = true;
            this.getGroupList();
          } else {
            // 請求失敗
            this.alert.content = "取得紀錄詳情失敗";
            this.alert.visible = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onGroupDialogSaveClick() {
      this.$http({
        method: "post",
        url: "job/saveGroup",
        data: JSON.stringify({
          id: this.groupDialog.id,
          mailGroupIds: this.groupDialog.mailGroupIds,
          memo: this.groupDialog.memo,
          name: this.groupDialog.name,
        }),
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
            this.getGroupList();
            this.showGroupDialog = false;
          } else {
            // 請求失敗
            this.alert.content = "取得紀錄詳情失敗";
            this.alert.visible = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onFolderAddClick(group) {
      this.folderDialog.title = "Add Folder";
      this.folderDialog.groupId = group.id;
      this.folderDialog.id = "";
      this.folderDialog.name = "";
      this.folderDialog.memo = "";
      this.folderDialog.mailGroupIds = group.mailGroupIds;
      this.folderDialog.location = group.name;
      this.showFolderDialog = true;
    },
    onFolderEditClick(group, folder) {
      this.folderDialog.title = "Edit Folder";
      this.folderDialog.groupId = group.id;
      this.folderDialog.id = folder.id;
      this.folderDialog.name = folder.name;
      this.folderDialog.memo = folder.memo;
      this.folderDialog.mailGroupIds = folder.mailGroupIds;
      this.folderDialog.location = group.name;
      this.showFolderDialog = true;
    },
    onFolderDeleteClick(folder) {
      this.$http({
        method: "post",
        url: "job/deleteFolder",
        params: {
          folderId: folder.id,
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
            const results = respData.data;
            this.alert.content = "刪除成功";
            this.alert.visible = true;
            this.getGroupList();
          } else {
            // 請求失敗
            this.alert.content = "取得紀錄詳情失敗";
            this.alert.visible = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onFolderDialogSaveClick() {
      this.$http({
        method: "post",
        url: "job/saveFolder",
        data: JSON.stringify({
          groupId: this.folderDialog.groupId,
          folderId: this.folderDialog.id,
          mailGroupIds: this.folderDialog.mailGroupIds,
          memo: this.folderDialog.memo,
          name: this.folderDialog.name,
        }),
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
            this.getGroupList();
            this.showFolderDialog = false;
          } else {
            // 請求失敗
            this.alert.content = "取得紀錄詳情失敗";
            this.alert.visible = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onJobAddClick(group, folder) {
      this.dataJob = {};
      this.jobDialog.title = "Add Job";
      this.jobDialog.groupId = group.id;
      this.jobDialog.folderId = folder.id;
      this.jobDialog.id = "";
      this.jobDialog.name = "";
      this.jobDialog.memo = "";
      this.jobDialog.mailGroupIds = folder.mailGroupIds;
      this.jobDialog.location = group.name + " > " + folder.name;
      this.showJobDialog = true;
    },
    onJobEditClick(group, folder, job) {
      this.$http({
        method: "post",
        url: "job/getJob",
        params: {
          jobId: job.jobId,
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
            const results = respData.data;

            this.$nextTick(() => {
              this.dataJob = results;
              this.jobDialog.title = "Edit Job";
              this.jobDialog.groupId = group.id;
              this.jobDialog.folderId = folder.id;
              this.jobDialog.id = results.jobId;
              this.jobDialog.name = results.name;
              this.jobDialog.memo = results.memo;
              this.jobDialog.mailGroupIds = results.mailGroupIds;
              this.jobDialog.location = group.name + " > " + folder.name;
              this.showJobDialog = true;
            });
          } else {
            // 請求失敗
            this.alert.content = "取得紀錄詳情失敗";
            this.alert.visible = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onJobDeleteClick(job) {
      this.$http({
        method: "post",
        url: "job/deleteJob",
        params: {
          jobId: job.jobId,
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
            const results = respData.data;
            this.alert.content = "刪除成功";
            this.alert.visible = true;
            this.getGroupList();
          } else {
            // 請求失敗
            this.alert.content = "取得紀錄詳情失敗";
            this.alert.visible = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onJobDialogSaveClick() {
      this.$http({
        method: "post",
        url: "job/saveJob",
        data: JSON.stringify({
          ...this.dataJob,
          mailGroupIds: this.jobDialog.mailGroupIds,
          memo: this.jobDialog.memo,
          name: this.jobDialog.name,
          groupId: this.jobDialog.groupId,
          folderId: this.jobDialog.folderId,
        }),
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
            this.getGroupList();
            this.showJobDialog = false;
          } else {
            // 請求失敗
            this.alert.content = "取得紀錄詳情失敗";
            this.alert.visible = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    filterJobIds(obj) {
      if (obj.folders) {
        obj.folders.forEach((folder) => {
          this.filterJobIds(folder);
        });
      } else if (obj.jobs) {
        obj.jobs.forEach((job) => {
          this.filterJobIds(job);
        });
      } else {
        this.runJobIds.push(obj.jobId);
      }
    },
    onRunJobClick(obj) {
      this.runJobIds = [];
      this.filterJobIds(obj);
      this.showRunJobDialog = true;
      this.runJobDialogTitle = "立即執行 '" + obj.name + "' ?";
    },
    onRunJobDialogConfirm() {
      this.runJobIds.forEach((jobId) => {
        this.$http({
          method: "post",
          url: "job/start",
          params: {
            jobId: jobId,
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
              const results = respData.data;
            } else {
              // 請求失敗
              this.alert.content = "取得紀錄詳情失敗";
              this.alert.visible = true;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.full-control {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
}

.list {
  width: $list-width;
}

.full-control > .md-list {
  display: inline-block;
  width: $list-width;
  max-width: 100%;
  overflow: auto;
  vertical-align: top;
  border: 1px solid rgba(#000, 0.12);
}

.control {
  display: flex;
  flex-direction: column;
  width: calc(100vw - #{$list-width} - #{$padding} * 4);
  min-width: 540px;
  padding: $padding;
}
</style>

<style lang="scss">
.md-list {
  .md-list-item-title {
    position: absolute;
    left: 56px;
  }

  .md-list-item-expand {
    .md-list-item-content {
      > .md-icon:first-child {
        margin-right: unset;
      }

      > .md-icon:last-child {
        position: absolute;
        left: #{$padding};
        margin-left: unset;
      }

      > .md-list-action:last-of-type {
        position: absolute;
        right: #{$padding};
      }
    }

    .md-list-item-expand {
      padding-left: #{$padding};

      .md-list-item-content {
        > .md-icon:first-child {
          margin-right: unset;
        }

        > .md-icon:last-child {
          position: absolute;
          left: #{$padding};
          margin-left: unset;
        }

        > .md-list-action:last-of-type {
          position: absolute;
          right: #{$padding};
        }
      }
    }
  }

  &.md-theme-default {
    .md-list-item-expand {
      &.md-active {
        border-color: transparent;
      }
    }
  }
}
</style>
