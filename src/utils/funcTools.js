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
  return localStorage.setItem(key, JSON.stringify(value));
};

//存缓存中读取
export const getStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// 防抖
let timeout = null;
export function Debounce(func, delay, event = {}, immediate = false) {
  if (timeout !== null) clearTimeout(timeout);
  // 立即执行，此类情况一般用不到
  if (immediate) {
    const callNow = !timeout;
    timeout = setTimeout(() => {
      timeout = null;
    }, delay);
    if (callNow) typeof func === "function" && func(event);
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时delay毫秒后执行func回调方法
    timeout = setTimeout(() => {
      typeof func === "function" && func(event);
    }, delay);
  }
}

/**
 * 节流原理：在一定时间内，只能触发一次
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
let timer;
let flag;

export function Throttle(func, wait = 500, event = {}, immediate = true) {
  if (immediate) {
    if (!flag) {
      flag = true;
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === "function" && func(event);
      timer = setTimeout(() => {
        flag = false;
      }, wait);
    }
  } else if (!flag) {
    flag = true;
    // 如果是非立即执行，则在wait毫秒内的结束处执行
    timer = setTimeout(() => {
      flag = false;
      typeof func === "function" && func(event);
    }, wait);
  }
}
