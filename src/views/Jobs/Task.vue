<template>
  <md-card>
    <md-card-header class="md-layout md-alignment-space-between">
      <div class="md-layout-item md-title">#{{ index + 1 }}</div>
      <md-button class="md-icon-button md-accent" @click="onDeleteButtonClick">
        <md-icon>clear</md-icon>
      </md-button>
    </md-card-header>
    <md-card-content>
      <md-field>
        <label>Description</label>
        <md-input v-model="dataTask.memo"></md-input>
      </md-field>
    </md-card-content>
    <md-card-expand>
      <md-card-actions class="md-layout md-alignment-center">
        <md-card-expand-trigger>
          <md-button class="md-icon-button">
            <md-icon>keyboard_arrow_down</md-icon>
          </md-button>
        </md-card-expand-trigger>
      </md-card-actions>
      <md-card-expand-content>
        <md-card-content>
          <md-field>
            <label>Type</label>
            <md-select v-model="dataTask.type">
              <md-option
                v-for="(type, index) in typeList"
                v-bind:key="index"
                :value="type.value"
                >{{ type.name }}</md-option
              >
            </md-select>
          </md-field>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-50">
              <span class="md-subheading">FROM:</span>
              <md-field v-if="['sync'].includes(dataTask.type)">
                <label>Source Server</label>
                <md-select v-model="dataTask.sourceServerId">
                  <md-option
                    v-for="(server, index) in jdbcServerList"
                    v-bind:key="index"
                    :value="server.id"
                    >{{ server.name }}</md-option
                  >
                </md-select>
              </md-field>
              <md-field v-if="['sync'].includes(dataTask.type)">
                <label>Statement (SQL: Select)</label>
                <md-textarea v-model="dataTask.statement"></md-textarea>
              </md-field>
              <md-field v-if="['jco'].includes(dataTask.type)">
                <label>JCO Server</label>
                <md-select v-model="dataTask.functionServerId">
                  <md-option
                    v-for="(server, index) in jcoServerList"
                    v-bind:key="index"
                    :value="server.id"
                    >{{ server.name }}</md-option
                  >
                </md-select>
              </md-field>
              <md-field v-if="['jco'].includes(dataTask.type)">
                <label>Function</label>
                <md-input v-model="dataTask.function"></md-input>
              </md-field>
              <md-field v-if="['jco'].includes(dataTask.type)">
                <label>Input Table (JSON)</label>
                <md-textarea v-model="dataTask.importForm"></md-textarea>
              </md-field>
            </div>
            <div class="md-layout-item md-size-50">
              <span class="md-subheading">TO:</span>
              <md-field
                v-if="
                  [
                    'sync',
                    'truncate',
                    'delete',
                    'call',
                    'check',
                    'jco',
                  ].includes(dataTask.type)
                "
              >
                <label>Target Server</label>
                <md-select v-model="dataTask.targetServerId">
                  <md-option
                    v-for="(server, index) in jdbcServerList"
                    v-bind:key="index"
                    :value="server.id"
                    >{{ server.name }}</md-option
                  >
                </md-select>
              </md-field>
              <md-field
                v-if="
                  ['sync', 'truncate', 'delete', 'jco'].includes(dataTask.type)
                "
              >
                <label>Database</label>
                <md-input v-model="dataTask.database"></md-input>
              </md-field>
              <md-field
                v-if="
                  ['sync', 'truncate', 'delete', 'jco'].includes(dataTask.type)
                "
              >
                <label>Table</label>
                <md-input v-model="dataTask.table"></md-input>
              </md-field>

              <md-field v-if="['delete'].includes(dataTask.type)">
                <label>Condition (SQL: Where)</label>
                <md-textarea v-model="dataTask.condition"></md-textarea>
              </md-field>
              <md-field v-if="['check'].includes(dataTask.type)">
                <label>Statement (SQL: Select)</label>
                <md-textarea v-model="dataTask.statement"></md-textarea>
              </md-field>
              <md-field v-if="['check'].includes(dataTask.type)">
                <label>Check Rules (JSON)</label>
                <md-textarea v-model="dataTask.rules"></md-textarea>
              </md-field>
              <md-field v-if="['call'].includes(dataTask.type)">
                <label>Statement (SQL: Call)</label>
                <md-textarea v-model="dataTask.statement"></md-textarea>
              </md-field>
              <md-field
                v-if="
                  ['sync', 'jco'].includes(dataTask.type)
                "
              >
                <label>Core Size</label>
                <md-input v-model="dataTask.coreSize"></md-input>
              </md-field>
            </div>
          </div>
        </md-card-content>
      </md-card-expand-content>
    </md-card-expand>
  </md-card>
</template>

<script>
export default {
  name: "TextFields",
  props: {
    index: {
      type: Number,
    },
    current: {
      type: Object,
      default: function() {
        return {
          memo: "",
          type: "",
          sourceServerId: "",
          statement: "",
          functionServerId: "",
          function: "",
          importForm: "",
          targetServerId: "",
          database: "",
          table: "",
          condition: "",
          rules: "",
          coreSize: "",
        };
      },
    },
    jdbcServerList: {
      type: Array,
    },
    jcoServerList: {
      type: Array,
    },
  },
  data() {
    return {
      dataTask: this.current,
      typeList: [
        { name: "SYNC", value: "sync" },
        { name: "TRUNCATE", value: "truncate" },
        { name: "DELETE", value: "delete" },
        { name: "CALL", value: "call" },
        { name: "CHECK", value: "check" },
        { name: "JCO", value: "jco" },
      ],
    };
  },
  methods: {
    onDeleteButtonClick: function() {
      this.$emit("delete", this.dataTask);
    },
  },
};
</script>
