<template>
  <st-row class="popup-alert" justify="center" align="center">
    <div class="popup-box" :style="{width: popupWidth, minHeight: popupHeight}">
      <st-row v-if="title" class="header" justify="between" align="center">
        <h3>{{ title }}</h3>
        <a @click="close"></a>
      </st-row>
      <st-row class="create-item" align="center" direction="column">
        <h3>{{ content }}</h3>
        <st-row justify="between">
          <button @click="determine" :class="['create-submit', $i18n.locale]">{{
            $t('message.users.confirm') }}
          </button>
          <button @click="close" :class="['create-submit', $i18n.locale]">{{
            $t('message.users.cancel') }}
          </button>
        </st-row>
      </st-row>
    </div>
  </st-row>
</template>
<script>
  export default {
    name: 'popup',
    props: {
      popupWidth: String,
      popupHeight: String,
      title: {
        type: String,
      },
      callback: {
        type: Function,
        required: true
      },
      type:{
          type: String,
          required: true
      },
      content: {
          type: String
      },
      determine: {
        type: Function
      }
    },
    methods: {
      close () {
        this.callback()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/css/theme";
  .popup-alert {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    .popup-box {
      width: 712px;
      min-height: 296px;
      .content{
        text-align: center;
        line-height: 30px;
      }
      .border-radius();
      padding-bottom: 40px;
      background-color: #fff;
      overflow: hidden;
      .header {
        padding: 0 18px;
        background-color: #e2e7ef;
        h3 {
          line-height: 50px;
          font-size: 16px;
        }
        a {
          display: block;
          width: 8px;
          height: 8px;
          background: url("../../assets/images/icon-popupclose.png") no-repeat;
        }
      }
    }
    .create-item {
    position: relative;
    padding-top: 50px;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    h3 {
      padding: 0 30px;
      font-size: 16px;
      text-align: center;
    }
    div {
      margin-top: 45px;
      width: 270px;
      button {
        width: 120px;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        text-align: center;
        color: @buttonColor;
        background: none;
        border: 1px solid @buttonColor;
        .border-radius();
        &.ja {
          font-size: 12px;
        }
        &:hover {
          color: #fff;
          background: @buttonColor;
          cursor: pointer;
        }
      }
    }
  }
  }
</style>
