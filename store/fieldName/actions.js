export default {
  async list({commit}) {
    await this.$axios.get('field-name').then((response) => {
      commit('SET_LIST', response.data)
    }).catch((error) => {
      this.$error(error.response)
    })
  },
  async show({commit}, {fieldName}) {
    await this.$axios.get(`field-name/${fieldName._id}`).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      this.$error(error.response)
    })
  },
  async create({commit}, payload) {
    await this.$axios.post('field-name', payload).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      this.$error(error.response)
    })
  },
  async update({commit}, {payload, fieldName}) {
    await this.$axios.put(`field-name/${fieldName._id}`, payload).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      this.$error(error.response)
    })
  },
  async delete({commit}, {fieldName}) {
    await this.$axios.delete(`field-name/${fieldName._id}`).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      this.$error(error.response)
    })
  },
}
