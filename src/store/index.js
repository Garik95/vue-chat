import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    user: {
      _id: null,
      login: null,
      firstName: null,
      lastName: null
    },
    chatNotif: {},
    authToken: null,
    selectedChat: null,
    chatList: [],
    drawerMini: false
  },
  getters: {
    getUser: state => {
      return state.user
    },
    getAuthToken: state => {
      return state.authToken
    },
    getSelectedChat: state => {
      return state.selectedChat
    },
    getDrawerMini: state => {
      return state.drawerMini
    },
    getChatNotif: state => {
      return state.chatNotif
    },
    getChatList: state => {
      return state.chatList
    }
  },
  mutations: {
    setUser(state, val) {
      state.user = val
    },
    setAuthToken(state, val) {
      state.authToken = val
    },
    setSelectedChat(state, val) {
      state.selectedChat = val
    },
    setDrawerMini(state, val) {
      state.drawerMini = val
    },
    setChatNotif(state, val) {
      Vue.set(state.chatNotif, val.key, val.value)
    },
    pushChatList(state, val) {
      state.chatList.unshift(val);
    },
    unsetAuthToken(state) {
      state.authToken = null
    },
    unsetUser(state) {
      state.user = {
        _id: null,
        login: null,
        firstName: null,
        lastName: null
      }
    },
    unsetState(state) {
      state.selectedChat = null,
        state.drawerMini = false
    },
    unsetChatNotif(state, val) {
      Vue.delete(state.chatNotif, val)
    },
    popChatList(state, val) {
      state.chatList = state.chatList.filter(item => {
        return item._id != val
      })
    }
  },
  actions: {
    flushState(ctx) {
      ctx.commit('unsetAuthToken')
      ctx.commit('unsetUser')
      ctx.commit('unsetState')
    },
    pushNotif(ctx, val) {
      var chat = ctx.getters.getChatList.filter(item => {
        return item._id == val.from
      });
      if (chat.length != 0) {
        var pushCnt = ctx.getters.getChatNotif[val.from];
        if (typeof pushCnt == undefined || pushCnt == null) {
          pushCnt = 0
        }
        ctx.commit('setChatNotif', {
          key: val.from,
          value: pushCnt + 1
        });
      } else {
        axios.get('User/' + val.from).then(response => {
          ctx.commit("pushChatList", response.data);
          ctx.commit('setChatNotif', {
            key: val.from,
            value: 1
          })
        })
      }
    },
    pushChatList(ctx, val) {
      var chat = ctx.getters.getChatList.filter(item => {
        return item._id == val._id
      });
      if (chat.length == 0) {
        ctx.commit("pushChatList", val);
      }

      ctx.commit('setSelectedChat', val)
    }
  },
  modules: {}
})