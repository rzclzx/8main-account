<template>
  <div class="users-info container">
    <user-nav :id="1"></user-nav>
    <st-content :title="$t(`message.users.baseInfo`)" top="30px" paddingBottom="40px">
      <user-info></user-info>
      <user-status></user-status>
    </st-content>
    <st-content :title="$t(`message.users.userAuth`)" top="20px" paddingTop="30px" paddingBottom="40px">
      <user-auth :authStatus="authStatus"></user-auth>
    </st-content>
  </div>
</template>

<script>
  import UserNav from '../../components/users/user-nav'
  import UserInfo from '../../components/users/user-info'
  import UserStatus from '../../components/users/user-status'
  import UserAuth from '../../components/users/user-auth.vue'
  import UserApi from '../../assets/js/api/userApi'

  export default {
    name: 'users',
    // middleware: ['auth'],
    // async asyncData () {
    //   const authentication = await UserApi.userPersonalInfo()
    //     .catch((e) => {
    //       console.log(e)
    //     })
    //   return {
    //     authStatus: (authentication.data.info && authentication.data.info.picAuthStatus) || 0
    //   }
    // },
    components: {
      UserNav,
      UserInfo,
      UserStatus,
      UserAuth
    },
    data() {
      return {
        authStatus: ''
      }
    },
    created() {
      UserApi.userPersonalInfo()
        .then(res => {
          this.authStatus = (res.data.info && res.data.info.picAuthStatus) || 0
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
</script>
