export default {
  async list({commit, rootState}) {
    await this.$axios.get(`product/mode`, {params: rootState.axiosParams}).then((response) => {
      commit('SET_LIST', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  async listLabel({commit}) {
    await this.$axios.get(`product/mode/list-label`).then((response) => {
      commit('SET_LIST', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  async show({commit}, id) {
    await this.$axios.get(`product/mode/${id}`).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  async create({commit}, payload) {
    await this.$axios.post('product/mode', payload).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  async update({commit}, {payload, id}) {
    await this.$axios.put(`product/mode/${id}`, payload).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  async delete({commit}, id) {
    await this.$axios.delete(`product/mode/${id}`).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
}
