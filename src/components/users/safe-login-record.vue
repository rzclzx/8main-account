<template>
  <table class="safe-login-record">
    <thead>
    <tr>
      <th width="200" align="left" style="padding-left: 22px">{{ $t(`message.users.loginTime`) }}</th>
      <th width="262" align="right">{{ $t(`message.users.loginIP`) }}</th>
      <th width="278" align="right">{{ $t(`message.users.loginArea`) }}</th>
      <th width="340" align="right" style="padding-right: 20px">{{ $t(`message.users.loginDevice`) }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in recordList" :key="item.id">
      <td align="left" style="padding-left: 22px; color: #999;">{{ item.loginTime | timeFormat }}</td>
      <td align="right">{{ item.loginIp }}</td>
      <td align="right">{{ item.loginAddress }}</td>
      <td align="right" style="padding-right: 20px">{{ item.osType }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: 'safe-login-record',
    props: ['recordList']
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/css/theme";

  .safe-login-record {
    .theme-1();
  }
</style>
