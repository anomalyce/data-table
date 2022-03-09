import { h, computed, defineComponent, getCurrentInstance } from 'vue'
import wrap from './row'

export default defineComponent({
  name: '@anomalyce/data-table-item',
  
  inheritAttrs: false,

  setup (props, context) {
    const dataTable = computed(() => getCurrentInstance().parent)

    if (dataTable.value.type.name !== '@anomalyce/data-table') {
      throw new Error('The <data-table.item /> component must be a direct child of the <data-table.table /> component.')
    }

    const headings = computed(() => dataTable.value.exposed.headings.value)

    return () => {
      const columns = headings.value.map(column => {
        const exists = Object.keys(context.slots).indexOf(column.props.name) !== -1
        const name = exists ? column.props.name : 'default'

        const options = {
          ...context.attrs,
          key: column.props.name,
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

      return wrap(columns, undefined, dataTable.value.props.css)
    }
  }
})
