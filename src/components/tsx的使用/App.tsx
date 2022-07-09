import { ref } from "vue";
let v = ref<string>("");
let arr = [1, 3, 4, 5, 6];
const renderDom = (props, emits) => {
  const divClick = (v, emits) => {
    console.log("点击了", v);
    emits.emit("myClick", v);
  };

  return (
    <div>
      <div>
        {/* tsx中dom结构上写v-model绑定ref响应值、不会自动解包、需要用 .value */}
        <el-input v-model={v.value}></el-input>
        <span>{v.value}</span>
        <div>
          <br />
          <div>接收父级标签的属性--{props.title}</div>
          <br />
          {arr.map((v) => {
            return (
              // click方法用 bind传参、直接传会调用该函数
              // <el-button onClick={divClick.bind(this, v, emits)}>
              //   ${v}
              // </el-button>
              <el-button onClick={() => divClick(v, emits)}>
                ${v}
              </el-button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default renderDom;
