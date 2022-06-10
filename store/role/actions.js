export default {
  async list({commit}) {
    await this.$axios.get('role').then((response) => {
      commit('SET_LIST', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  async show({commit}, id) {
    await this.$axios.get(`role/${id}`).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  async create({commit}, payload) {
    await this.$axios.post('role', payload).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  async update({commit}, {payload, id}) {
    await this.$axios.put(`role/${id}`, payload).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  async delete({commit}, id) {
    await this.$axios.delete(`role/${id}`).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
}
