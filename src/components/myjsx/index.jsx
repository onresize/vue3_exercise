import { ref } from 'vue'

const Child = (props, emits) => {
  return (
    <div>
      <h3>我是子组件、获取父组件的值：{props.abc}</h3>
      <el-button onClick={() => props.getMsg('123')}>触发事件传递参数给父组件</el-button>
    </div>
  )
}

export default function List(props, emits) {
  let a = ref(0)
  let b = ref(1111)
  const Father = (childParams) => {
    a.value = childParams
    console.log('拿到子组件参数：', childParams);
  }
  return (
    <div>
      <h1>vue中写jsx、灵活的封装组件</h1>
      <h3>拿到子组件参数：{a.value}（点击按钮无法更新这个数据）</h3>
      <Child getMsg={Father} abc={b.value} />
    </div>
  )
}
