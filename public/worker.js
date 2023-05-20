onmessage = function (e) {
  console.log('接收到主线程消息：', e)
  const { type, data } = e.data
  if (type === 'Multiplication') {
    const ret = data.num1 * data.num2
    return new Promise((res) => {
      setTimeout(() => {
        res()
        postMessage({
          type: 'Multiplication',
          data: ret + ''
        })
      }, 2000)
    })
  }
}
