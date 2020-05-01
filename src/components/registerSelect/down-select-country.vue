<template>
  <st-row class="select">
    <p :class="{ activeFont: representative === '2' }"
       :style="{ paddingLeft: padding, width: Pwidth, lineHeight: lineHeight }">{{ text }}</p>
    <div class="arrow" :class="{ activeArrow: representative === '2' }"
         :style="{ backgroundPosition: bgposition }"></div>
    <input autocomplete="off" readonly="readonly" ref="selectInput" @blur="inputBlur" @click.stop="toggleMenu"
           :style="{ width: inputWidth }"/>
    <ul :style="{ left: ulPositionL, top: ulPositionT }" v-show="visible">
      <slot></slot>
    </ul>
  </st-row>
</template>

<script>
  export default {
    name: 'downSelect',
    props: {
      value: null,
      initValue: '', // 默认值
      initText: null,
      representative: String,
      padding: String,
      inputWidth: String,
      Pwidth: String,
      lineHeight: String,
      bgposition: String,
      ulPositionL: String,
      ulPositionT: String,
      ulWidth: String
    },
    data() {
      return {
        visible: false,
        text: '+86'
      }
    },
    watch: {
      value(val) {
        this.text = ''
        let i = 0
        for (i; i < this.changeText(val).length; i++) {
          if (this.representative === '1') {
            if (parseInt(this.changeText(val)[i])) {
              this.text = this.text + this.changeText(val)[i]
            }
            if (this.changeText(val)[i] === '0') {
              this.text = this.text + this.changeText(val)[i]
            }
          }
          if (this.representative === '2') {
            if (!parseInt(this.changeText(val)[i])) {
              this.text = this.text + this.changeText(val)[i]
            }
          }
        }
        if (i === this.changeText(val).length) {
          if (this.representative === '1') {
            this.text = '+' + this.text
          }
          if (this.representative === '2') {
            this.text = this.text.substring(0, this.text.length - 1)
          }
        }
      }
    },
    methods: {
      toggleMenu() {
        this.visible = !this.visible
      },
      inputBlur() {
        setTimeout(() => {
          this.visible = false
        }, 200)
      },
      select(value) {
        this.$emit('onSelect', value)
      },
      changeText(val) {
        let arr = this.$slots.default || []
        for (let i = 0; i < arr.length; i++) {
          if (this.$slots.default[i].componentOptions.propsData.value === val) {
            return this.$slots.default[i].componentOptions.propsData.text
          }
        }
      }
    },
    mounted() {
      if (this.initValue && this.changeText(this.initValue)) {
        this.text = this.changeText(this.initValue)
      }
      if (this.initText) {
        this.text = this.initText
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/css/theme";

  .select {
    position: relative;
    width: 100%;
    height: 50px;
    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 110px;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }
    p {
      padding-left: 30px;
      width: 110px;
      height: 100%;
      line-height: 50px;
      font-size: 14px;
      text-align: center;
      border-right: none;
      overflow: hidden;
      white-space: nowrap;
    }
    .arrow {
      width: 24%;
      height: 100%;
      background: url('../../assets/images/icon-xiala.png') no-repeat 0 19px;
    }
    ul {
      position: absolute;
      top: 50px;
      left: 50%;
      z-index: 2003;
      margin-left: -49px;
      padding: 4px 0;
      width: 200px;
      max-height: 300px;
      overflow-y: scroll;
      background: #fff;
      .border-radius();
      .border-shadow(0 2px 5px rgba(0, 0, 0, .35));
    }
    .activeFont {
      padding-left: 8px;
      text-align: left;
    }
    .activeArrow {
      text-align: right;
      background-position: 50px 14px;
      border-right: none;
    }
  }
</style>
