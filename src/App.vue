<template>
  <div id="app">
    <common-header :isMain="true"></common-header>
    <div :class="['wrap', $route.name === '58BTopics' ? 'topics1' : '']">
      <router-view />
      <st-footer style="bottom: 0;background-color: #12122a;" :product="product"></st-footer>
    </div>
  </div>
</template>

<script>
import CommonHeader from './components/header/common-header'
import StFooter from './components/footer/src/footer'
import Product from './assets/js/config/product'
import Dictionary from './assets/js/dictionary'
export default {
  name: 'App',
  computed: {
    notice () {
      return this.$store.state.notice
    },
    product () {
      return Product(this.$i18n)
    }
  },
  components: {
    CommonHeader,
    StFooter
  },
  watch: {
    notice (code) {
      if (code && this.$dictionary.error(code)) {
        if (code === 302 && this.$store.state.noticeContent) {
          this.$toast(this.$t('message.errorCode.errorDesc1') + this.$store.state.noticeContent + this.$t('message.errorCode.errorDesc2'))
        } else {
          this.$toast(this.$dictionary.error(code))
        }
      }
      setTimeout(() => {
        this.$store.commit('SHOW_NOTICE', {
          notice: ''
        })
      }, 3000)
    },
    '$i18n.locale' (val) {
      let obj = {val: {$dictionary: null}}
      Dictionary.install(obj, this.$i18n)
      Object.assign(this.$dictionary, obj.val.$dictionary)
      document.title = this.$t('message.title.coin')
    },
    '$route'() {
      document.documentElement.scrollTop = 0
    }
  },
  created () {
    this.$store.dispatch('getAssetsMain').catch(er => { console.log(er) })
    this.$store.dispatch('getAssetsDetail').catch(er => { console.log(er) })
    this.$store.dispatch('getAssetsLabs').catch(er => { console.log(er) })
    this.$store.dispatch('getSpotAllTicker').catch(er => { console.log(er) })
    this.$store.dispatch('getListTransfer').catch(er => {
      console.log(er)
    })

  },
  beforeCreate () {
    document.title = this.$t('message.title.coin')
  }
}
</script>

<style>
  #app {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-width: 1340px;
    height: 100%;
  }
  .wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
    padding-top: 125px;
    padding-bottom: 316px;
  }
  .topics1 {
    padding-top: 84px;
    padding-bottom: 264px;
  }
  @media screen and (max-width:1366px) {
    .wrap {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      min-height: 100%;
      padding-top: 125px;
      padding-bottom: 260px;
    }
    .topics1 {
      padding-top: 84px;
      padding-bottom: 208px;
    }
  }
</style>
