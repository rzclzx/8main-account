<template>
  <st-row class="user-safe-item" align="center">
    <h3>{{ title }}</h3>
    <p>{{ tip }}</p>
    <div class="blank"></div>
    <slot></slot>
  </st-row>
</template>

<script>
  export default {
    name: 'user-safe-item',
    props: {
      title: {
        type: String,
        required: true
      },
      tip: {
        type: String
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/css/theme";

  .user-safe-item {
    border-bottom: 1px solid @borderColor;
    h3 {
      width: 160px;
      line-height: 60px;
      font-size: 14px;
    }
    p {
      font-size: 12px;
      color: @tipColor;
    }
    .blank {
      .flex-grow();
    }
  }
</style>
