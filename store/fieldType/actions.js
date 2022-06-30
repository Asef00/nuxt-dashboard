export default {
  async list({commit}, {page = 1, limit = 25}) {
    await this.$axios.get(`field-type?page=${page}&limit=${limit}`).then((response) => {
      commit('SET_LIST', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  async show({commit}, id) {
    await this.$axios.get(`field-type/${id}`).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  async create({commit}, payload) {
    await this.$axios.post('field-type', payload).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  async update({commit}, {payload, id}) {
    await this.$axios.put(`field-type/${id}`, payload).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  async delete({commit}, id) {
    await this.$axios.delete(`field-type/${id}`).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
}
