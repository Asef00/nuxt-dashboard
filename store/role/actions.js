export default {
  async list({commit}) {
    await this.$axios.get('role').then((response) => {
      commit('SET_LIST', response.data)
    }).catch((error) => {
      this.$error(error.response)
    })
  },
  async show({commit}, {role}) {
    await this.$axios.get(`role/${role._id}`).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      this.$error(error.response)
    })
  },
  async create({commit}, payload) {
    await this.$axios.post('role', payload).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      this.$error(error.response)
    })
  },
  async update({commit}, {payload, role}) {
    await this.$axios.put(`role/${role._id}`, payload).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      this.$error(error.response)
    })
  },
  async delete({commit}, {role}) {
    await this.$axios.delete(`role/${role._id}`).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      this.$error(error.response)
    })
  },
}
