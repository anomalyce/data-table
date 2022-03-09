import { h, ref, computed, defineComponent } from 'vue'
import wrap from './row'

export default defineComponent({
  name: '@anomalyce/data-table',

  inheritAttrs: false,

  props: {
    css: {
      type: Boolean,
      default: true,
    },
  },

  setup (props, context) {
    const headings = ref([])
    const rows = ref([])

    context.expose({
      headings,
    })

    return () => {
      const rendered = context.slots.default()

      headings.value = rendered.filter(node => node.type?.name === '@anomalyce/data-table-heading')
      rows.value = rendered.filter(node => node.type?.name !== '@anomalyce/data-table-heading')

      const style = computed(() => ({
        display: 'grid',
        gridTemplateColumns: `repeat(${headings.value.length}, auto)`
      }))

      const options = {
        ...context.attrs,
        style: (props.css ? style.value : undefined),
        class: {
          'data-table': true,
          [context.attrs?.class || '']: true,
        },
      }

      return h('div', options, [
        wrap(headings.value, 'data-table-headings', props.css),
        ...rows.value,
      ])
    }
  }
})
