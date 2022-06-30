export default {
  async list({commit}, {page = 1, limit = 25}) {
    await this.$axios.get(`/permission?page=${page}&limit=${limit}`).then((response) => {
      commit('SET_LIST', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  async listLabel({commit}) {
    await this.$axios.get(`/permission/list-label`).then((response) => {
      commit('SET_LIST', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  async show({commit}, id) {
    await this.$axios.get(`permission/${id}`).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  async create({commit}, payload) {
    await this.$axios.post('permission', payload).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  async update({commit}, {payload, id}) {
    await this.$axios.put(`permission/${id}`, payload).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  async delete({commit}, id) {
    await this.$axios.delete(`permission/${id}`).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  async routeList({commit}) {
    await this.$axios.get(`list-route`).then((response) => {
      commit('SET_ROUTES', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  async modelList({commit}) {
    await this.$axios.get(`list-model`).then((response) => {
      commit('SET_MODELS', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
}
