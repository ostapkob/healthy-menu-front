export const state = () => ({
    token: null,
})

// export const mutations = {
//     setToken(state, token) {
//         state.token = token 
//     },
//     clearToken(state) {
//         state.token = null
//     }
// }

// export const actions = {
//     nuxtServerInit({}) {
//         console.log('nuxtServerInit')
//     },
//     login({commit}) {
//         console.log('login')
//         commit('setToken', 'truetoken')
//     },
//     logout({commit}) {
//         console.log('logout')
//         commit('clearToken')
//     },
// }

export const getters = {
    // hasToken: s => !!s.token,
    // categories: s => s.categories
}
