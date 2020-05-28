<template lang="pug">
  .the-breadcrumb(v-if="titleList[0].name")
    .container
      .titles
        .titles__main
          router-link.titles__item(:to="{ name : title.router || '' }"
            tag="h2" v-for="title, index in titleList"
            :key="index"
            :class="{ 'is-herf' : title.router }") {{ title.name }}
            icon.titles__icon(name="angle-right")
      .buttons(v-if="buttonList[0].id")
        .buttons__main
          .buttons__item(v-for="button in buttonList"
            :key="button.id"
            @click="action(button.id)") {{ button.buttonName }}
</template>

<script>
export default {
  props: {
    /**
     * 麵包屑名稱及路徑
     */
    titleList: {
      type: Array,
      default: () => [
        {
          name: '',
          router: ''
        }
      ],
    },
    /**
     * 麵包屑按鈕
     */
    buttonList: {
      type: Array,
      default: () => [
        {
          id: '', // 必填
          buttonName: ''
        }
      ],
    }
  },
  methods: {
    /**
     * 傳送麵包屑按鈕動作
     */
    action(id) {
      this.$bus.$emit(`breadcrumb-action-${id}`, true)
    }
  }
}
</script>

<style lang="scss" scoped>
.the-breadcrumb {
  background-color: #fff;
  box-shadow: 0 2px 2px 1px #666;

  > .container {
    position: relative;
    padding: 0.5rem 15px;
  }

  .titles {
    display: block;

    @media screen and (min-width: $break-point-a) {
      display: inline-block;
    }

    &__main {
      display: flex;
      align-items: center;
    }

    &__item {
      display: inline-block;
      font-size: 1.2em;

      &:last-of-type {
        svg {
          display: none;
        }
      }

      &.is-herf {
        text-decoration: underline;
        cursor: pointer;
      }
    }

    &__icon {
      width: 20px;
      height: 20px;
      vertical-align: -4px;
    }
  }

  .buttons {
    display: block;

    @media screen and (min-width: $break-point-a) {
      display: inline-block;
    }

    &__main {
      @extend .titles__main;

      margin-top: 10px;

      @media screen and (min-width: $break-point-a) {
        margin-top: unset;
        margin-left: 50px;
      }
    }

    &__item {
      padding: 3px 10px;
      cursor: pointer;
      user-select: none;
      border: 1px solid $main-color;
      border-radius: $main-border-radius;

      &:not(:last-of-type) {
        margin-right: 10px;
      }

      &:hover {
        @include transition(background-color);

        color: #fff;
        background-color: $main-color;
      }
    }
  }
}
</style>
