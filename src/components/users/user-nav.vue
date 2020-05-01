<template>
  <st-row class="user-nav">
    <st-row :class="[ 'item', item.id === id && 'active' ]"
            align="center"
            v-for="item in userNav"
            :key="item.id">
      <router-link :to="item.link">{{ item.name }}</router-link>
    </st-row>
  </st-row>
</template>

<script>
  export default {
    name: 'user-nav',
    data() {
      return {
        userNav: [
          {
            id: 1,
            name: this.$t('message.users.userInfo'),
            link: '/users'
          },
          {
            id: 2,
            name: this.$t('message.users.userSafe'),
            link: '/users/safe'
          },
          {
            id: 3,
            name: this.$t('message.users.devTool'),
            link: '/users/tool'
          },
          {
            id: 4,
            name: this.$t('message.users.invite'),
            link: '/users/invite'
          }
        ]
      }
    },
    props: {
      id: {
        type: Number,
        required: true
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/css/theme";

  .user-nav {
    height: 60px;
    padding-left: 40px;
    background: #fff;
    .item {
      position: relative;
      margin-right: 30px;
      height: 100%;
      &:after {
        margin-right: 0;
      }
      a {
        font-size: 16px;
        color: #999;
      }
      &.active {
        a {
          color: @linkColor;
        }
        /*
        &:after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          display: block;
          width: 100%;
          height: 2px;
          background: @linkColor;
        }
         */
      }
    }
  }
</style>
