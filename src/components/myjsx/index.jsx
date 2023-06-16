import { ref, useCssModule } from "vue";
import myStyle from "./index.css";

// 子组件
const Child = (props, { emit }) => {
  const myStyle = {
    margin: "10px",
    color: "green",
  };
  const pushFather = () => {
    console.log("执行pushFather--------");
    emit("myClick", "456");
  };
  return (
    <div>
      <h3>我是子组件、获取父组件的值：{props.abc}</h3>
      <el-button style={myStyle} onClick={() => props.getMsg("123")}>
        btn1触发事件传递参数给父组件（无法更新这个数据）
      </el-button>
      <br />
      <el-button class="btn2" onClick={() => pushFather()}>
        btn2触发事件传递参数给父组件（无法更新这个数据）
      </el-button>
    </div>
  );
};

// 父组件
const List = (props, emits) => {
  let a = ref(0);
  let b = ref(1111);
  const Father = (childParams) => {
    a.value = childParams;
    console.log("btn1拿到子组件参数：", childParams);
  };
  const ToMyClick = (childParams) => {
    a.value = childParams;
    console.log("btn2拿到子组件参数：", childParams);
  };
  return (
    <div class="mixinHeight">
      <h1>vue中写jsx、灵活的封装组件</h1>
      <h3>拿到子组件参数：{a.value}</h3>
      <Child getMsg={Father} abc={b.value} onMyClick={ToMyClick} />
    </div>
  );
};

export default List;
