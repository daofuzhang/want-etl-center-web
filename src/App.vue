<template>
  <div class="page-container">
    <md-toolbar class=" md-primary">
      <div class="md-toolbar-section-start">
        <span class="md-title">WantETL</span>
        <md-tabs class="md-primary">
          <md-tab md-label="Dashborad" :to="{ name: 'Dashborad' }"></md-tab>
          <md-tab md-label="Jobs" :to="{ name: 'Jobs' }"></md-tab>
          <md-tab md-label="Report" :to="{ name: 'Report' }"></md-tab>
          <md-tab md-label="Setting" :to="{ name: 'Setting' }"></md-tab>
        </md-tabs>
        <div class="md-toolbar-section-end">
          <span class="md-title">Hi, Username!</span>
          <md-button>
            Logout
          </md-button>
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
  name: "App",
  data() {
    return {
      showNavigation: false,
      showSidepanel: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
  },
};
</script>

<style lang="scss" scoped>
.page-container {
  position: relative;
  min-height: 300px;
  overflow: hidden;
  border: 1px solid rgba(#000, 0.12);
}

.md-content {
  padding: 16px;
}
</style>
