<template>
  <div class="account-slider">
    <!--<h2>{{ title }}</h2>-->
    <div class="search">
      <input type="text" v-model="searchCoin" @input="search" ref="search"
             :placeholder="$t('message.newIndexUI.enterCoin')" @keyup.13="link"/>
      <span v-if="searchCoin" @click="deleteSelectCoin"></span>
    </div>
    <st-scroll :options="{ height: '926px', paddingRight: '0' }">
      <st-row class="item" :class="{active: $route.params.name === item.name || searchDataStatus}" justify="center"
              align="center" v-for="item in (searchCoin && searchList) || currencyList" :key="item.id"
              v-if="item.dailyAmount > 0">
        <router-link :to="{name: $route.name, params: {name: item.name}}" replace>{{ item.name }}</router-link>
      </st-row>
    </st-scroll>
  </div>
</template>

<script>
  import StScroll from './scrollBar'

  export default {
    name: 'account-slider',
    props: {
      title: {
        type: String,
        required: true
      }
    },
    components: {
      StScroll
    },
    data () {
      return {
        searchCoin: '',
        searchList: [],
        searchDataStatus: false
      }
    },
    computed: {
      currencyList () {
        return this.$store.state.dictionary.currencyList
      }
    },
    watch: {
      '$route'() {
        this.searchList = this.currencyList
        this.searchCoin = ''
        this.searchDataStatus = false
      }
    },
    methods: {
      search () {
        this.searchCoin = this.searchCoin.toUpperCase()
        this.searchList = this.currencyList.filter(item => item.name.indexOf(this.searchCoin) > -1)
        if (this.searchList.filter(item => item.name === this.searchCoin).length) {
          this.searchDataStatus = true
        } else {
          this.searchDataStatus = false
        }
      },
      link () {
        if (this.searchList && this.searchList.filter(item => item.name === this.searchCoin).length) {
          this.$router.replace({
            name: this.$route.name,
            params: {
              name: this.searchCoin
            }
          })
        }
      },
      deleteSelectCoin () {
        this.searchCoin = ''
        this.searchDataStatus = false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/css/theme";
  .account-slider {
    width: 284px;
    padding: 0 0 40px;
    height: 984px;
    text-align: center;
    overflow: hidden;
    background: #fff;
    h2 {
      padding-left: 20px;
      line-height: 54px;
      font-size: 16px;
      text-align: left;
      color: #24324C;
    }
    .item {
      height: 40px;
      min-height: 40px;
      a {
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        color: #24324C;
      }
      &:hover {
        background: #ECF0F7;
        cursor: pointer;
      }
      &.active {
        background: @linkColor;
        a {
          color: #fff;
        }
      }
    }
    .search {
      position: relative;
      margin-bottom: 10px;
      input {
        width: 284px;
        height: 50px;
        padding: 0 20px 0 10px;
        font-size: 16px;
        /*border: solid 1px #232352;*/
        .border-radius(2px);
        color: #24324C;
        background: url(../../assets/images/search.png) no-repeat right 11px center #fff;
        box-shadow: 0 2px 10px 0 rgba(89, 122, 185, 0.10);
        .placeholder({ color: #7889A9; font-size: 16px; font-weight: 300 });
        &:focus {
          border-bottom: 1px solid #597AB9;
          box-shadow: none;
        }
      }
      span {
        display: block;
        width: 14px;
        height: 14px;
        position: absolute;
        top: 18px;
        right: 11px;
        background: url(../../assets/images/delete.svg) no-repeat #fff;
        cursor: pointer;
      }
    }
  }
</style>
