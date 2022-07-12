export default {
  RESET_ITEM(state) {
    state.item = {}
  },
  SET_ITEM(state, data) {
    state.item = data
  },
  RESET_ERROR(state) {
    state.error = null
  },
  SET_ERROR(state, data) {
    state.error = data
  },
}
