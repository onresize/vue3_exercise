// 验证是否为函数
export const isFunction = (val) => {
  return typeof val === "function";
};

// 验证是否为对象
export const isObject = (val) => {
  return val !== null && typeof val === "object";
};

// 验证是否为Promise
export const isPromise = (val) => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};

//将数据存在本地
export const setStorage = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value))
}

//存缓存中读取
export const getStorage = (key) => {
  return (JSON.parse(localStorage.getItem(key)))
}
