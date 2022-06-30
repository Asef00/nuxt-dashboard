export default {
  async list({commit}) {
    await this.$axios.get(`group`).then((response) => {
      commit('SET_LIST', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  // async list({commit}, {page = 1, limit = 25}) {
  //   await this.$axios.get(`group?page=${page}&limit=${limit}`).then((response) => {
  //     commit('SET_LIST', response.data)
  //   }).catch((error) => {
  //     commit('SET_ERROR', error)
  //   })
  // },
  async show({commit}, id) {
    await this.$axios.get(`group/${id}`).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  async create({commit}, payload) {
    await this.$axios.post('group', payload).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  async update({commit}, {payload, id}) {
    await this.$axios.put(`group/${id}`, payload).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  async delete({commit}, id) {
    await this.$axios.delete(`group/${id}`).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
}
