import { ip } from "@/config/config";

export const state = () => ({
    foods: []
})

export const mutations = {
    setFoods(state, foods) {
        state.foods = foods
    }
}

export const actions = {
    async fetch({ commit }) {
        // const foods = await this.$axios.$get('http://192.168.8.131:9000/api/food')
        const foods = await this.$axios.$get(ip + "/api/food")
        commit('setFoods', foods)
    }
}

export const getters = {
    foods: s => s.foods
}