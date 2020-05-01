<template>
  <div class="success">
    <div class="icon-success"></div>
    <p>{{ message }}</p>
    <div class="btn">
      <a @click="urlGo" class="button">{{ $t(`message.common.goHomePage`) }}</a>
      <router-link :to="urlBack" class="button">{{ backText }}</router-link>
    </div>
  </div>
</template>

<script>
  import ApiConfig from '../../assets/js/config/api.config'
  export default {
    name: 'success',
    props: {
      message: {
        type: String,
        required: true
      },
      // urlGo: {
      //   type: String,
      //   default: '/'
      // },
      urlBack: {
        type: String,
        required: true
      },
      backText: {
        type: String,
        default() {
          return this.$t(`message.common.goBack`)
        }
      }
    },
    beforeDestroy() {
      this.$store.commit('SET_SUCCESSIVE', {successive: false})
    },
    data() {
      return {
        ApiConfig
      }
    },
    methods: {
      urlGo() {
        window.location.href = `${this.ApiConfig.mainDomain}`
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/css/theme.less";

  .success {
    text-align: center;
    .icon-success {
      margin: 80px auto 28px;
      width: 57px;
      height: 57px;
      background: url("../../assets/images/icon-success.png") no-repeat;
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
