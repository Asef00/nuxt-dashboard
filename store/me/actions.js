export default {
  async authPassChallenge({commit, dispatch}, payload) {
    dispatch('setToken', payload)
    await this.$axios.post('auth/token/challenge', payload).then((response) => {
      dispatch('setToken', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  async forgetPassword({commit, context}, payload) {
    await this.$axios.post('auth/forget-password', payload).then((response) => {
      commit('SET_RESPONSE', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  async resendConfirmationCode({commit, context}, payload) {
    await this.$axios.post('auth/resend-confirmation-code', payload).then((response) => {
      commit('SET_RESPONSE', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  async confirmSingUp({commit, context}, payload) {
    await this.$axios.post('auth/confirm-singup', payload).then((response) => {
      commit('SET_RESPONSE', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  async confirmForgetPassword({commit, context}, payload) {
    await this.$axios.post('auth/forget-password/confirm', payload).then((response) => {
      commit('SET_RESPONSE', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  async sendVerifyCodeEmail({commit}) {
    await this.$axios.post('auth/send-verify-code/email').then((response) => {
      commit('SET_RESPONSE', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  async verifyEmail({commit, context}, payload) {
    await this.$axios.post('auth/verify/email', payload).then((response) => {
      commit('SET_RESPONSE', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  async changePassword({commit, context}, payload) {
    await this.$axios.post('auth/change-password', payload).then((response) => {
      commit('SET_RESPONSE', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  async update({commit}, payload) {
    await this.$axios.put('auth/person', payload).then((response) => {
      commit('SET_RESPONSE', response.data)
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  revokeToken() {
    this.$axios.post('/auth/token/revoke', {
      refresh_token: this.$auth.strategy.refreshToken.get()
    }).then((response) => {
      this.$auth.setUser(false)
      this.$auth.strategy.token.reset()
      this.$auth.strategy.refreshToken.reset()
      this.$router.push("/auth");
    })
  },
  setToken({}, data) {
    this.$auth.setUserToken(data.access_token, data.refresh_token);
  }
}
