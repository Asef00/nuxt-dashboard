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
  SET_COGNITO_USERS(state, data) {
    state.cognitoUsers = data
  },
  RESET_COGNITO_USERS(state) {
    state.cognitoUsers = []
  },
  RESET_ERROR(state) {
    state.error = null
  },
  SET_ERROR(state, data) {
    state.error = data
  },

}
