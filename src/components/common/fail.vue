<template>
  <div class="fail">
    <div class="icon-fail"></div>
    <p>{{ message }}</p>
    <div class="btn">
      <!-- <a class="button" :href="urlGo">{{ $t(`common.goHomePage`) }}</a> -->
      <a class="button" :href="urlBack">{{ $t(`message.common.goBack`) }}</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'fail',
    props: {
      message: {
        type: String,
        required: true
      },
      urlBack: {
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

  .fail {
    text-align: center;
    .icon-fail {
      margin: 80px auto 28px;
      width: 57px;
      height: 57px;
      background: url("../../assets/images/icon-fail.png") no-repeat;
    }
    p {
      font-size: 16px;
    }
    .btn {
      margin-top: 50px;
      .button {
        display: inline-block;
        margin: 0 15px;
        width: 120px;
        height: 40px;
        line-height: 38px;
        font-size: 16px;
        text-decoration: none;
        color: @buttonColor;
        border: solid 1px @buttonColor;
        border-radius: 3px;
        &:hover {
          color: #fff;
          background-color: @buttonColor;
        }
      }
    }
  }
</style>
