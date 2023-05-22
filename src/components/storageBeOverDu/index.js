export class Storage {
  //存储接受 key value 和过期时间 默认永久
  setK(key, value, expire) {
    //格式化数据
    const data = {
      value,
      expire
    }
    //存进去
    localStorage.setItem(key, JSON.stringify(data))
  }

  get(key) {
    const value = localStorage.getItem(key)
    //读出来的数据是否有效
    if (value) {
      const obj = JSON.parse(value)
      const now = new Date().getTime()
      //有效并且是数字类型 并且过期了 进行删除和提示
      if (typeof obj['expire'] == 'number' && obj['expire'] < now) {
        this.remove(key)
        return {
          message: `您的${key}已过期`,
          value: null
        }
      } else {
        //否则成功返回
        return {
          message: "成功读取",
          value: obj.value
        }
      }
    } else {
      //否则key值无效
      console.warn('key值无效')
      return {
        message: `key值无效`,
        value: null
      }
    }
  }
  //删除某一项
  remove(key) {
    localStorage.removeItem(key)
  }
  //清空所有值
  clear() {
    localStorage.clear()
  }
}
