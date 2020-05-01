<template>
  <st-row class="create-item" align="center" direction="column">
    <h3>{{ $props.boxMessageText }}</h3>
    <st-row justify="between">
      <router-link to="../../users/safe/email/bind" :class="['create-submit', $i18n.locale]">{{
        $t('message.users.bindEmail') }}
      </router-link>
      <router-link to="../../users/safe/google/bind" :class="['create-submit', $i18n.locale]">{{
        $t('message.users.bindGoogle') }}
      </router-link>
    </st-row>
  </st-row>
</template>

<script>
  export default {
    name: 'st-confirm',
    props: ['boxMessageText']
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/css/theme";

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
      a {
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
</style>
