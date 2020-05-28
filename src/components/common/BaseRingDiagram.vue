<template lang="pug">
  .base-ring-diagram
    .ring-diagram__outer--large(v-if="overFiftyPercent")
      .after
      .before(:style="{ transform: `rotate(${percent}deg)` }")
    .ring-diagram__outer(v-else)
      .after(:style="{ transform: `rotate(${percent}deg)` }")
      .before
    .ring-diagram__inner
      .ring-diagram__content {{ content }}
      .ring-diagram__unit {{ unitTxt }}
</template>

<script>
export default {
  props: {
    /**
     * 內容
     */
    content: {
      type: Number,
      default: 0,
    },
    /**
     * 單位
     */
    unit: {
      type: Number,
      default: 60,
    },
    /**
     * 單位顯示文字
     */
    unitTxt: {
      type: String,
      default: '分',
    },
  },
  data() {
    return {
      overFiftyPercent: false,
      percent: 0,
    }
  },
  mounted() {
    this.calculatePercent()
  },
  methods: {
    calculatePercent() {
      const percent = Math.floor(this.content * (360 / this.unit))
      this.percent = percent <= 180 ? percent : percent - 180
      percent > 180 ? this.overFiftyPercent = true : this.overFiftyPercent = false
    },
  },
}
</script>

<style lang="scss" scoped>
$width: 90px;

.base-ring-diagram {
  position: relative;

  .ring-diagram {
    &__outer {
      position: relative;
      top: 0;
      left: 0;
      z-index: 0;
      width: $width;
      height: $width;
      background-color: lighten($main-color-light, 20%);
      border-radius: 100%;

      .before {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        width: $width / 2;
        height: $width;
        background-color: lighten($main-color-light, 20%);
        border-radius: $width / 2 0 0 $width / 2;
      }

      .after {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        width: $width / 2;
        height: $width;
        background-color: $main-color;
        border-radius: $width / 2 0 0 $width / 2;
        transform: rotate(72deg);
        transform-origin: $width / 2 $width / 2;
      }
    }

    &__outer--large {
      position: relative;
      top: 0;
      left: 0;
      z-index: 0;
      width: $width;
      height: $width;
      background-color: lighten($main-color-light, 20%);
      border-radius: 100%;

      .before {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 1;
        width: $width / 2;
        height: $width;
        background-color: $main-color;
        border-radius: 0 $width / 2 $width / 2 0;
        transform: rotate(36deg);
        transform-origin: 0 $width / 2;
      }

      .after {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 2;
        width: $width / 2;
        height: $width;
        background-color: $main-color;
        border-radius: 0 $width / 2 $width / 2 0;
      }
    }

    &__inner {
      position: absolute;
      top: ($width - ($width - 20px)) / 2;
      left: ($width - ($width - 20px)) / 2;
      z-index: 3;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: $width - 20px;
      height: $width - 20px;
      padding: 5px;
      background-color: #fff;
      border-radius: 100%;
    }

    &__content {
      width: 100%;
      font-size: 3rem;
      text-align: center;
    }

    &__unit {
      position: absolute;
      right: -12px;
      bottom: -16px;
      text-align: right;
    }
  }
}
</style>
