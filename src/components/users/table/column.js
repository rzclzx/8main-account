export default {
  name: 'tableColumn',
  props: ['label', 'index', 'width', 'customStyle'],
  renderCell(h, a, data) {
    return (
    < div >
    {a.$scopedSlots.default ? a.$scopedSlots.default(data) : ''
  }
  <
    /div>
  )
  },
  render(h, data) {
    return (
    < div >
    {this.$scopedSlots.default ? this.$scopedSlots.default(data) : this.$slots.default
  }
  <
    /div>
  )
  }
}
