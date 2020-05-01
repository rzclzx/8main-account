<template>
  <st-row class="safe-level" align="center">
    <div class="level-progress">
      <div class="level"
           :style="{width: $dictionary.safeLevel[level].width + 'px', backgroundColor: $dictionary.safeLevel[level].color}"></div>
    </div>
    <p :style="{color: $dictionary.safeLevel[level].color}">{{ $dictionary.safeLevel[level].level }}</p>
  </st-row>
</template>

<script>
  export default {
    name: 'safe-level',
    props: {
      level: {
        type: String,
        required: true
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .safe-level {
    .level-progress {
      width: 90px;
      height: 8px;
      background: #f1f3f5;
      .level {
        height: 100%;
      }
    }
    p {
      margin-left: 12px;
      font-size: 14px;
    }
  }
</style>
