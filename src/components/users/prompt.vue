<template>
  <div class="st-prompt">
    <span></span>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'st-prompt'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .st-prompt {
    position: relative;
    padding: 10px 0 10px 48px;
    background: #f8f9fb;
    span {
      position: absolute;
      top: 11px;
      left: 20px;
      width: 16px;
      height: 16px;
      background: url('../../assets/images/prompt.png') no-repeat;
    }
    p {
      line-height: 20px;
      font-size: 12px;
      color: #6c85ae;
    }
  }
</style>
