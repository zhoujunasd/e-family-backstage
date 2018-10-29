import Vue from "vue";
import Vuex from "vuex";
import createPersistedState  from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
  },
  mutations: {
    CHANGE_USERINFO(state,userInfo){
      state.userInfo = userInfo
    },
    DELETE_USERINFO(state){
      state.userInfo = {}
    },
  },
  actions: {},
  plugins: [createPersistedState({
    storage: {
      getItem: key => sessionStorage.getItem (key),
      setItem: (key, value) =>
      sessionStorage.setItem(key, value,),
      removeItem: key => sessionStorage.removeItem(key),
    },
  })],
});
