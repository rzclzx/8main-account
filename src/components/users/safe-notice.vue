<template>
  <div class="safe-notice">
    <st-prompt style="margin-bottom: 3px;">
      <p>{{ $t(`message.users.prompt`) }}</p>
    </st-prompt>
    <user-safe-item v-for="item in $dictionary.safeNotice" :key="item.id" :title="item.name">
      <st-switch :status="noticeList[item.id] || false" @callback="setNotice(item.id)"></st-switch>
    </user-safe-item>
  </div>
</template>

<script>
  import StPrompt from './prompt'
  import UserSafeItem from './user-safe-item'

  export default {
    name: 'safe-notice',
    components: {
      StPrompt,
      UserSafeItem
    },
    inject: {
      safeIndex: {
        default: null
      }
    },
    props: {
      noticeList: {
        required: true
      }
    },
    methods: {
      getSafeNotice() {
        this.usersApi.getSafeNotice()
          .then(res => {
            this.safeIndex.noticeList = res.data
          })
      },
      setNotice(type) {
        this.usersApi.setNotice(type, this.noticeList[type] ? 0 : 1)
          .then(res => {
            this.getSafeNotice()
          })
      }
    }
  }
</script>
