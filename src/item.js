import { h, computed, defineComponent, getCurrentInstance } from 'vue'

export default defineComponent({
  name: '@anomalyce/data-table-item',
  
  inheritAttrs: false,

  setup (props, context) {
    const dataTable = computed(() => getCurrentInstance().parent)

    if (dataTable.value.type.name !== '@anomalyce/data-table') {
      throw new Error('The <data-table.item /> component must be a direct child of the <data-table.table /> component.')
    }

    const headings = computed(() => dataTable.value.exposed.headings.value)
    const tableKey = computed(() => dataTable.value.exposed.key)

    const columns = headings.value.map(column => {
      const exists = Object.keys(context.slots).indexOf(column.props.name) !== -1
      const name = exists ? column.props.name : 'default'

      const options = {
        ...context.attrs,
        key: `${tableKey}/item/${column.props.name}`,
        'data-table-column': column.props.name,
        class: {
          'data-table-column': true,
          'data-table-column--default': ! exists,
          [context.attrs?.class || '']: true,
        },
      }

      return h('div', options, [
        context.slots[name]({
          column: column.props.name,
        })
      ])
    })

    return () => {
      return h('div', {
        style: (dataTable.value.props.css ? { display: 'contents' } : undefined),
        key: `@anomalyce/data-table/${tableKey}/item`,
        class: {
          'data-table-row': true,
        },
      }, columns)
    }
  }
})
