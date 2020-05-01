<template>
  <st-row class="create-item" align="center" direction="column">
    <h3 v-if="$route.params.name === 'UCC'">{{ $t(`message.account.riskWarningContent`) }}</h3>
    <h3 v-if="isGray">{{ $t(`message.account.depositAgree5`, { currency: `${this.$route.params.name}` }) }}</h3>
    <st-row justify="center">
      <a @click="close" class="create-submit">{{ $t(`message.account.riskWarningBtn`) }}</a>
    </st-row>
  </st-row>
</template>

<script>
  export default {
    name: 'st-deposit-ucc',
    props: {
      callback: {
        type: Function,
        required: true
      },
      isGray: {
        type: Number
      }
    },
    methods: {
      close() {
        this.callback()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/css/theme";

  .create-item {
    position: relative;
    padding: 50px 30px 0;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    h3 {
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
        &:hover {
          color: #fff;
          background: @buttonColor;
          cursor: pointer;
        }
      }
    }
  }
</style>
