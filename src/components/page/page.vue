<template>
  <st-row justify="end" v-else class="page">
    <a class="page-up" :class="{'page-no-btn': !$route.query.page||$route.query.page <2}" @click="upBtn">{{
      $t('message.public.upPage') }}</a>
    <a class="page-down" :class="{'page-no-btn': isDown}" aria-disabled="false" @click="downBtn">{{
      $t('message.public.downPage') }}</a>
  </st-row>
</template>

<script>
  export default {
    name: 'page',
    props: {
      isDown: {
        required: false,
        default: false
      },
      page: {
        required: false,
        default: false
      }
    },
    methods: {
      upBtn() {
        let page = Number(this.$route.query.page)
        if (!page || page === 1) {
          return false
        }
        this.$router.push({path: this.$route.path, query: {...this.$route.query, page: page ? page - 1 : 1}})
      },
      downBtn() {
        let page = Number(this.$route.query.page)
        if (this.$props.isDown) {
          return false
        }
        this.$router.push({path: this.$route.path, query: {...this.$route.query, page: page ? page + 1 : 2}})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/css/theme";

  .page {
    .page-up,
    .page-down {
      display: block;
      width: 64px;
      height: 28px;
      border: 1px solid #597AB9;
      text-align: center;
      font-size: 12px;
      line-height: 28px;
      color: #597AB9;
      vertical-align: super;
      cursor: pointer;
      .border-radius();
      &:hover {
        line-height: 30px;
        color: #fff;
        background: #597AB9;
        border: none;
      }
    }
    .page-up {
      margin-right: 16px;
    }
    .page-no-btn {
      color: #C9D0DC;
      border: 1px solid #C9D0DC !important;
      &:hover {
        line-height: 28px;
        color: #C9D0DC;
        background: #fff;
        border: 1px solid #C9D0DC !important;
      }
    }
  }
</style>
