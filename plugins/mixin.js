import Vue from 'vue'

var mixin = {
  data() {
    return {
      payload: [],
      errors: [],
      message: '',
      loading: false,
    }
  },
  methods: {
    startLoading() {
      this.loading = true
    },
    stopLoading() {
      this.loading = false
    },
    validate(field) {
      if (!field){
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
      if (!field){
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
    }
  }
}

Vue.mixin(mixin)
