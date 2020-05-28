<template lang="pug">
  .the-header
    .container
      h1 同步中心
      .nav__icon(@click="navShow = !navShow")
        icon(name="bars" v-show="!navShow")
        icon.nav__icon-close(name="close" v-show="navShow")
      .cb

      ul.nav.device__pc
        router-link.nav__item(v-for="item, index in navItem"
          :key="index"
          :to="{ name : item.name }"
          tag="li"
          :class="{ active : item.name.indexOf($route.name) > -1 }"
          @click.native="navShow = !navShow") {{ item.title }}
      .log-out.device__pc(@click="logout") 登出

    slide-up-down.device__mobile(:active="navShow"
      :duration="500"
      :use-hidden="true")
      ul.nav.container
        router-link.nav__item(v-for="item, index in navItem"
          :key="index"
          :to="{ name : item.name }"
          tag="li"
          :class="{ active : item.name.indexOf($route.name) > -1 }"
          @click.native="navShow = !navShow") {{ item.title }}
      .log-out.device__mobile(@click="logout") 登出
</template>

<script>
import SlideUpDown from 'vue-slide-up-down'

export default {
  components: {
    SlideUpDown,
  },
  data() {
    return {
      navItem: [
        {
          title: 'Schema',
          name: 'schemaList'
        },
        {
          title: '工作者',
          name: 'workerList'
        },
        {
          title: '同步任務',
          name: 'taskList'
        },
        {
          title: '存儲程序任務',
          name: 'storeProcedureList'
        },
        {
          title: '紀錄',
          name: 'logList'
        }
      ],
      navShow: false,
    }
  },
  beforeRouteLeave(to, from , next) {
    this.$loading(true)
    this.navShow = false
    setTimeout(() => {
      next()
    }, 200)
  },
  methods: {
    // getRouteName() {
    //   this.$route.name
    // },
    /**
     * 登出
     */
    logout() {
      this.$clearLocalStorage()
      this.$router.push({ name: 'login' })
    },
  },
}
</script>

<style lang="scss" scoped>
$header-height: 70px;
$left: 50px;
$nav-item-height: 4em;
$padding: 5px;
$container-mobile-color: #323031;

.the-header {
  width: 100%;
  min-height: $header-height;
  color: $main-color-font;
  background-color: $main-color;

  @media screen and (min-width: $break-point-b) {
    display: flex;
    height: $header-height;
  }

  > .container {
    padding: $padding 15px;

    @media screen and (min-width: $break-point-b) {
      display: flex;
      align-items: center;
    }
  }

  h1 {
    display: inline-block;
    font-size: 1.5em;
    line-height: $header-height - ($padding * 2);

    @media screen and (min-width: $break-point-b) {
      line-height: unset;
    }
  }

  .nav {
    width: 100%;

    @media screen and (min-width: $break-point-b) {
      display: block;
      width: calc(100% - (1.5em * 4) - #{$left} - (1em * 2));
      margin-left: $left;
    }

    &__item {
      display: block;
      height: $nav-item-height;
      line-height: $nav-item-height;
      text-align: center;
      cursor: pointer;
      border-top: 1px solid #fff;

      @media screen and (min-width: $break-point-b) {
        display: inline-block;
        border-top: unset;
      }

      &:not(:last-of-type) {
        @media screen and (min-width: $break-point-b) {
          margin-right: 25px;
        }
      }

      &:hover {
        @include transition(color);

        color: $main-color-contrast;
      }
    }

    &__icon {
      float: right;
      line-height: $header-height - ($padding * 2);
      color: $main-color-font;
      vertical-align: middle;

      @media screen and (min-width: $break-point-b) {
        display: none;
      }

      &:hover {
        @include transition(color);

        color: $main-color-contrast;
        cursor: pointer;
      }

      &-close {
        width: 18px;
        height: 18px;
      }
    }
  }

  .log {
    &-out {
      @extend .nav__item;

      // border-bottom: unset;
    }
  }

  .device {
    &__pc {
      display: none;

      @media screen and (min-width: $break-point-b) {
        display: block;
      }
    }

    &__mobile {
      display: block;
      background-color: $container-mobile-color;

      @media screen and (min-width: $break-point-b) {
        display: none;
      }
    }
  }

  .active {
    color: $main-color-contrast;
  }

  .cb {
    clear: both;
  }
}
</style>
