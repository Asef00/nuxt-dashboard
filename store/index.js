export const state = () => ({
  error: null,
  pageHeaderTitle: '',
  pageHeaderBreadcrumb: [],
})

export const getters = {
  error(state) {
    state.error
  },
  pageHeaderTitle(state) {
    state.pageHeaderTitle
  },
  pageHeaderBreadcrumb(state) {
    state.pageHeaderBreadcrumb
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
  }
}
