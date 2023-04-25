// 使用h函数封装组件
import { h, renderSlot } from 'vue'
import './hCom.less'

const myTextCom = (props, { slots, emit }) => {
  // console.log('插槽：', slots)
  console.log('子组件拿到双向绑定的值：', props.modelValue)
  return [
    h('div', { class: 'textBox', style: { ...props } }, [
      // 顶部插槽👇👇
      slots.top && h('slot', { name: 'top' }, [
        h('div', { class: 'slotTop' }, slots.top?.() || '默认顶部slot')
      ]),
      // 底部插槽👇👇
      slots.bottom && h('slot', { name: 'bottom' }, [
        h('div', { class: 'slotBottom' }, slots.bottom?.() || '默认底部slot')
      ]),
      // default插槽👇👇
      (!slots.top && !slots.bottom) && h('slot', [h('div', {
        class: 'defaultBox'
      }, [
        // 双向绑定
        renderSlot(slots, 'default', {
          modelValue: props.modelValue,
          'onUpdate:modelValue': (value) => emit('update:modelValue', value)
        }), h('span', props.modelValue)
      ]
      )]),
    ])
  ]
}

const myPicCom = (props, { slots }) => {
  const { width, height, src } = props
  return [
    h('img', {
      class: "picBox", style: { width: (width || '100px'), height: (height || '100px'), borderRadius: '50%', objectFit: 'contain' }, src: src || 'https://img0.baidu.com/it/u=1217304799,3113310756&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500', alt: 'noPic', onClick() {
        alert('触发方法测试')
      }
    })
  ]
}

export {
  myTextCom,
  myPicCom
}