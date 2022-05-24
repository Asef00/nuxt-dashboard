import Vue from 'vue'

var mixin = {
  data() {
    return {
      payload: [],
      errors: [],
      message: '',
      loaderRequest: false,
    }
  },
  methods: {
    startLoading() {
      this.loaderRequest = true
    },
    stopLoading() {
      this.loaderRequest = false
    },
    validate(field) {
      if (!field) {
        return false;
      }
      this.validation().validateAt(field, this.payload)
        .then(() => {
          this.errors[field] = "";
        })
        .catch(err => {
          this.errors[field] = err.message;
        });
    },
    errorMessage(filed) {
      if (this.hasError(filed)) {
        let string = this.errors[filed]
        return string.charAt(0).toUpperCase() + string.slice(1) + '.';
      }
    },
    hasError(field) {
      if (!field) {
        return false;
      }
      if (field in this.errors) {
        return this.errors[field] !== '';
      }
      return false;
    },
    setAllErrorValidation(error) {
      for (let e in error.inner) {
        this.errors[error.inner[e].path] = error.inner[e].message
      }
    },
    getErrorMessage(error) {
      return error.response.data.message
    },
    setTitle(name) {
      this.$store.commit('SET_PAGE_HEADER_TITLE', name)
    },
    setBreadcrumb(links) {
      this.$store.commit('SET_PAGE_HEADER_BREADCRUMB', links)
    },
    can(name) {
      if (this.$auth.loggedIn) {
        let permissions = this.$auth.user.permission_names;
        return permissions.includes(name)
      }
      return false;
    }
  }
}

Vue.mixin(mixin)
