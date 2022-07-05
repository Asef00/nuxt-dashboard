export default {
  async list({commit, rootState}) {
    await this.$axios.get(`/person`, {params: rootState.axiosParams}).then((response) => {
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
  async toggleEnable({commit}, id) {
    await this.$axios.put(`person/${id}/toggle/enable`).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  async toggleVerifyEmail({commit}, id) {
    await this.$axios.put(`person/${id}/toggle/verify-email`).then((response) => {
      commit('SET_COGNITO_USER', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  async searchInCognito({commit}, {key, value, paginationToken = null}) {
    let param = {key: key, value: value};
    if (paginationToken != null) {
      param = {pagination_token: paginationToken, ...param}
    }
    await this.$axios.get(`/person/cognito/search`, {params: param}).then((response) => {
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
