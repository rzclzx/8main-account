import Column from './column'

export default {
  name: 'tableBody',
  props: {},
  render(h) {
    return (
      < tbody >
      {
        this.$parent.record.map((item) => {
        return (
          < tr >
          {
            this.tableColumn.map((items) => {
            return (
              items.componentOptions.propsData.index ? (
                < td style = {items.componentOptions.propsData.customStyle
          }>
            {
              item[items.componentOptions.propsData.index]
            }
          <
            /td>
          ) :
            (
            < td
            style = {items.componentOptions.propsData.customStyle
          }>
            {
              Column.renderCell(h, items.componentInstance, item)
            }
          <
            /td>
          )
          )
          })
      }
      <
        /tr>
      )
      })
  }
  <
    /tbody>
  )
  },
  data() {
    return {
      tableColumn: []
    }
  },
  mounted() {
    let tableColumn = []
    for (let i = 0; i < this.$parent.$slots.default.length; i++) {
      if (this.$parent.$slots.default[i].elm.nodeType === 1) {
        tableColumn.push(this.$parent.$slots.default[i])
      }
    }
    this.tableColumn = tableColumn
  }
}
