<template lang="pug">
  .base-alert(v-if="visible")
    .alert
      .alert__close(@click="close" v-if="visibleClose")
        icon(name="close")
      .alert__title(v-if="title") {{ title }}
      .alert__content {{ content }}
      .alert__footer(v-if="footer") {{ footer }}
      .alert__buttons
        .alert__buttons__item(
          :class="{ cancel : buttonTxtLeftCancel }"
          @click="button()"
          v-if="buttonTxtLeft") {{ buttonTxtLeft }}
        .alert__buttons__item(
          :class="{ cancel : buttonTxtRightCancel }"
          @click="button('right')"
          v-if="buttonTxtRight") {{ buttonTxtRight }}
</template>

<script>
export default {
  props: {
    /**
     * 顯示 Alert，非必填
     */
    visible: {
      type: Boolean,
      default: false,
    },
    /**
     * 標題，非必填
     */
    title: {
      type: String,
      default: '',
    },
    /**
     * 內容，必填
     */
    content: {
      type: String,
      required: true,
      default: '',
    },
    /**
     * 小字註解，非必填
     */
    footer: {
      type: String,
      default: '',
    },
    /**
     * 按鈕1，非必填
     */
    buttonTxtLeft: {
      type: String,
      default: '',
    },
    /**
     * 按鈕2，非必填
     */
    buttonTxtRight: {
      type: String,
      default: '',
    },
    /**
     * 按鈕1淺色按鈕，非必填
     * 預設深色按鈕
     */
    buttonTxtLeftCancel: {
      type: Boolean,
      default: false,
    },
    /**
     * 按鈕2淺色按鈕，非必填
     * 預設深色按鈕
     */
    buttonTxtRightCancel: {
      type: Boolean,
      default: false,
    },
    /**
     * 顯示 Close icon，非必填
     */
    visibleClose: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    /**
     * 通知父組件按鈕點擊
     */
    button(position = 'left') {
      this.$emit(`alert-button-${position}`)
    },
    /**
     * 點擊關閉
     */
    close() {
      this.$emit('alert-button-close')
    },
  }
}
</script>

<style lang="scss" scoped>
.base-alert {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2147483647;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);

  .alert {
    position: relative;
    width: 500px;
    max-width: 90%;
    padding: 20px 25px;
    background-color: #fff;
    border-radius: $main-border-radius;

    &__close {
      position: absolute;
      top: 10px;
      right: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      color: $main-color;
      cursor: pointer;
      border: 1px solid #fff;
      border-radius: 100%;

      &:hover {
        @include transition(all);

        color: $main-color-font;
        background-color: $main-color;
        border: 1px solid $main-color;
      }

      svg {
        width: 100%;
        height: 100%;
      }
    }

    &__title {
      padding: 10px 0;
      font-size: 1.2em;
      font-weight: bold;
      border-bottom: 1px solid $main-color-light;
    }

    &__content {
      @extend .alert__title;

      font-size: 1em;
      font-weight: unset;
    }

    &__footer {
      padding: 10px 0;
      font-size: 0.8em;
    }

    &__buttons {
      display: flex;
      justify-content: flex-end;
      margin-top: 25px;

      &__item {
        @extend %buttonNormal;

        padding: 10px;
        font-size: 1em;

        &.cancel {
          opacity: 0.7;
        }
      }
    }
  }
}
</style>
