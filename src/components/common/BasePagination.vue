<template lang="pug">
  .base-pagination(v-if="visible")
    .pagination__cover
      .pagination__prev(:class="{ 'pagination--disable' : !visiblePagePrev }"
        @click="pagePrev") &lt;
      .pagination__items
        .pagination__item(v-for="(item, index) in pagesList"
          :key="index"
          :class="{ 'pagination--current' : item === pageCurrent }"
          @click="pageChange(item)") {{ item }}
      .pagination__next(:class="{ 'pagination--disable' : !visiblePageNext }"
        @click="pageNext") &gt;
    .pagination__cover
      .pagination__go 前往第&nbsp;
        input(type="text"
          v-model.trim="pageGo"
          @keyup="onInput"
          @keypress.enter="pageChange(pageGo)")
        | &nbsp;頁
      .pagination__go-button(@click="pageChange(pageGo)") Go
      .pagination__total 共&nbsp;
        span {{ pageTotal | commaFormat }}
        | &nbsp;頁

    Alert(:content="alertContent"
      :visible="alertVisible"
      :visibleClose="false"
      buttonTxtRight="確認"
      @alert-button-right="alertVisible = false"
      @alert-button-close="alertVisible = false")
</template>

<script>
export default {
  props: {
    /**
     * 是否顯示分頁
     */
    visible: {
      type: Boolean,
      default: false
    },
    /**
     * 總個數
     */
    total: {
      type: Number,
      default: 0
    },
    /**
     * 總頁數
     */
    pageTotal: {
      type: Number,
      default: 0
    },
    /**
     * 所在頁碼
     * 頁碼由 1 開始
     */
    current: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      pagesList: [], // 頁碼列
      pagesListAmount: 5, // 顯示頁碼數
      pageCurrent: this.current, // 所在頁碼
      pageStart: 1, // 頁碼列首
      pageEnd: 5, // 頁碼列尾
      pageGo: this.current, // 前往頁碼
      visiblePageNext: false, // 下一頁是否可點擊
      visiblePagePrev: false, // 上一頁是否可點擊
      alertContent: "", // 提示訊息內容-公用
      alertVisible: false // 提示訊息顯示-公用
    };
  },
  watch: {
    current() {
      this.pageCurrent = this.current;
    },
    pageCurrent() {
      this.pageGo = this.pageCurrent;
      this.pageNextAndPrevCheck();
      this.$emit("pagination-page-current", this.pageCurrent);
    },
    pageTotal() {
      this.pageNextAndPrevCheck();
    }
  },
  mounted() {
    this.pageListInit();
    this.pageNextAndPrevCheck();
  },
  methods: {
    /**
     * 初始化頁碼列
     */
    pageListInit() {
      if (this.current <= 0) return (this.visible = false);
      const pageCurrentPosition =
        this.pageCurrent % this.pagesListAmount > 0
          ? this.pageCurrent % this.pagesListAmount
          : 5;
      this.pagesList = [];
      this.pageEnd =
        this.pageCurrent + (this.pagesListAmount - pageCurrentPosition);
      this.pageStart = this.pageEnd - (this.pagesListAmount - 1);
      for (
        let i = this.pageStart;
        i < this.pageStart + this.pagesListAmount;
        i++
      ) {
        if (i <= this.pageTotal) {
          this.pagesList.push(i);
        } else {
          return;
        }
      }
    },
    /**
     * 跳頁
     */
    pageChange(page) {
      const pageGet = parseInt(page);
      if (pageGet > this.pageTotal || pageGet < 1) {
        this.alertContent = "頁數不存在";
        this.alertVisible = true;
        this.pageGo = this.pageCurrent;
        return;
      }
      this.setTopAndLeftPosition();
      this.pageCurrent = pageGet;
    },
    /**
     * 檢查是否有上一頁、下一頁
     */
    pageNextAndPrevCheck() {
      this.visiblePageNext = this.pageTotal - this.pageCurrent > 0;
      this.visiblePagePrev = this.pageCurrent - 1 > 0;
      this.setTopAndLeftPosition();
      this.pageListCheck();
    },
    /**
     * 下一頁
     */
    pageNext() {
      const pageNext = this.pageCurrent + 1;
      if (pageNext > this.pageTotal) return;
      this.pageCurrent = this.pageCurrent + 1;
      this.pageNextAndPrevCheck();
    },
    /**
     * 上一頁
     */
    pagePrev() {
      const pagePrev = this.pageCurrent - 1;
      if (pagePrev < 1) return;
      this.pageCurrent = this.pageCurrent - 1;
      this.pageNextAndPrevCheck();
    },
    /**
     * 檢查是否需初始化頁碼列
     */
    pageListCheck() {
      if (
        this.pageCurrent > this.pageEnd ||
        this.pageCurrent < this.pageStart ||
        this.pageCurrent === 1
      )
        this.pageListInit();
    },
    /**
     * 頁碼輸入內容檢查
     */
    onInput(event) {
      this.pageGo = this.$options.filters.inputNum(event.target.value);
    },
    /**
     * 切換分頁時將頁面內容拉回到左上角
     */
    setTopAndLeftPosition() {
      this.$nextTick(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        document.body.scrollLeft = 0;
        document.documentElement.scrollLeft = 0;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$color-current: #39a0ed;
$color-disable: lighten($main-color-light, 30%);

.base-pagination {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
  font-size: 14px;
  color: $main-color-light;

  @media screen and (min-width: $break-point-a) {
    flex-direction: row;
    padding: 10px 15px;
  }

  .pagination {
    &__cover {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 100%;
      margin-top: 10px;

      @media screen and (min-width: $break-point-a) {
        width: auto;
      }
    }

    &__prev {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2em;
      height: 2.5rem;
      font-weight: bold;
      color: $main-color-font;
      text-align: center;
      cursor: pointer;
      user-select: none;
      background-color: $main-color;

      @media screen and (min-width: $break-point-a) {
        color: unset;
        background-color: unset;

        &:hover {
          @include transition(all);

          color: $main-color;
          transform: scale(1, 1.5);
        }
      }
    }

    &__next {
      @extend .pagination__prev;
    }

    &__items {
      display: flex;
      width: calc(100% - (2em * 2));
      background-color: $color-disable;
      border-right: 1px solid $main-color-font;
      border-left: 1px solid $main-color-font;

      @media screen and (min-width: $break-point-a) {
        background-color: unset;
        border: unset;
      }
    }

    &__item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20%;
      min-width: 1.7em;
      height: 2.5rem;
      padding: 0 5px;
      font-size: 1.2em;
      color: $main-color-font;
      text-align: center;
      cursor: pointer;
      user-select: none;
      background-color: $main-color;

      @media screen and (min-width: $break-point-a) {
        width: auto;
        height: auto;
        color: unset;
        background-color: unset;
        border-right: unset;

        &:hover {
          @include transition(all);

          color: $main-color;
          transform: scale(1, 1.5);
        }
      }

      &:not(:last-of-type) {
        border-right: 1px solid $main-color-font;
      }
    }

    &__go {
      width: 50%;
      margin-left: 10px;
      text-align: right;
      user-select: none;

      @media screen and (min-width: $break-point-a) {
        width: auto;
        text-align: left;
      }

      input {
        width: 5.5em;
        padding: 3px;
        color: $main-color;
        text-align: center;
        border: 1px solid $main-color;

        @media screen and (min-width: $break-point-a) {
          width: 3.5em;
        }
      }

      &-button {
        @extend %buttonNormal;

        width: 20%;
        padding: 5px;
        margin-left: 10px;

        @media screen and (min-width: 321px) {
          width: 28%;
        }

        @media screen and (min-width: 441px) {
          width: 10em;
        }

        @media screen and (min-width: $break-point-a) {
          width: 3.5em;
        }
      }
    }

    &__total {
      user-select: none;
    }

    &--current {
      background-color: $color-current;

      @media screen and (min-width: $break-point-a) {
        color: $color-current;
        background-color: unset;
        transform: scale(1, 1.5);

        &:hover {
          color: $color-current;
          transform: scale(1, 1.5);
        }
      }
    }

    &--disable {
      cursor: not-allowed;
      background-color: $color-disable;

      @media screen and (min-width: $break-point-a) {
        color: lighten($main-color, 50%);
        background-color: unset;

        &:hover {
          @include transition(none);

          color: lighten($main-color, 50%);
          transform: unset;
        }
      }
    }
  }
}
</style>
