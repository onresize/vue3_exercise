### vue3 需注意要点：

```js
1.在setUp方式下 引入组件直接import就可以直接再template中使用
2.setup下、直接就是vue2的created生命周期
3.顶层await、 setup模式下，请求只需要写 await 可以省略async、定义函数还是要两个都写
```

### ref /reactive

```js
# ref /reactive 响应式API
ref一般定义除了数组和对象其他的类型，script操作要用.value取值、dom结构上不需要.value
reactive定义数组和对象的响应式数据、正常取值
```

### computed使用方法

```js
# computed使用方法
let num = ref<number>(5)
let price = ref<number>(10)
let total = ref<number | string>(0)
total = computed<number>(() => {
    return '$' + price * num
})
num = computed({
    // 改变后的回调方法
    get() => {
    	return num.value
	},
    // 值改变就会触发
    set(newVal) => {
    	num.value = newVal + 100
	}
})
```

### watch 和 watchEffect 基本使用方法

```js
# watch基本使用方法
import { ref, reactive, watch } from 'vue'
let value1 = ref<string>('张三')
let value2 = ref<string>('李四')
let value3 = reactive({
    name: 'zs',
    age: 15
})

// 1.监听一个值
watch(value1, (newVal, oldVal) => {
    console.log('新值', newVal)
    console.log('旧值', oldVal)
})
// 2.监听两个值
watch([value1, value2], (newVal, oldVal) => {
    console.log('新值', newVal)
    console.log('旧值', oldVal)
})

// 3.watch第一个参数可以携程函数，第三个参数设置 deep: true | immediate: true
watch(() => value3.name, (newVal, oldVal) => {
    console.log('新值', newVal)
    console.log('旧值', oldVal)
},{
  deep: true,
  immeidate: true
})

# watchEffect高级监听 （更多参数配置参考如下：）
https://blog.csdn.net/qq1195566313/article/details/122802130?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522164829064116781683932142%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fblog.%2522%257D&request_id=164829064116781683932142&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~first_rank_ecpm_v1~rank_v31_ecpm-1-122802130.nonecase&utm_term=vue3+watcheffect&spm=1018.2226.3001.4450

// 高级监听watchEffect、默认立即执行、
const stop = watchEffect((beforeWatch) => {
  console.log("监听value2", value2.value);
  console.log("监听value3.name", value3.name);
  // 这个回调函数可以监听之前处理一些逻辑、例如：防抖
  beforeWatch(() => {
    console.log("监听之前触发----");
  });
});

// 按钮点击停止监听
const stopWatch = () => {
  stop();
  console.log("停止监听----");
};
```

### 父子传值

```js
# 父子传值
// 1.父组件中子组件标签传值是字符串省略v-bind、
<h3>父组件拿到子组件的title值--{{ childTitle }}</h3>
<child ref="childRef1" :list="list" @getTitle="getChild" />
let childTitle = ref<string>("默认值");

// 定义ref拿到子组件的属性和方法、名字要和标签定义的ref名称一致、搭配子组件暴露defineExpose使用
let childRef1 = ref();

type obj = {
  name: string;
  title: string;
};
let list = reactive<obj[]>([
  { name: "A", title: "这是子组件A" },
  { name: "B", title: "这是子组件B" },
  { name: "C", title: "这是子组件C" },
]);
//接收到子组件传递的参数
const getChild = (e: string) => {
  childTitle.value = e;
};
onMounted(() => {
  // 通过ref调用子组件中定义的方法
  childRef1.value.getAA();
});


// 2.子组件接收父组件的值
<button @click="clickBtn(item.title)">触发事件给父组件</button>
let arr = reactive<number[]>([1, 4, 5]);
const getAA = () => {
  console.log(new Date().toLocaleDateString());
};

type obj = {
  name: string;
  title: string;
};
type props = {
  list?: obj[]; // ?表示允许可选
};
//defineEmits、 触发一个事件给父组件并传递参数
const emit = defineEmits(["getTitle"]);
const clickBtn = (title: string): void => {
  emit("getTitle", title);
};
// withDefaults接收父组件穿的值为空、默认值写法
withDefaults(defineProps<props>(), {
  list: () => [{ name: "name", title: "标题" }],
});

// 子组件中定义的arr数组通过defineExpose暴露给父组件通过定义ref实例拿到这个属性
defineExpose({
  arr, // 数组属性
  getAA, // 方法
});
```

### 匿名插槽、具名插槽、作用域插槽

```js
# 1.匿名插槽
父组件在子组件标签内使用template搭配v-slot、子组件使用 slot占位符标签显示内容
	// 父组件
	<children>
      <template v-slot>
        <div>我被插入了中间</div>
      </template>
     </children>
	
	// 子组件
	<header class="header">
      <slot></slot>
    </header>
    <main class="main">
      <slot></slot>
    </main>
```

