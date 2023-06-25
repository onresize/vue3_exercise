<template>
  <el-card class="cad">
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick">
      <template #default="{ node }">
        <div>
          <el-tag class="tag" type="success" color="#ffcc99" v-if="node.label.includes('http')">
            <span> {{ node.label }}</span>
          </el-tag>
          <el-tag type="success" color="#ffcc99" v-else-if="node.label.includes('301') || node.label.includes('302') || node.label.includes('304')">
            <span>
              {{ node.label }}
            </span>
          </el-tag>
          <span v-else>
            {{ node.label }}
          </span>
        </div>
      </template>
    </el-tree>
  </el-card>
</template>

<script setup>
import { ref, reactive } from "vue";

const defaultProps = {
  children: "children",
  label: "label",
};

const data = [
  {
    label: "http 状态返回代码  1xx （临时响应）",
    children: [
      {
        label: "100（继续）请求者应当继续提出请求。服务器返回此代码表示已收到请求的第一部分，正在等待其余部分",
      },
      {
        label: "101（切换协议）请求者已要求服务器切换协议，服务器已确认并准备切换",
      },
    ],
  },
  {
    label: "http 状态返回代码  2xx  （成功）",
    children: [
      {
        label: "200（成功）服务器已成功处理了请求。通常，这表示服务器提供了请求的网页",
      },
      {
        label: "201（已创建）  请求成功并且服务器创建了新的资源",
      },
      {
        label: "202（已接受）  服务器已接受请求，但尚未处理",
      },
      {
        label: "203（非授权信息）  服务器已成功处理了请求，但返回的信息可能来自另一来源",
      },
      {
        label: "204（无内容）  服务器成功处理了请求，但没有返回任何内容",
      },
      {
        label: "204（无内容）  服务器成功处理了请求，但没有返回任何内容",
      },
      {
        label: "205（重置内容）服务器成功处理了请求，但没有返回任何内容",
      },
      {
        label: "206（部分内容）  服务器成功处理了部分 GET 请求",
      },
    ],
  },
  {
    label: "http 状态返回代码  3xx  （重定向）",
    children: [
      {
        label: "300（多种选择）针对请求，服务器可执行多种操作。服务器可根据请求者 (user agent) 选择一项操作，或提供操作列表供请求者选择",
      },
      {
        label: "301（永久性重定向）请求的网页已永久移动到新位置。服务器返回此响应（对 GET 或 HEAD 请求的响应）时，会自动将请求者转到新位置",
      },
      {
        label: "302（临时重定向）服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来进行以后的请求",
      },
      {
        label: "303（查看其他位置）请求者应当对不同的位置使用单独的 GET 请求来检索响应时，服务器返回此代码",
      },
      {
        label: "304（未修改、跳转网页）自从上次请求后，请求的网页未修改过。服务器返回此响应时，不会返回网页内容",
      },
      {
        label: "305（使用代理）请求者只能使用代理访问请求的网页。如果服务器返回此响应，还表示请求者应使用代理",
      },
      {
        label: "307（临时重定向）服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来进行以后的请求",
      },
    ],
  },
  {
    label: "http 状态返回代码  4xx （请求错误）",
    children: [
      {
        label: "400（错误请求）服务器不理解请求的语法",
      },
      {
        label: "401（未授权）请求要求身份验证对于需要登录的网页，服务器可能返回此响应",
      },
      {
        label: "403（禁止）服务器拒绝请求",
      },
      {
        label: "404（未找到）服务器找不到请求的网页",
      },
      {
        label: "405（方法禁用）禁用请求中指定的方法",
      },
      {
        label: "406（不接受）无法使用请求的内容特性响应请求的网页",
      },
      {
        label: "407（需要代理授权）此状态代码与 401（未授权）类似，但指定请求者应当授权使用代理",
      },
      {
        label: "408（请求超时）  服务器等候请求时发生超时",
      },
      {
        label: "409（冲突）  服务器在完成请求时发生冲突服务器必须在响应中包含有关冲突的信息",
      },
      {
        label: "410（已删除）  如果请求的资源已永久删除，服务器就会返回此响应",
      },
      {
        label: "411（需要有效长度）服务器不接受不含有效内容长度标头字段的请求",
      },
      {
        label: "412（未满足前提条件）服务器未满足请求者在请求中设置的其中一个前提条件",
      },
      {
        label: "413（请求实体过大）服务器无法处理请求，因为请求实体过大，超出服务器的处理能力",
      },
      {
        label: "414（请求的 URI 过长）请求的 URI（通常为网址）过长，服务器无法处理",
      },
      {
        label: "415（不支持的媒体类型）请求的格式不受请求页面的支持",
      },
      {
        label: "416（请求范围不符合要求）如果页面无法提供请求的范围，则服务器会返回此状态代码",
      },
      {
        label: "417（未满足期望值）服务器未满足'期望'请求标头字段的要求",
      },
    ],
  },
  {
    label: "http 状态返回代码  5xx （服务器错误）",
    children: [
      {
        label: "500（服务器内部错误）  服务器遇到错误，无法完成请求",
      },
      {
        label: "501（尚未实施）服务器不具备完成请求的功能。例如，服务器无法识别请求方法时可能会返回此代码",
      },
      {
        label: "502（错误网关）服务器作为网关或代理，从上游服务器收到无效响应",
      },
      {
        label: "503（服务不可用）服务器目前无法使用（由于超载或停机维护）通常，这只是暂时状态",
      },
      {
        label: "504（网关超时）  服务器作为网关或代理，但是没有及时从上游服务器收到请求",
      },
      {
        label: "505（HTTP 版本不受支持）服务器不支持请求中所用的 HTTP 协议版本",
      },
    ],
  },
];

const handleNodeClick = (data) => {
  console.log(data);
};
</script>

<style scoped lang="less">
.cad {
  overflow-y: auto !important;
  overflow-x: hidden;
  height: calc(100% - 3px);
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    display: block !important;
  }

  .tag {
    font-weight: bold;
  }

  .el-tag {
    color: #000;
  }
}
</style>
