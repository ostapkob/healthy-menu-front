import { ip } from "@/config/config";

export const state = () => ({
    categories: []
})

export const mutations = {
    setCategory(state, categories) {
        state.categories = categories
    }
}

export const actions = {
    async fetch({ commit }) {
        const categories = await this.$axios.$get(ip + "/api/category")
        commit('setCategory', categories)
    }
}

export const getters = {
    categories: s => s.categories
}