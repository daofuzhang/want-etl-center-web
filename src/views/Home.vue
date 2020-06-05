<template>
  <div class="page-container">
    <md-toolbar class="md-primary">
      <div class="md-toolbar-section-start">
        <span class="md-title">WantETL</span>
        <md-tabs class="md-primary" :mdSyncRoute="true">
          <md-tab
            v-for="(tab, index) in dataTabes"
            v-bind:key="index"
            :id="tab"
            :md-label="tab"
            :to="{ name: tab }"
          ></md-tab>
        </md-tabs>
        <div class="md-toolbar-section-end">
          <span class="md-title">Hi, {{userName}} ({{userId}})!</span>
          <md-button @click="logoutButtonClick">Logout</md-button>
        </div>
      </div>
    </md-toolbar>
    <md-content>
      <router-view></router-view>
    </md-content>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      dataTabes: ["Dashborad", "Jobs", "Report", "Setting"],
      userId: localStorage.getItem("userId"),
      userName: localStorage.getItem("userName"),
      showNavigation: false,
      showSidepanel: false
    };
  },
  methods: {
    logoutButtonClick() {
      localStorage.setItem("authorization", "");
      localStorage.setItem("userId", "");
      localStorage.setItem("userName", "");
      this.$router.push({ name: "Login" });
    }
  }
};
</script>

<style lang="scss" scoped>
.page-container {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(#000, 0.12);
}

.md-content {
  min-height: calc(100vh - 64px - #{$padding} * 2);
  padding: #{$padding};
}
</style>
