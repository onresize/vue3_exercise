// 自定义请求hook
import { reactive } from 'vue'
import request from '@/util/request'

function useRequest(url, method = 'get', params) {
  const result = reactive({
    code: 0,
    data: [],
  })
  request({
    url,
    method,
    params: method.toUpperCase() === 'GET' ? params : {},
    data: params
  }).then(res => {
    result.code = res.data.code
    result.data = res.data.data
  })
  return result
}

export default useRequest