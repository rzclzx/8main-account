<template>
  <st-row class="type-nav" justify="between">
    <st-row class="nav">
      <template v-for="(item, index) in arr">
        <a v-if="!item.key" :key="item.id">{{ $t(item.text) }}</a>
        <router-link v-else :key="item.id"
                     :class="{active: $route.query.type? ($route.query.type.toString() === item.key.toString()): (index === 0)}"
                     :to="getUrl(item.key)">{{ $t(item.text) }}
        </router-link>
      </template>
    </st-row>
    <!--<div class="no-price">-->
    <!--<router-link to="/record" v-if="$store.state.manage.userInfo">{{ $t('message.loan-list.History') }}</router-link>-->
    <!--<a :href="`${apiConfig.mainDomain}manage?position=${apiConfig.loanDomain}`" v-else>{{ $t('message.loan-list.History') }}</a>-->
    <!--</div>-->
  </st-row>
</template>

<script>
  // import ApiConfig from '../../assets/js/config/api.config'
  export default {
    name: 'type-nav',
    props: ['arr'],
    data() {
      return {
        // apiConfig: ApiConfig
      }
    },
    methods: {
      getUrl(key) {
        let obj = {}
        Object.assign(obj, this.$route.query, {type: key})
        delete obj.page
        return {name: this.$route.name, query: obj}
      }
    },
    created() {
      // console.log(this.arr[0].key)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/css/theme";

  .type-nav {
    padding: 0 30px;
    width: 100%;
    height: 48px;
    background: #fff;
    /*box-shadow: 0 0 10px rgba(89,122,185,0.10);*/
    .nav {
      a {
        position: relative;
        margin-right: 23px;
        padding: 0 10px 0;
        font-size: 14px;
        line-height: 48px;
        color: #24324C;
        font-family: PingFangSC-Regular;
      }
      .active {
        color: #4B7DDC;
        &:after {
          position: absolute;
          left: 0px;
          bottom: 0px;
          content: '';
          width: 100%;
          height: 2px;
          background: #4B7DDC;
        }
      }
      a:hover {
        color: #597ab9;
      }
    }
    .no-price {
      line-height: 62px;
      font-size: 12px;
      span {
        color: #999;
      }
      a {
        color: #4B7DDC;
        &:hover {
          color: #3A67BC;
        }
      }
    }
  }
</style>
