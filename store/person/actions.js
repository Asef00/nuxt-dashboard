export default {
  async list({commit}) {
    await this.$axios.get('person').then((response) => {
      commit('SET_LIST', response.data)
    }).catch((error) => {
      this.$error(error.response)
    })
  },
  async show({commit}, {person}) {
    await this.$axios.get('person/'.person._id).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      this.$error(error.response)
    })
  },
  async create({commit}, payload) {
    await this.$axios.post('person', payload).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      this.$error(error.response)
    })
  },
  async update({commit}, {payload, person}) {
    await this.$axios.put(`person/${person._id}`, payload).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      this.$error(error.response)
    })
  },
  async changePassword({commit}, {payload, person}) {
    await this.$axios.put(`person/${person._id}/change-password`, payload).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      this.$error(error.response)
    })
  },
  async toggleEnable({commit}, {payload, person}) {
    await this.$axios.put(`person/${person._id}/toggle/enable`, payload).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      this.$error(error.response)
    })
  },
  async toggleVerifyEmail({commit}, {payload, person}) {
    await this.$axios.put(`person/${person._id}/toggle/verify-email`, payload).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      this.$error(error.response)
    })
  },
  async searchInCognito({commit}, key, value) {
    await this.$axios.get(`person/search/cognito`, {params: {key: key, value: value}}).then((response) => {
      commit('SET_COGNITO_USERS', response.data)
    }).catch((error) => {
      this.$error(error.response)
    })
  },
  async createPersonFromCognito({commit}, payload) {
    await this.$axios.post(`person/cognito/create`, payload).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      this.$error(error.response)
    })
  },
}
