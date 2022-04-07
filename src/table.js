import { h, ref, computed, defineComponent } from 'vue'
import { uniqueKey } from './helpers'

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
    const key = `@anomalyce/data-table/${uniqueKey()}`

    context.expose({
      headings,
      key,
    })

    const rendered = context.slots.default()

    headings.value = rendered.filter(node => node.type?.name === '@anomalyce/data-table-heading')
    rows.value = rendered.filter(node => node.type?.name !== '@anomalyce/data-table-heading')

    const style = computed(() => ({
      display: 'grid',
      gridTemplateColumns: `repeat(${headings.value.length}, auto)`
    }))

    const options = {
      ...context.attrs,
      key,
      style: (props.css ? style.value : undefined),
      class: {
        'data-table': true,
        [context.attrs?.class || '']: true,
      },
    }

    return () => h('div', options, [
      h('div', {
        style: (props.css ? { display: 'contents' } : undefined),
        key: `@anomalyce/data-table/${key}/heading`,
        class: {
          'data-table-row': true,
          'data-table-headings': true,
        },
      }, [ ...headings.value ]),
      ...rows.value,
    ])
  }
})
