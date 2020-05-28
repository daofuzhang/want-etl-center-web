<template lang="pug">
  .base-loading(v-if="visible")
    .loading
      .loading__fade
        .loading__fade-dot
        .loading__fade-dot
        .loading__fade-dot
        .loading__fade-dot
        .loading__fade-dot
        .loading__fade-dot
        .loading__fade-dot
        .loading__fade-dot
        .loading__fade-dot
        .loading__fade-dot
        .loading__fade-dot
        .loading__fade-dot
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.base-loading {
  .loading {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2147483647;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.9);

    &__fade {
      position: relative;
      width: 40px;
      height: 40px;

      &-dot {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        &::before {
          display: block;
          width: 20%;
          height: 20%;
          content: '';
          background-color: #fff;
          border-radius: 100%;
          animation: circle 1.2s infinite ease-in-out both;
        }

        &:nth-child(1) {
          transform: rotate(30deg);

          &::before {
            animation-delay: -1.1s;
          }
        }

        &:nth-child(2) {
          transform: rotate(60deg);

          &::before {
            animation-delay: -1s;
          }
        }

        &:nth-child(3) {
          transform: rotate(90deg);

          &::before {
            animation-delay: -0.9s;
          }
        }

        &:nth-child(4) {
          transform: rotate(120deg);

          &::before {
            animation-delay: -0.8s;
          }
        }

        &:nth-child(5) {
          transform: rotate(150deg);

          &::before {
            animation-delay: -0.7s;
          }
        }

        &:nth-child(6) {
          transform: rotate(180deg);

          &::before {
            animation-delay: -0.6s;
          }
        }

        &:nth-child(7) {
          transform: rotate(210deg);

          &::before {
            animation-delay: -0.5s;
          }
        }

        &:nth-child(8) {
          transform: rotate(240deg);

          &::before {
            animation-delay: -0.4s;
          }
        }

        &:nth-child(9) {
          transform: rotate(270deg);

          &::before {
            animation-delay: -0.3s;
          }
        }

        &:nth-child(10) {
          transform: rotate(300deg);

          &::before {
            animation-delay: -0.2s;
          }
        }

        &:nth-child(11) {
          transform: rotate(330deg);

          &::before {
            animation-delay: -0.1s;
          }
        }
      }
    }
  }
}

@keyframes circle {
  0%,
  39%,
  100% {
    opacity: 0;
    transform: scale(0.6);
  }

  40% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>