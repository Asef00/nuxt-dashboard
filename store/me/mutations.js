export default {
  RESET_RESPONSE(state) {
    state.response = null
  },
  SET_RESPONSE(state, data) {
    state.response = data
  },
  RESET_ERROR(state) {
    state.error = null
  },
  SET_ERROR(state, data) {
    state.error = data
  }
}
