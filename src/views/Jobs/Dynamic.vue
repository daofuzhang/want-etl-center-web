<template>
  <md-card>
    <md-card-header class="md-layout md-alignment-space-between">
      <div class="md-layout-item md-title">#{{ index + 1 }}</div>
      <md-button class="md-icon-button md-accent" @click="onDeleteButtonClick">
        <md-icon>clear</md-icon>
      </md-button>
    </md-card-header>
    <md-card-content>
      <div class="md-layout md-gutter md-alignment-center">
        <div
          class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100"
        >
          <md-field>
            <label>name</label>
            <md-input v-model="dataDynamic.name"></md-input>
          </md-field>
        </div>
        <div
          class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100"
        >
          <md-field>
            <label>format</label>
            <md-input v-model="dataDynamic.format"></md-input>
          </md-field>
        </div>
        <div
          class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100"
        >
          <md-field>
            <label>year</label>
            <md-input v-model="dataDynamic.year" type="number"></md-input>
          </md-field>
        </div>
        <div
          class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100"
        >
          <md-field>
            <label>month</label>
            <md-input v-model="dataDynamic.month" type="number"></md-input>
          </md-field>
        </div>
        <div
          class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100"
        >
          <md-field>
            <label>date</label>
            <md-input v-model="dataDynamic.date" type="number"></md-input>
          </md-field>
        </div>
      </div>
    </md-card-content>
  </md-card>
</template>

<script>
export default {
  name: "Dynamic",
  props: {
    index: {
      type: Number,
    },
    current: {
      type: Object,
      default: function() {
        return {
          name: "",
          format: "",
          year: "",
          month: "",
          date: "",
        };
      },
    },
  },
  data() {
    return {
      dataDynamic: this.current,
    };
  },
  methods: {
    onDeleteButtonClick: function() {
      this.$emit("delete", this.dataDynamic);
    },
  },
};
</script>
