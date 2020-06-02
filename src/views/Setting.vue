<template>
  <div class="full-control">
    <div class="list">
      <md-list>
        <md-list-item v-for="(item, index) in items" v-bind:key="index" @click="onItemClick(index)">
          <span class="md-list-item-text">{{ item.name }}</span>
        </md-list-item>
      </md-list>
    </div>
    <div class="control">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashborad",
  data() {
    return {
      items: [
        { name: "User" },
        { name: "Endpoint" },
        { name: "Node" },
        { name: "Notification" }
      ]
    };
  },
  methods: {
    onItemClick(index) {
      this.$router.push({ name: this.items[index].name });
    }
  }
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
  min-width: 600px;
  padding: $padding;
}
</style>
