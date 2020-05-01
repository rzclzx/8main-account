<template>
  <div class="success-email">
    <div class="icon-success"></div>
    <p>{{ message }}</p>
    <div class="txt">
      <p>{{ $t(`message.common.go`) }} <span>{{ email }}</span> {{ $t(`message.common.checkEmail`) }},</p>
      <p>{{ txt }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'success-email',
    props: {
      message: {
        type: String,
        required: true
      },
      txt: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      }
    },
    beforeDestroy() {
      this.$store.commit('SET_SUCCESSIVE', {successive: false})
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/css/theme.less";

  .success-email {
    text-align: center;
    .icon-success {
      margin: 80px auto 41px;
      width: 80px;
      height: 56px;
      background: url("../../assets/images/icon-email.png") no-repeat;
    }
    p {
      font-size: 16px;
    }
    .txt {
      margin-top: 19px;
      p {
        line-height: 21px;
        font-size: 14px;
        color: @tipColor;
      }
    }
  }
</style>
