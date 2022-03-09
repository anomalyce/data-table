import { h } from 'vue'

export const wrap = (nodes, className, useStyles) => {
  return h('div', {
    style: (useStyles ? { display: 'contents' } : undefined),
    class: {
      'data-table-row': true,
      [className]: className !== undefined,
    },
  }, nodes)
}
