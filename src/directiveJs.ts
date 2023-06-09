import Vue from "vue";
//XXX 全局自定义指令、main.ts直接调用这个导出的方法
// export default (app) => {
//   // el：指令绑定的dom结构、binding：指令绑定的值
//   app.directive("font-size-color", (el, binding) => {
//     console.log("font-size-color-->binding:", binding);
//     Object.keys(binding.value).forEach((key) => {
//       el.style[key] = binding.value[key];
//     });
//   }),
//     app.directive("font-size-col", (el, binding) => {
//       console.log("font-size-col-->binding:", binding);
//       el.style[binding.arg] = binding.value;
//     }),
//     app.directive("dom-bgc", (el, binding) => {
//       console.log("dom-bgc-->binding:", binding);
//       el.style.backgroundColor = binding.value;
//       el.style.padding = "20px";
//       el.style.borderRadius = "20px";
//     });
// };

// XXX main.ts使用app.use()注册、方式一
// export default (Vue, app) => {
//   // el：指令绑定的dom结构、binding：指令绑定的值
//   app.directive("font-size-color", (el, binding) => {
//     console.log("font-size-color-->binding:", binding);
//     Object.keys(binding.value).forEach((key) => {
//       el.style[key] = binding.value[key];
//     });
//   }),
//     app.directive("font-size-col", (el, binding) => {
//       console.log("font-size-col-->binding:", binding);
//       el.style[binding.arg] = binding.value;
//     }),
//     app.directive("dom-bgc", (el, binding) => {
//       console.log("dom-bgc-->binding:", binding);
//       el.style.backgroundColor = binding.value;
//       el.style.padding = "20px";
//       el.style.borderRadius = "20px";
//     });
// };

// XXX main.ts使用app.use()注册、方式二
export default {
  install(Vue, app) {
    // el：指令绑定的dom结构、binding：指令绑定的值
    app.directive("font-size-color", (el, binding) => {
      console.log("font-size-color-->binding:", binding);
      Object.keys(binding.value).forEach((key) => {
        el.style[key] = binding.value[key];
      });
    }),
      app.directive("font-size-col", (el, binding) => {
        console.log("font-size-col-->binding:", binding);
        el.style[binding.arg] = binding.value;
      }),
      app.directive("dom-bgc", (el, binding) => {
        console.log("dom-bgc-->binding:", binding);
        el.style.backgroundColor = binding.value;
        el.style.padding = "20px";
        el.style.borderRadius = "20px";
      });
  },
};
