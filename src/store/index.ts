// XXX vueX演示
import { createStore } from "vuex";

export default createStore({
  state: {
    shoesCount: 0,
  },
  mutations: {
    addCount(state, num) {
      console.log("VUEX执行了同步方法addCount", num);
      state.shoesCount += num;
    },
  },
  actions: {
    asyncAddCount(store, num) {
      setTimeout(() => {
        console.log("VUEX执行了异步方法asyncAddCount", num);
        store.commit("addCount", num);
      }, 1000);
    },
  },
  modules: {},
});
