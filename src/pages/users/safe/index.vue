<template>
  <div class="users-safe container">
    <user-nav :id="2"></user-nav>
    <div class="item" :style="{ height: itemStatus['item1'] && itemHeight['item1'] || '70px' }">
      <a class="item-click" @click="toggle('item1')"></a>
      <st-content paddingBottom="50px" ref="item1">
        <st-row class="title" justify="between" align="center" slot="title">
          <h2>{{ $t('message.users.pwdSafe') }}</h2>
          <a :class="[itemStatus.item1 && 'active']"></a>
        </st-row>
        <safe-password></safe-password>
      </st-content>
    </div>
    <div class="item" :style="{ height: itemStatus['item2'] && itemHeight['item2'] || '70px' }">
      <a class="item-click" @click="toggle('item2')"></a>
      <st-content paddingBottom="50px" ref="item2">
        <st-row class="title" justify="between" align="center" slot="title">
          <h2>{{ $t('message.users.safeSet') }}</h2>
          <a :class="[itemStatus.item2 && 'active']"></a>
        </st-row>
        <safe-setting></safe-setting>
      </st-content>
    </div>
    <div class="item" :style="{ height: itemStatus['item3'] && itemHeight['item3'] || '70px' }">
      <a class="item-click" @click="toggle('item3')"></a>
      <st-content paddingBottom="50px" ref="item3">
        <st-row class="title" justify="between" align="center" slot="title">
          <h2>{{ $t('message.users.safeStrategy') }}</h2>
          <a :class="[itemStatus.item3 && 'active']"></a>
        </st-row>
        <safe-strategy></safe-strategy>
      </st-content>
    </div>
    <div class="item" :style="{ height: itemStatus['item4'] && itemHeight['item4'] || '70px' }">
      <a class="item-click" @click="toggle('item4')"></a>
      <st-content paddingTop="18px" paddingBottom="50px" ref="item4">
        <st-row class="title" justify="between" align="center" slot="title">
          <h2>{{ $t('message.users.safeNotice') }}</h2>
          <a :class="[itemStatus.item4 && 'active']"></a>
        </st-row>
        <safe-notice :noticeList="noticeList"></safe-notice>
      </st-content>
    </div>
    <div class="item" :style="{ height: itemStatus['item5'] && itemHeight['item5'] || '70px' }">
      <a class="item-click" @click="toggle('item5')"></a>
      <st-content ref="item5" paddingTop="20px" paddingBottom="50px">
        <st-row class="title" justify="between" align="center" slot="title">
          <h2>{{ $t('message.users.loginRecord') }}</h2>
          <a :class="[itemStatus.item5 && 'active']"></a>
        </st-row>
        <safe-login-record :recordList="recordList"></safe-login-record>
      </st-content>
    </div>
  </div>
</template>

<script>
  import UserNav from '../../../components/users/user-nav'
  import SafePassword from '../../../components/users/safe-password'
  import SafeSetting from '../../../components/users/safe-setting'
  import SafeStrategy from '../../../components/users/safe-strategy'
  import SafeNotice from '../../../components/users/safe-notice'
  import SafeLoginRecord from '../../../components/users/safe-login-record'
  import UserApi from '../../../assets/js/api/userApi'

  export default {
    name: 'users-safe',
    // middleware: ['auth'],
    components: {
      UserNav,
      SafePassword,
      SafeSetting,
      SafeStrategy,
      SafeNotice,
      SafeLoginRecord
    },
    // async asyncData () {
    //   let initData = [
    //     UserApi.getSafeNotice(),
    //     UserApi.getLoginRecord()
    //   ]
    //   let [res1, res2] = await Promise.all(initData)
    //   return {
    //     noticeList: res1.data,
    //     recordList: res2.data.recordList
    //   }
    // },
    provide() {
      return {
        safeIndex: this
      }
    },
    data() {
      return {
        itemStatus: {
          item1: true,
          item2: true,
          item3: true,
          item4: true,
          item5: true
        },
        itemHeight: {
          item1: 'auto',
          item2: 'auto',
          item3: 'auto',
          item4: 'auto',
          item5: 'auto'
        },
        noticeList: [],
        recordList: []
      }
    },
    methods: {
      toggle(id) {
        this.itemStatus[id] = !this.itemStatus[id]
      }
    },
    mounted() {
      for (let i = 1; i < 6; i++) {
        this.itemHeight['item' + i] = this.$refs['item' + i].$el.offsetHeight + 'px'
      }
    },
    created() {
      UserApi.getSafeNotice()
        .then(res => {
          this.noticeList = res.data || []
          this.itemStatus = {item1: true, item2: true, item3: true, item4: true, item5: true}
        })
        .catch(e => {
          console.log(e)
        })
      UserApi.getLoginRecord()
        .then(res => {
          this.recordList = res.data.recordList || []
          this.itemHeight = {item1: 'auto', item2: 'auto', item3: 'auto', item4: 'auto', item5: 'auto'}
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../../assets/css/theme";
  .users-safe {
    .item {
      position: relative;
      margin-top: 30px;
      overflow: hidden;
      .transition(all ease-in-out .3s);
      &.active {
        height: auto;
      }
      .item-click {
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        height: 70px;
      }
    }
    .title {
      h2 {
        line-height: 70px;
        font-size: 16px;
      }
      a {
        display: block;
        width: 16px;
        height: 10px;
        background: url(../../../assets/images/iconxiala1.png);
        transition: .3s;
        &.active {
          .transform(rotate(180deg));
        }
      }
    }
  }
</style>
