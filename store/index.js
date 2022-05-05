export const state = () => ({
  error: null
})

export const getters = {
  error (state) {
    state.error
  }
}

export const mutations ={
  RESET_ERROR(state) {
    state.error = null
  },
  SET_ERROR(state, data) {
    state.error = data
  }
}
