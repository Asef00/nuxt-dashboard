<template>
  <div class="container pt-5">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
        <div v-if="show.singIn" class="wrapper pb-3 pr-2 pl-2">
          <div class="text-center member-login">
            Member Login
          </div>
          <form class="p-4" @submit.prevent="signIn">
            <div :class="[hasError('email') ? 'invalid-input': '','form-field' ,'d-flex ','align-items-center']">
              <span class="icon"><fa :icon="['far', 'envelope']"/></span>
              <input @keyup="validate('email')" @blur="validate('email')" v-model="payload.email" type="email"
                     name="email"
                     placeholder="Email">
            </div>
            <div class="invalid-message" v-if="hasError('email')">{{ errorMessage('email') }}</div>
            <div :class="[hasError('password') ? 'invalid-input': '','form-field' ,'d-flex ','align-items-center']">
              <span class="icon"><fa :icon="['fas', 'unlock-keyhole']"/></span>
              <input @keyup="validate('password')" @blur="validate('password')" v-model="payload.password"
                     type="password" name="password"
                     placeholder="Password">
            </div>
            <div class="invalid-message" v-if="hasError('password')">{{ errorMessage('password') }}</div>
            <div class="text-right fs-6">
              <a href="#">Forget password?</a>
            </div>
            <button :disabled="loading" type="submit" class="btn mt-3 btn-login">
              <span v-if="loading"><b-spinner small></b-spinner></span>
              <span v-else>LOGIN</span>
            </button>
          </form>
          <div class="p-3">
            <div class="text-center fs-6 mb-3">
              Not a member?<a href="#"> Sign UP now</a>
            </div>
            <div class="mt-4 btn-social">
              <a class="mb-3" href="#!" role="button">
                <i class="g-plus">
                  <fa :icon="['fab', 'google-plus-g']"/>
                </i>
                <span class="text-center">
                        Continue with Google
                    </span>
              </a>
            </div>
            <div class="mt-2 btn-social">
              <a class="mb-3" href="#!" role="button">
                <i class="facebook">
                  <fa :icon="['fab', 'facebook-f']"/>
                </i>
                <span class="text-center">
                        Continue with Facebook
                </span>
              </a>
            </div>
          </div>
        </div>
        <div v-if="show.changePassword" class="wrapper pb-3 pr-2 pl-2">
          <div class="text-center member-login">
            Change Password
          </div>
          <form class="p-4" @submit.prevent="challengePassword">
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
              <span v-else>SEND</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Yup from "yup";

export default {
  name: "AuthIndex",
  layout: "auth",
  data() {
    return {
      show: {
        singIn: true,
        changePassword: false
      },
      payload: {
        email: '',
        username: '',
        password: '',
        password_confirmation: '',
        grant_type: 'username',
        session: '',
        challenge_name: '',
      },
      errors: {
        email: '',
        password: '',
        password_confirmation: '',
      },
    }
  },
  methods: {
    signIn()
    {
      this.startLoading()
      this.validation().validate(this.payload, {abortEarly: false})
        .then(async () => {
          this.resetError()
          await this.$auth.loginWith('local', {
            data: {
              username: this.payload.email,
              password: this.payload.password,
              grant_type: this.payload.grant_type
            }
          }).then(res => {
            if (res.data.challenge_name) {
              if (res.data.challenge_name === 'NEW_PASSWORD_REQUIRED') {
                this.payload.password = '';
                this.payload.challenge_name = res.data.challenge_name;
                this.payload.session = res.data.session;
                this.payload.username = this.payload.email;
                this.show.changePassword = true;
                this.show.singIn = false;
              }
            }
            this.stopLoading()
          }).catch(err => {
            this.$toast.error(this.getErrorMessage(err));
            this.payload.password = ''
            this.stopLoading()
          })
        })
        .catch(err => {
          this.setAllErrorValidation(err)
          this.stopLoading()
        });
    },
    challengePassword() {
      this.startLoading()
      this.validation().validate(this.payload, {abortEarly: false})
        .then(async () => {
          this.resetError()
          await this.$store.dispatch('me/authPassChallenge', this.payload)
          let err = this.$store.state.me.error
          if (err) {
            this.payload.password = ''
            this.payload.password_confirmation = ''
            this.$toast.error(this.getErrorMessage(err))
          } else {
            this.$auth.redirect('home')
          }
          this.stopLoading()
        })
        .catch(err => {
          this.setAllErrorValidation(err)
          this.stopLoading()
        });
    },
    validation() {
      let changePasswordRoles = {
        password: Yup.string().required(),
        password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'password must match').required('password confirmation is a required field')
      }
      let signInRoles = {
        email: Yup.string().required().email(),
        password: Yup.string().required()
      }
      if (this.show.singIn) {
        return Yup.object(signInRoles);
      }
      if (this.show.changePassword) {
        return Yup.object(changePasswordRoles);
      }
    },
    resetError() {
      this.$store.commit('me/RESET_ERROR')
      this.errors = {
        email: '',
        password: '',
        password_confirmation: '',
      }
    }
  }
}
</script>

<style scoped src="~/assets/css/auth.css">

</style>
