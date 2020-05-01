export default {
  name: 'tableHead',
  render(h) {
    return (
      < thead >
      < tr >
      {
        this.tableColumn.map(item => {
        return (
          < th
        width = {item.width
      }
        style = {item.customStyle
      }>
        {
          item.label
        }
      <
        /th>
      )
      })
  }
  <
    /tr>
    < /thead>
  )
  },
  data() {
    return {
      tableColumn: []
    }
  },
  mounted() {
    this.getTableColumn()
  },
  computed: {
    type() {
      return this.$route.params.type
    }
  },
  watch: {
    type() {
      this.getTableColumn()
    }
  },
  methods: {
    getTableColumn() {
      let tableColumn = []
      for (let i = 0; i < this.$parent.$slots.default.length; i++) {
        if (this.$parent.$slots.default[i].elm.nodeType === 1) {
          tableColumn.push(this.$parent.$slots.default[i].componentOptions.propsData)
        }
      }
      this.tableColumn = tableColumn
    }
  }
}
