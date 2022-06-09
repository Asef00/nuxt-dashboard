export default {
  async list({commit}) {
    await this.$axios.get('person').then((response) => {
      commit('SET_LIST', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  async show({commit}, {id, product = false}) {
    let config = {}
    if (product) {
      config.params = {'with': 'products'}
    }
    await this.$axios.get(`person/${id}`, config).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  async create({commit}, payload) {
    await this.$axios.post('person', payload).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  async update({commit}, {payload, id}) {
    await this.$axios.put(`person/${id}`, payload).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  async changePassword({commit}, {payload, id}) {
    await this.$axios.put(`person/${id}/change-password`, payload).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  async toggleEnable({commit}, {payload, id}) {
    await this.$axios.put(`person/${id}/toggle/enable`, payload).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  async toggleVerifyEmail({commit}, {payload, id}) {
    await this.$axios.put(`person/${id}/toggle/verify-email`, payload).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  async searchInCognito({commit}, {key, value}) {
    await this.$axios.get(`/person/cognito/search`, {params: {key: key, value: value}}).then((response) => {
      commit('SET_COGNITO_USERS', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  async createPersonFromCognito({commit}, payload) {
    await this.$axios.post(`/person/cognito/create`, payload).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
}
