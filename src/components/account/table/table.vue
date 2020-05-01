<template>
  <div class="aa">
    <div v-show="false">
      <slot></slot>
    </div>
    <table :class="tableClass">
      <table-head></table-head>
      <table-body></table-body>
    </table>
  </div>
</template>

<script>
  import TableHead from './tableHead'
  import TableBody from './tableBody'
  export default {
    name: 'customTable',
    components: {
      TableHead,
      TableBody
    },
    props: {
      theme: {
        type: String,
        default: 'theme1'
      },
      record: {
        type: [Array, Number],
        default: []
      }
    },
    computed: {
      tableClass () {
        switch (this.theme) {
          case 'theme1':
            return 'table-theme-1'
          case 'theme2':
            return 'table-theme-2'
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .aa {
    .table-theme-1 {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      thead {
        border-bottom: 1px solid #ededee;
        tr {
          height: 32px;
          th {
            font-size: 13px;
            font-weight: normal;
            color: #888;
            text-align: left;
          }
        }
      }
      tbody {
        tr {
          height: 40px;
          font-size: 13px;
          &:nth-child(2n) {
            background: #fafafb;
          }
        }
      }
    }
    .table-theme-2 {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      thead {
        background: #fafafb;
        border-bottom: 2px solid #ededee;
        tr {
          height: 45px;
          th {
            font-size: 14px;
            font-weight: normal;
            text-align: left;
            color: #999;
          }
        }
      }
      tbody {
        tr {
          height: 45px;
          font-size: 14px;
          &:nth-child(2n) {
            background: #fafafb;
          }
          td {
            color: #333;
            &:first-child {
              padding-left: 22px;
              color: #999;
            }
            &:last-child {
              padding-right: 20px;
            }
          }
        }
      }
    }
  }
</style>
