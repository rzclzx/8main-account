<template>
  <div class="google-key">
    <span class="key">
      {{ googleKey }}
      <a @click="copyKey">{{ $t('message.users.copy') }}</a>
    </span>
    <span class="or">{{ $t('message.users.or') }}</span>
    <span>{{ $t('message.users.setGoogleKeyPrompt') }}</span>
    <span class="code-img">
      <st-row class="key-code" justify="center" align="center">
        <canvas ref="canvas" width="196" height="196"></canvas>
        <div class="arrow"></div>
      </st-row>
    </span>
    <input type="text" id="copy-key" ref="copy-key" v-model="googleKey"/>
  </div>
</template>

<script>
  import qrcode from 'qrcode'

  export default {
    name: 'google-key',
    data() {
      return {
        googleKey: '',
        erCode: ''
      }
    },
    props: {
      ticket: {
        type: String
      },
      ticketType: {
        type: String,
        required: true
      },
      purpose: {
        type: Number,
        required: true
      },
      channel: {
        type: Number,
        required: true
      }
    },
    methods: {
      // 获取googlekey
      getGoogleKey() {
        this.usersApi.getGoogleKey(this.ticket, this.purpose, this.channel)
          .then(res => {
            this.$store.commit('SAVE_TICKET', {
              type: this.ticketType,
              ticket: res.data.ticket
            })
            this.googleKey = res.data.googleKey
            this.erCode = res.data.googleKeyQRCode
            this.createQr()
          })
      },
      copyKey() {
        let key = this.$refs['copy-key'] // 要复制文字的节点
        key.select() // 选择对象
        document.execCommand('copy') // 执行浏览器复制命令
      },
      createQr() {
        qrcode.toCanvas(this.$refs.canvas, this.erCode, {width: 98, margin: 0}, function (error) {
          if (error) {
            console.error(error)
          }
        })
      }
    },
    mounted() {
      this.getGoogleKey()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/css/theme.less";
  //定位
  .position(@position:absolute, @top:2px, @left:-6px) {
    position: @position;
    top: @top;
    left: @left;
  }

  //三角形
  .triangle(@heigt, @width, @color) {
    border-bottom: @heigt solid @color;
    border-left: @width solid transparent;
    border-right: @width solid transparent;
  }

  .google-key {
    position: relative;
    margin-bottom: 30px;
    * {
      vertical-align: middle;
    }
    span {
      display: inline-block;
    }
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    .key {
      position: relative;
      display: inline-block;
      margin-right: 10px;
      width: 242px;
      height: 40px;
      line-height: 40px;
      padding: 0 12px;
      background-color: rgba(108, 133, 174, 0.05);
      font-size: 16px;
      color: @linkColor;
      a {
        position: absolute;
        top: 8px;
        right: 14px;
        display: inline-block;
        margin-left: 8px;
        color: #ff7300;
      }
    }
    .or {
      display: inline-block;
      margin-right: 10px;
      color: #999;
    }
    .code-img {
      position: absolute;
      top: 10px;
      margin-left: 10px;
      width: 20px;
      height: 20px;
      background-image: url("../../assets/images/icon-ewm.png");
      .key-code {
        position: absolute;
        left: -48px;
        bottom: -126px;
        width: 116px;
        height: 116px;
        border: 1px solid #eee;
        visibility: hidden;
        canvas {
          width: 98px;
          height: 98px;
        }
        .arrow {
          margin: 0;
          padding: 0;
          display: inline-block;
          .position(absolute, -10px, 50px);
          .triangle(10px, 8px, #eee) ;
          &::after {
            content: '';
            display: inline-block;
            .position();
            .triangle(8px, 6px, #fff) ;
          }
        }
      }
      &:hover {
        .key-code {
          visibility: visible;
        }
      }
    }
    #copy-key {
      position: absolute;
      left: 0;
      top: -10000px;
    }
  }
</style>
