import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter, asyncRoutes, anyRoutes,constantRoutes } from '@/router'
import cloneDeep from 'lodash/cloneDeep'
import router from '@/router'

const getDefaultState = () => {
  return {
    // 获取token
    token: getToken(),
    // 存储用户名
    name: '',
    // 存储用户头像
    avatar: '',
    //服务器返回的菜单信息【根据不同的角色：返回的标记信息，数组里面的元素是字符串】
    routes:[],
    //角色信息
    roles:[],
    //按钮权限的信息
    buttons:[],

    // 对比之后，得出的需要展示的路由
    resultAsyncRoutes:[],
    // 最终确定要展示的路由（包括常量等）
    resultRoutes:[]
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERINFO:(state, userInfo) => {
    // 用户名
    state.name = userInfo.name
    // 头像
    state.avatar = userInfo.avatar
    // 菜单权限标记
    state.routes = userInfo.routes
    // 按钮权限标记
    state.buttons = userInfo.buttons
    // 角色
    state.roles = userInfo.roles
  },
  // 最终计算出的异步路由：展示
  SET_RESULTASYNCROUTES:(state, asyncRoutes) => {
    // vuex保存当前用户的异步路由：任意、异步、常量
    state.resultAsyncRoutes = asyncRoutes
    // 接着计算出当前用户需要展示的路由
    state.resultRoutes = constantRoutes.concat(state.resultAsyncRoutes, anyRoutes)
    // 给路由器添加新的路由
    router.addRoutes(state.resultRoutes)
  }
}

// 定义一个函数：两个数组进行对比，对比当前用户到底显示有哪些路由
const computedAsyncRoutes = (asyncRoutes, routes) => {
  // 过滤出当前用户需要展示的路由
  return asyncRoutes.filter(item => {
    if(routes.indexOf(item.name) != -1){
      if(item.children && item.children.length) 
        item.children = computedAsyncRoutes(item.children, routes)
      return true
    }
  })
}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    let result = await login({ username: username.trim(), password: password })
    // 注意：当前登录请求使用mock数据，mock数据是20000，但真实端口可能不是
    console.log(result)
    if(result.code === 20000){
      // 携带数据，传入SET_TOKEN
      commit('SET_TOKEN', result.data.token)
      // 数据持久化，存入硬盘
      setToken(result.data.token)
      return 'ok'
    }else{
      return Promise.reject(new Error('failed'))
    }
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        // vuex存储全部用户信息
        commit('SET_USERINFO',data)
        commit('SET_RESULTASYNCROUTES',computedAsyncRoutes(cloneDeep(asyncRoutes), data.routes))
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

