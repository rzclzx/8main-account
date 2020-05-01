<template>
  <div class="select-something" @blur="taggle(false)" tabindex="0" :style="{width: selWidth || '348px'}">
    <div class="select-box" @click="show">
      <span>{{ text }}</span>
      <span :class="{icon: true, iconTrans: trans}"></span>
    </div>
    <ul class="options" :style="{width: selWidth || '348px'}" v-show="showOptions">
      <li class="item" v-for="todo in countryData"
          :key="todo.value"
          @click="selectItem(todo.value, todo.name)"
      >{{todo.name}}
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: {
      countryData: {
        type: Array
      },
      selWidth: {
        type: String,
        default: '350px'
      },
      defaultString: {
        type: String
      }
    },
    data() {
      return {
        showOptions: false,
        trans: false,
        text: ''
      }
    },
    methods: {
      show() {
        this.showOptions = !this.showOptions
        this.trans = !this.trans
      },
      selectItem(value, name) {
        this.showOptions = false
        this.trans = false
        this.text = name
        this.$emit('getSelectData', {value, name})
      },
      taggle(bool) {
        this.showOptions = bool
        this.trans = bool
      }
    },
    created() {
      this.text = this.$props.defaultString || this.$t('message.common.select')
    }
  }
</script>

<style lang="less" scoped>
  .select-something {
    outline: none;
    position: relative;
    display: inline-block;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -khtml-user-select: none;
    user-select: none;
    .select-box {
      position: relative;
      width: 100%;
      height: 38px;
      // background-color: #f9fafc;
      border: solid 1px #ced0da;
      border-radius: 4px;
      padding: 0 10px;
      line-height: 40px;
      font-size: 14px;
      cursor: pointer;
      background: -moz-linear-gradient(top, #fefeff 0%, #f3f5f8 100%);
      background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #fefeff), color-stop(100%, #f3f5f8));
      background: -webkit-linear-gradient(top, #fefeff 0%, #f3f5f8 100%);
      background: -o-linear-gradient(top, #fefeff 0%, #f3f5f8 100%);
      background: -ms-linear-gradient(top, #fefeff 0%, #f3f5f8 100%);
      background: linear-gradient(to bottom, #fefeff 0%, #f3f5f8 100%);
    }
    .icon {
      position: absolute;
      top: 18px;
      right: 10px;
      width: 8px;
      height: 6px;
      background-image: url("../../assets/images/icon-tkxl.png");
      background-repeat: no-repeat;
      -webkit-transition: transform .25s linear;
      -moz-transition: transform .25s linear;
      -o-transition: transform .25s linear;
      transition: transform .25s linear;
    }
    .iconTrans {
      transform: rotate(180deg);
      -webkit-transition: transform .25s linear;
      -moz-transition: transform .25s linear;
      -o-transition: transform .25s linear;
      transition: transform .25s linear;
    }
    .options {
      position: absolute;
      margin-top: 4px;
      max-height: 180px;
      border: solid 1px #ced0da;
      border-radius: 4px;
      background-color: #f9fafc;
      overflow: scroll;
      z-index: 99;
      overflow-x: hidden;
      li {
        width: 100%;
        height: 40px;
        padding: 0 10px;
        line-height: 40px;
        border-bottom: solid 1px #ced0da;
        font-size: 14px;
        cursor: pointer;
        &:last-child {
          border-bottom: 0;
        }
      }
      li:hover {
        color: #53b7e8;
      }
    }
  }
</style>
