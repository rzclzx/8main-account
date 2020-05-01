<template>
  <st-row class="user-bread">
    <st-row class="item" align="center" v-for="(item, i) in list" :key="i">
      <router-link :to="item.link" v-if="item.link">
        <st-row align="center">
          <span>{{ item.name }}</span>
          <i></i>
        </st-row>
      </router-link>
      <p v-else>{{ item.name }}</p>
    </st-row>
  </st-row>
</template>

<script>
  export default {
    name: 'user-bread',
    props: {
      list: {
        type: Array,
        required: true
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/css/theme";

  .user-bread {
    width: 100%;
    height: 60px;
    margin-bottom: 10px;
    padding-left: 40px;
    background: #fff;
    box-shadow: 0 2px 10px 0 rgba(89, 122, 185, 0.1);
    .item {
      height: 100%;
      a {
        margin-right: 8px;
        /*
        font-size: 16px;
        color: @linkColor;
        */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #667AA0;
        i {
          margin-left: 8px;
          width: 7px;
          height: 10.5px;
          background: url(../../assets/images/invite/mianbaoxiejiantou.png) no-repeat;
          background-size: 100% 100%;
        }
      }
      p {
        /*font-size: 16px;*/
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #24324C;
      }
    }
  }
</style>
