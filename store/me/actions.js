export default {
  async authPassChallenge({commit, context}, payload) {
    await this.$axios.post('auth/token/challenge', payload).then((response) => {
      context('setToken', response.data)
    }).catch((error) => {
      this.$error(error.response)
    })
  },
  async forgetPassword({commit, context}, payload) {
    await this.$axios.post('auth/forget-password', payload).then((response) => {
      commit('SET_RESPONSE', response.data)
    }).catch((error) => {
      this.$error(error.response)
    })
  },
  async confirmForgetPassword({commit, context}, payload) {
    await this.$axios.post('auth/forget-password/confirm', payload).then((response) => {
      commit('SET_RESPONSE', response.data)
    }).catch((error) => {
      this.$error(error.response)
    })
  },
  async sendVerifyCodeEmail({commit, context}, payload) {
    await this.$axios.post('auth/send-verify-code/email', payload).then((response) => {
      commit('SET_RESPONSE', response.data)
    }).catch((error) => {
      this.$error(error.response)
    })
  },
  async verifyEmail({commit, context}, payload) {
    await this.$axios.post('auth/verify/email', payload).then((response) => {
      commit('SET_RESPONSE', response.data)
    }).catch((error) => {
      this.$error(error.response)
    })
  },
  async changePassword({commit, context}, payload) {
    await this.$axios.post('auth/change-password', payload).then((response) => {
      commit('SET_RESPONSE', response.data)
    }).catch((error) => {
      this.$error(error.response)
    })
  },
  async update({commit}, payload) {
    await this.$axios.put('auth/person', payload).then((response) => {
      commit('SET_RESPONSE', response.data)
    }).catch((error) => {
      this.$error(error.response)
    })
  },
  setToken({}, data) {
    this.$auth.setUserToken(data.access_token, data.refresh_token);
  }
}