```js
# 2.具名插槽
// 注意: v-slot:xx 简写成 #xx、也可以动态绑定写成 #[slotName]、然后定义响应式slotName
	// 父组件
	<children>
      <template v-slot:header>
        <div>我被插入了头部</div>
      </template>

	  <template #main>
        <div>我被插入了中间</div>
      </template>

 	  <template #[mySlot]>
        <div>我被插入了底部</div>
      </template>
     </children>

	let mySlot = ref('footer')
	
	// 子组件
	<header class="header">
      <slot name="header"></slot>
    </header>
    <main class="main">
      <slot name="main"></slot>
    </main>
	<footer class="footer">
      <slot name="footer"></slot>   
    </footer>
```

```js
# 3.作用域插槽
// 注意： v-slot作用域插槽时可以简写 #default
子组件插槽上自定义绑定属性
	// 子组件
	<header class="header">
     	<div v-for="(item,i)" in data :key="i">
      		<slot :data="item" :i="i"></slot>
		</div>
    </header>

	let data = reactive([
        {name: '张三', age: 18},
        {name: '张三1', age: 20},
    ])
    
    // 父组件
    // <template #default="{data, i}">
     <template v-slot="{data, i}">
        <div> {{ data }}--{{ i }} </div>
     </template>
```

###  router 路由传参

####  Query路由传参

```js
编程式导航 使用router push 或者 replace 的时候 改为对象形式新增query 必须传入一个对象
const toDetail = (item: Item) => {
    router.push({
        path: '/reg',
        query: item
    })
}
```

```js
# 接受参数
# 使用 useRoute 的 query
import { useRoute } from 'vue-router';
const route = useRoute()

<div>品牌：{{ route.query?.name }}</div>
<div>价格：{{ route.query?.price }}</div>
<div>ID：{{ route.query?.id }}</div>
```

####  Params路由传参

```js
编程式导航 使用router push 或者 replace 的时候 改为对象形式并且只能使用name，path无效，然后传入params
const toDetail = (item: Item) => {
    router.push({
        name: 'Reg',
        params: item
    })
}
```

```js
# 接受参数
# 使用 useRoute 的 params
import { useRoute } from 'vue-router';
const route = useRoute()

<div>品牌：{{ route.params?.name }}</div>
<div>价格：{{ route.params?.price }}</div>
<div>ID：{{ route.params?.id }}</div>
```

```js
// 动态路由传参
很多时候，我们需要将给定匹配模式的路由映射到同一个组件。例如，我们可能有一个 User 组件，它应该对所有用户进行渲染，但用户 ID 不同。在 Vue Router 中，我们可以在路径中使用一个动态字段来实现，我们称之为 路径参数 
# 路径参数 用冒号 : 表示。当一个路由被匹配时，它的 params 的值将在每个组件
const routes:Array<RouteRecordRaw> = [
    {
        path:"/",
        name:"Login",
        component:()=> import('../components/login.vue')
    },
    {
        //动态路由参数
        path:"/reg/:id",
        name:"Reg",
        component:()=> import('../components/reg.vue')
    }
]


const toDetail = (item: Item) => {
    router.push({
        name: 'Reg',
        params: {
            id: item.id
        }
    })
}


import { useRoute } from 'vue-router';
import { data } from './list.json'
const route = useRoute()
 
const item = data.find(v => v.id === Number(route.params.id))
```

#### 二者的区别

```js
1.query 传参配置的是 path，而 params 传参配置的是name，在 params中配置 path 无效

2.query 在路由配置不需要设置参数，而 params 必须设置

3.query 传递的参数会显示在地址栏中

4.params传参刷新会无效，但是 query 会保存传递过来的值，刷新不变 ;

5.路由配置
```

### 路由 滚动行为

```js
使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。vue-router 可以自定义路由切换时页面如何滚动。
const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: (to, from, savePosition) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          top: 10000
        })
      }, 2000);
    })
  },
    
scrollBehavior 方法接收 to 和 from 路由对象。第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。
const router = createRouter({
history: createWebHistory(),
scrollBehavior: (to, from, savePosition) => {
  return {
     top:200
  }
},
```

### vue3定义全局变量和函数

```js
const app = createApp({})
// 定义全局变量 $env
app.config.globalProperties.$env = '这是全局变量'

type Filter = {
  format: <T>(str: T) => string;
};

// 声明文件、在ts中防止报错
declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $env: string;
    $filters: Filter;
  }
}

app.config.globalProperties.$filters = {
  format<T>(str: T): string {
    return `--------${str}---------`;
  },
};

1. template中直接使用
{{ $env }}
{{ $filters.format('vue3移除filters属性') }}

2. setup 中使用
import { getCurrentInstance, ComponentInternalInstance } from "vue";
const { appContext } = <ComponentInternalInstance>getCurrentInstance();
console.log(appContext.config.globalProperties.$env)
```

