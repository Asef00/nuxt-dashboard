import Vue from 'vue'

const mixin = {
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
    handleError(error) {
      if (!error) {
        return false;
      }
      if (!error.response) {
        // network error
        this.$toast.error('Network Error!')
        return true;
      }
      if (error.response.status === 500) {
        // server error
        this.$toast.error('Server Error!')
        return true;
      }
      if (error.response.status === 401) {
        this.$toast.error('Not authenticated! Please login.')
        this.$router.push('/auth')
        return true;
      }
      if (error.response.status === 403) {
        this.$router.push('/')
        this.$toast.error('Forbidden!')
        return true;
      }
      if (error.response.status === 404) {
        // this.$router.push('404')
        this.$toast.error('Not found!')
        return true;
      }
      if (error.response.status === 422) {
        let data = error.response.data
        if (data.errors) {
          for (let err in data.errors) {
            this.errors[err] = data.errors[err][0]
          }
        }
        return true;
      }
      if (error.response.data.message) {
        this.$toast.error(error.response.data.message)
        return true;
      }
      return false;
    },
    errorMessage(filed) {
      if (this.hasError(filed)) {
        let string = this.errors[filed]
        let last = string.charAt(string.length - 1);
        if (last === '.') {
          return string;
        } else {
          string = string.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            .map(x => x.toLowerCase())
            .join(' ');
          return `The ${string}.`;
        }
      }
    },
    dateFormat(inputDate, format = 'MM-dd-yyyy') {
      //parse the input date
      const date = new Date(inputDate);

      //extract the parts of the date
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      //replace the month
      format = format.replace("MM", month.toString().padStart(2, "0"));

      //replace the year
      if (format.indexOf("yyyy") > -1) {
        format = format.replace("yyyy", year.toString());
      } else if (format.indexOf("yy") > -1) {
        format = format.replace("yy", year.toString().substr(2, 2));
      }

      //replace the day
      format = format.replace("dd", day.toString().padStart(2, "0"));

      return format;
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
    },
    setPaginate(page) {
      this.$router.push({query: {...this.$route.query, page: page}})
      console.log('set paginate')
      return this.getPaginate();
    },
    setLimit(limit) {
      this.$router.push({query: {...this.$route.query, limit: limit}})
      return this.getLimit();
    },
    getPaginate() {
      return this.$route.query.page ?? 1
    },
    getLimit() {
      return this.$route.query.limit ?? 25
    }
  }
}

Vue.mixin(mixin)
