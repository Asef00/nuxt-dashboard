export default {
  async index({commit, rootState}) {
    await this.$axios.get(`dashboard`, {params: rootState.axiosParams}).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
}
