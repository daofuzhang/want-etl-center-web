<template lang="pug">
  .base-progress
    .progress
      .progress__current(:style="{ width : progressBar }")
</template>

<script>
export default {
  props: {
    /**
     * 進度比例
     */
    progressBar: {
      type: String,
      default: '0%',
    }
  }
}
</script>

<style lang="scss" scoped>
.base-progress {
  .progress {
    position: relative;
    width: 100%;
    height: 1rem;
    background-color: lighten($main-color-green, 15%);

    &__current {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 0;
      height: 100%;
      background-color: $main-color-green;
    }
  }
}
</style>
