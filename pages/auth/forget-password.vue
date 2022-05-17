<template>
  <div class="container pt-5">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
        <div v-if="show.forgetPassword" class="wrapper pb-3 pr-2 pl-2">
          <div class="text-center member-login">
            Forget Password
          </div>
          <form class="p-4" @submit.prevent="forgetPassword">
            <div class="text-normal mb-2">
              Enter your Email below and we will send a message to reset your password
            </div>
            <div :class="[hasError('email') ? 'invalid-input': '','form-field' ,'d-flex ','align-items-center']">
              <span class="icon"><fa :icon="['far', 'envelope']"/></span>
              <input @keyup="validate('email')" @blur="validate('email')" v-model="payload.email" type="email"
                     name="email"
                     placeholder="Email">
            </div>
            <div class="invalid-message" v-if="hasError('email')">{{ errorMessage('email') }}</div>
            <button :disabled="loading" type="submit" class="btn mt-3 btn-login">
              <span v-if="loading"><b-spinner small></b-spinner></span>
              <span v-else>RESET MY PASSWORD</span>
            </button>
          </form>
        </div>
        <div v-if="show.confirmForgetPassword" class="wrapper pb-3 pr-2 pl-2">
          <div class="text-center member-login">
            Change Password
          </div>
          <form class="p-4" @submit.prevent="confirmForgetPassword">
            <div class="text-normal mb-2">
              We have sent a password reset code by email to <strong>{{ payload.email }}</strong>. Enter it below to
              reset your password.
            </div>
            <div :class="[hasError('code') ? 'invalid-input': '','form-field' ,'d-flex ','align-items-center']">
              <span class="icon"><fa :icon="['fas', 'lock']"/></span>
              <input @keyup="validate('code')" @blur="validate('code')"
                     v-model="payload.code"
                     type="text" name="code"
                     placeholder="Code">
            </div>
            <div class="invalid-message" v-if="hasError('code')">{{ errorMessage('code') }}</div>
            <div :class="[hasError('password') ? 'invalid-input': '','form-field' ,'d-flex ','align-items-center']">
              <span class="icon"><fa :icon="['fas', 'unlock-keyhole']"/></span>
              <input @keyup="validate('password')" @blur="validate('password')"
                     v-model="payload.password"
                     type="password" name="password"
                     placeholder="Password">
            </div>
            <div class="invalid-message" v-if="hasError('password')">{{ errorMessage('password') }}</div>

            <div
              :class="[hasError('password_confirmation') ? 'invalid-input': '','form-field' ,'d-flex ','align-items-center']">
              <span class="icon"><fa :icon="['fas', 'unlock-keyhole']"/></span>
              <input @keyup="validate('password_confirmation')" @blur="validate('password_confirmation')"
                     v-model="payload.password_confirmation"
                     type="password" name="password_confirmation"
                     placeholder="Password Confirmation">
            </div>
            <div class="invalid-message" v-if="hasError('password_confirmation')">
              {{ errorMessage('password_confirmation') }}
            </div>

            <button :disabled="loading" type="submit" class="btn mt-3 btn-login">
              <span v-if="loading"><b-spinner small></b-spinner></span>
              <span v-else>CHANGE PASSWORD</span>
            </button>
            <div class="text-center pt-4 fs-6">
              <span class="text-normal">Didn't receive a code?</span>
              <a href="!#" role="button" @click.prevent="resendForgetPassword"> Resend it</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Yup from "yup";

export default {
  name: "AuthForgetPassword",
  layout: "auth",
  auth: false,
  data() {
    return {
      show: {
        forgetPassword: true,
        confirmForgetPassword: false
      },
      payload: {
        email: '',
        username: '',
        password: '',
        password_confirmation: '',
        code: ''
      },
    }
  },
  methods: {
    forgetPassword() {
      this.startLoading()
      this.validation().validate(this.payload, {abortEarly: false})
        .then(async () => {
          this.resetError()
          await this.$store.dispatch('me/forgetPassword', {
            username: this.payload.email
          })
          let err = this.$store.state.me.error
          let res = this.$store.state.me.response
          if (err) {
            this.$toast.error(this.getErrorMessage(err))
            this.stopLoading()
          }
          if (res) {
            this.$toast.success(`Sending code to ${res.destination}`)
            this.stopLoading()
            this.resetResponse()
            this.show.forgetPassword = false;
            this.show.confirmForgetPassword = true;
          }
        })
        .catch(err => {
          this.setAllErrorValidation(err)
          this.stopLoading()
        });
    },
    async resendForgetPassword() {
      this.startLoading()
      this.resetError()
      await this.$store.dispatch('me/forgetPassword', {
        username: this.payload.email
      })
      let err = this.$store.state.me.error
      let res = this.$store.state.me.response
      if (err) {
        this.$toast.error(this.getErrorMessage(err))
        this.stopLoading()
      }
      if (res) {
        this.$toast.success(`Sending again code to ${res.destination}`)
        this.stopLoading()
        this.resetResponse()
      }
    },
    confirmForgetPassword() {
      this.startLoading()
      this.validation().validate(this.payload, {abortEarly: false})
        .then(async () => {
          this.resetError()
          await this.$store.dispatch('me/confirmForgetPassword', {
            username: this.payload.email,
            code: this.payload.code,
            password: this.payload.password,
            password_confirmation: this.payload.password_confirmation,
          })
          let err = this.$store.state.me.error
          let res = this.$store.state.me.response
          if (err) {
            this.$toast.error(this.getErrorMessage(err))
            this.stopLoading()
            this.payload.code = ''
            this.payload.password_confirmation = ''
            this.payload.password = ''
          }
          if (res) {
            this.$toast.success('Password successfully changed')
            this.$auth.redirect('login')
          }
        })
        .catch(err => {
          this.setAllErrorValidation(err)
          this.stopLoading()
        });
    },
    validation() {
      let confirmForgetPasswordRoles = {
        code: Yup.string().required(),
        password: Yup.string().required(),
        password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'password must match').required('password confirmation is a required field')
      }
      let forgetPasswordRoles = {
        email: Yup.string().required().email(),
      }
      if (this.show.forgetPassword) {
        return Yup.object(forgetPasswordRoles);
      }
      if (this.show.confirmForgetPassword) {
        return Yup.object(confirmForgetPasswordRoles);
      }
    },
    resetError() {
      this.$store.commit('me/RESET_ERROR')
      this.errors = {
        email: '',
        code: '',
        password: '',
        password_confirmation: '',
      }
    },
    resetResponse() {
      this.$store.commit('me/RESET_RESPONSE')
    }
  },
  created() {
    this.resetError()
  }
}
</script>

<style scoped lang="scss" src="~/assets/scss/auth.scss">

</style>
