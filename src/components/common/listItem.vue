<template>
  <st-row class="list-item" :class="[ able && !isCurrent && 'able']" align="center" @callback="select">
    <span class="radio" :class="[ isCurrent && 'active']"></span>
    <p :class="[ !able && 'disable']">{{ label }}</p>
    <div class="blank"></div>
    <span class="tip" v-if="able && isCurrent">{{ $t(`message.common.currentSetting`) }}</span>
    <slot></slot>
  </st-row>
</template>

<script>
  export default {
    name: 'list-item',
    props: {
      able: {
        type: Boolean,
        default: true
      },
      label: {
        type: String,
        required: true
      },
      isCurrent: {
        type: Boolean,
        default: false
      },
      params: {},
      callback: {
        type: Function,
        required: true
      }
    },
    methods: {
      select() {
        if (!this.able || this.isCurrent) return
        this.callback(this.params)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import "../../assets/css/theme.less";

  .list-item {
    margin-top: -1px;
    height: 60px;
    border: 1px solid @borderColor;
    padding-left: 22px;
    padding-right: 18px;
    &.able {
      cursor: pointer;
    }
    .radio {
      display: block;
      width: 12px;
      height: 12px;
      .border-radius(@radius: 50%);
      border: 1px solid #c9c9c9;
      &.active {
        border: 4px solid #5879b8;
      }
    }
    p {
      margin-left: 10px;
      font-size: 14px;
      &.disable {
        color: @tipColor;
      }
    }
    .blank {
      .flex-grow();
    }
    .tip {
      font-size: 14px;
      color: @tipColor;
    }
    a {
      font-size: 14px;
      color: @linkColor;
    }
  }
</style>
