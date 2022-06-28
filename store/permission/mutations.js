export default {
  RESET_LIST(state) {
    state.list = []
  },
  SET_LIST(state, data) {
    state.list = data
  },
  RESET_ITEM(state) {
    state.item = null
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
  SET_ROUTES(state, data) {
    state.routes = data
  },
  SET_MODELS(state, data) {
    state.models = data
  },
}
