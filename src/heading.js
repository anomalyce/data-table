import { h, computed, defineComponent, getCurrentInstance } from 'vue'

export default defineComponent({
  name: '@anomalyce/data-table-heading',

  inheritAttrs: false,

  props: {
    name: {
      type: String,
      required: true,
      validator (value) {
        return value.match(/^[a-z0-9\_\-]+$/)
      }
    },
  },

  setup (props, context) {
    const dataTable = computed(() => getCurrentInstance().parent)

    if (dataTable.value.type.name !== '@anomalyce/data-table') {
      throw new Error('The <data-table.heading /> component must be a direct child of the <data-table.table /> component.')
    }

    return () => {  
      const options = {
        ...context.attrs,
        key: props.name,
        'data-table-heading': props.name,
        class: {
          'data-table-heading': true,
          [context.attrs?.class || '']: true,
        },
      }

      return h('div', options, context.slots.default({
        //
      }))
    }
  }
})
