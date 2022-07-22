<template>
  <div v-if="show.singIn" class="c-login">
    <h1 class="c-login__title">Member Login</h1>

    <form @submit.prevent="signIn">
      <VInput
        v-model="payload.email"
        @validation="validate('email')"
        :error="errorMessage('email')"
        :icon="['far', 'envelope']"
        name="email"
        label="Email"
        type="email"
      />
      <VInput
        v-model="payload.password"
        @validation="validate('password')"
        :error="errorMessage('password')"
        :icon="['fas', 'unlock-keyhole']"
        name="password"
        type="password"
        label="Password"
      />

      <NuxtLink class="c-login__forget" to="/auth/forget-password">
        Forget password?
      </NuxtLink>

      <VBtn class="c-btn--block">LOGIN</VBtn>
    </form>

    <button class="c-login__method" @click="continueWithGoogle">
      <div class="c-icon">
        <fa class="c-icon__google" :icon="['fab', 'google']" />
      </div>
      <span class="u-text-color">Continue with Google</span>
    </button>

    <!-- <button class="c-login__method" @click="continueWithFacebook">
      <div class="c-icon">
        <fa class="c-icon__facebook" :icon="['fab', 'facebook-f']" />
      </div>
      <span class="u-text-color">Sign up with Facebook</span>
    </button> -->
    <!-- <button class="c-login__method" @click="continueWithApple">
      <div class="c-icon">
        <fa class="c-icon__apple" :icon="['fab', 'apple']" />
      </div>
      <span class="u-text-color">Sign up with Apple</span>
    </button> -->
  </div>

  <div v-else-if="show.changePassword" class="c-login">
    <h1 class="c-login__title">Change Password</h1>
    <form @submit.prevent="challengePassword">
      <VInput
        v-model="payload.password"
        @validation="validate('password')"
        :error="errorMessage('password')"
        :icon="['fas', 'unlock-keyhole']"
        name="password"
        label="Password"
        type="password"
      />
      <VInput
        v-model="payload.password_confirmation"
        @validation="validate('password_confirmation')"
        :error="errorMessage('password_confirmation')"
        :icon="['fas', 'unlock-keyhole']"
        name="password_confirmation"
        label="Password Confirmation"
        type="password"
      />
      <VBtn class="c-btn--block mb-0">SEND</VBtn>
    </form>
  </div>

  <div v-else-if="show.verificationCode" class="c-login">
    <h1 class="c-login__title">Verify Code</h1>
    <form @submit.prevent="verificationCode">
      <div class="c-login__hint mb-1">
        We have sent a code by email to
        <strong>{{ payload.email }}</strong
        >. Enter it below to confirm your account.
      </div>
      <VInput
        v-model="payload.code"
        @validation="validate('code')"
        :error="errorMessage('code')"
        :icon="['fas', 'lock']"
        name="code"
        label="Code"
      />
      <VBtn class="c-btn--block">CONFIRM ACCOUNT</VBtn>
      <div class="c-login__hint">
        Didn't receive a code?
        <span class="c-login__link" @click="resendVerificationCode">
          Resend it
        </span>
      </div>
    </form>
  </div>
</template>

<script>
import * as Yup from "yup";
import VInput from "@/components/auth/VInput";

