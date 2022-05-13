export default {
  async list({commit}) {
    await this.$axios.get('permission').then((response) => {
      commit('SET_LIST', response.data)
    }).catch((error) => {
      this.$error(error.response)
    })
  },
  async show({commit}, {permission}) {
    await this.$axios.get(`permission/${permission._id}`).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      this.$error(error.response)
    })
  },
  async create({commit}, payload) {
    await this.$axios.post('permission', payload).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      this.$error(error.response)
    })
  },
  async update({commit}, {payload, permission}) {
    await this.$axios.put(`permission/${permission._id}`, payload).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      this.$error(error.response)
    })
  },
  async delete({commit}, {permission}) {
    await this.$axios.delete(`permission/${permission._id}`).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      this.$error(error.response)
    })
  },
}
