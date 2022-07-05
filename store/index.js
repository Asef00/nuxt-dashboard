export const state = () => ({
  version: '1.0.0',
  error: null,
  pageHeaderTitle: '',
  pageHeaderBreadcrumb: [],
  axiosParams: {}
})

export const getters = {
  error(state) {
    return state.error
  },
  pageHeaderTitle(state) {
    return state.pageHeaderTitle
  },
  pageHeaderBreadcrumb(state) {
    return state.pageHeaderBreadcrumb
  },
  axiosParams(state) {
    return state.axiosParams
  }
}

export const mutations = {
  RESET_ERROR(state) {
    state.error = null
  },
  SET_ERROR(state, data) {
    state.error = data
  },
  RESET_PAGE_HEADER_TITLE(state) {
    state.pageHeaderTitle = ''
  },
  SET_PAGE_HEADER_TITLE(state, data) {
    state.pageHeaderTitle = data
  },
  RESET_PAGE_HEADER_BREADCRUMB(state) {
    state.pageHeaderBreadcrumb = []
  },
  SET_PAGE_HEADER_BREADCRUMB(state, data) {
    state.pageHeaderBreadcrumb = data
  },
  RESET_AXIOS_PARAMS(state) {
    state.axiosParams = {}
  },
  SET_AXIOS_PARAMS(state, data) {
    state.axiosParams = {...state.axiosParams, ...data}
  },
}
