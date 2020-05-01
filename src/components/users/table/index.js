import CustomTable from './table.vue'
import TableColumn from './column'

CustomTable.install = (Vue) => {
  Vue.component(CustomTable.name, CustomTable)
}

TableColumn.install = (Vue) => {
  Vue.component(TableColumn.name, TableColumn)
}

export {CustomTable}
export {TableColumn}