export default {
  name: "AuthIndex",

  components: { VInput },

  layout: "auth",

  data() {
    return {
      show: {
        singIn: true,
        changePassword: false,
        verificationCode: false,
      },
      payload: {
        email: "",
        username: "",
        password: "",
        password_confirmation: "",
        grant_type: "username",
        session: "",
        challenge_name: "",
        code: "",
      },
    };
  },

  methods: {
    signIn() {
      this.startLoading();
      this.validation()
        .validate(this.payload, { abortEarly: false })
        .then(async () => {
          this.resetError();
          await this.$auth
            .loginWith("local", {
              data: {
                username: this.payload.email,
                password: this.payload.password,
                grant_type: this.payload.grant_type,
              },
            })
            .then((res) => {
              if (res.data.challenge_name) {
                if (res.data.challenge_name === "NEW_PASSWORD_REQUIRED") {
                  this.payload.password = "";
                  this.payload.challenge_name = res.data.challenge_name;
                  this.payload.session = res.data.session;
                  this.payload.username = this.payload.email;
                  this.show.changePassword = true;
                  this.show.singIn = false;
                }
              }
              this.stopLoading();
            })
            .catch((err) => {
              // this.$toast.error(this.getErrorMessage(err));
              this.payload.password = "";
              this.stopLoading();
              if (err.response?.data?.error === "UserNotConfirmedException") {
                this.resendVerificationCode();
                this.show.singIn = false;
                this.show.verificationCode = true;
              }
              this.handleError(err);
            });
        })
        .catch((err) => {
          this.setAllErrorValidation(err);
          this.stopLoading();
        });
    },

    tokenWithCode() {
      let code = this.$route.query.code;
      if (code) {
        this.validation({ code: Yup.string().uuid() })
          .validate({ code: code }, { abortEarly: false })
          .then(() => {
            this.resetError();
            this.startLoading();
            let payload = {
              code: `${code}`,
              grant_type: "code",
            };
            this.$auth
              .loginWith("local", {
                data: payload,
              })
              .then((res) => {
                this.stopLoading();
              })
              .catch((err) => {
                if (err.response.data.error) {
                  this.$toast.error(this.getErrorMessage(err));
                } else {
                  this.$toast.error("An error occurred.Please try again");
                }
                this.stopLoading();
              });
          })
          .catch((err) => {
            this.stopLoading();
          });
      }
    },

    continueWithGoogle() {
      this.startLoading();
      let url =
        "https://realtyna.auth.us-east-1.amazoncognito.com/oauth2/authorize?identity_provider=Google&redirect_uri=http://localhost:3000/&response_type=CODE&client_id=1397vrlg8fap3him44fsafk5pd&scope=aws.cognito.signin.user.admin email openid phone profile";
      window.location.replace(url);
    },

    challengePassword() {
      this.startLoading();
      this.validation()
        .validate(this.payload, { abortEarly: false })
        .then(async () => {
          this.resetError();
          await this.$store.dispatch("me/authPassChallenge", this.payload);
          let err = this.$store.state.me.error;
          if (err) {
            this.payload.password = "";
            this.payload.password_confirmation = "";
            this.$toast.error(this.getErrorMessage(err));
            this.stopLoading();
          } else {
            window.location.reload();
          }
        })
        .catch((err) => {
          this.setAllErrorValidation(err);
          this.stopLoading();
        });
    },

    verificationCode() {
      this.startLoading();
      this.validation()
        .validate(this.payload, { abortEarly: false })
        .then(async () => {
          this.resetError();
          await this.$store.dispatch("me/confirmSingUp", {
            username: this.payload.email,
            code: this.payload.code,
          });
          let err = this.$store.state.me.error;
          if (err) {
            this.payload.code = "";
            this.$toast.error(this.getErrorMessage(err));
          } else {
            this.show.verificationCode = false;
            this.show.singIn = true;
          }
          this.stopLoading();
        })
        .catch((err) => {
          this.setAllErrorValidation(err);
          this.stopLoading();
        });
    },

    async resendVerificationCode() {
      this.startLoading();
      this.resetError();
      await this.$store.dispatch("me/resendConfirmationCode", {
        username: this.payload.email,
      });
      let err = this.$store.state.me.error;
      let res = this.$store.state.me.response;
      if (err) {
        this.$toast.error(this.getErrorMessage(err));
        this.stopLoading();
      }
      if (res) {
        this.$toast.success(`Sending code to ${res.destination}`);
        this.stopLoading();
        this.resetResponse();
      }
    },

    validation(roles = {}) {
      let changePasswordRoles = {
        password: Yup.string().required(),
        password_confirmation: Yup.string()
          .oneOf([Yup.ref("password"), null], "password must match")
          .required("password confirmation is a required field"),
      };
      let signInRoles = {
        email: Yup.string().required().email(),
        password: Yup.string().required(),
      };
      let verificationCodeRoles = {
        code: Yup.string().required(),
      };
      if (Object.keys(roles).length !== 0) {
        return Yup.object(roles);
      } else if (this.show.singIn) {
        return Yup.object(signInRoles);
      } else if (this.show.changePassword) {
        return Yup.object(changePasswordRoles);
      } else if (this.show.verificationCode) {
        return Yup.object(verificationCodeRoles);
      } else {
        return Yup.object(roles);
      }
    },

    resetError() {
      this.$store.commit("me/RESET_ERROR");
      this.errors = {
        email: "",
        code: "",
        password: "",
        password_confirmation: "",
      };
    },

    resetResponse() {
      this.$store.commit("me/RESET_RESPONSE");
    },
  },

  created() {
    this.resetError();
  },

  mounted() {
    this.tokenWithCode();
  },
};
</script>
