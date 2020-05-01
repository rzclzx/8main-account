<template>
  <li class="select-option" @click="select(value)">
    <slot>
      <p>{{ current }}</p>
    </slot>
  </li>
</template>

<script>
  export default {
    name: 'selectOption',
    props: {
      value: {
        required: true
      },
      text: String
    },
    computed: {
      current() {
        return this.text
      }
    },
    methods: {
      select(value) {
        this.$parent.$parent.select(value)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .select-option {
    cursor: pointer;
    p {
      padding-left: 14px;
      line-height: 28px;
      font-size: 13px;
    }
    &:hover {
      background: #ecf6fd;
    }
  }
</style>
