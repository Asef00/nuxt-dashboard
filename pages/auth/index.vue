<template>
  <div class="container pt-5">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
        <div v-if="show.singIn" class="wrapper pb-3 pr-2 pl-2">
          <div class="member-login">Member Login</div>
          <form class="p-4" @submit.prevent="signIn">
            <VInput
              v-model="payload.email"
              key-validation="email"
              label="Email"
              type="email"
              :icon="['far', 'envelope']"
            />
            <VInput
              v-model="payload.password"
              key-validation="password"
              type="password"
              label="Password"
              :icon="['fas', 'unlock-keyhole']"
            />
            <div class="text-right fs-6">
              <NuxtLink to="/auth/forget-password">Forget password?</NuxtLink>
            </div>
            <VButton label="LOGIN" />
          </form>
          <div class="p-3">
            <div v-if="false" class="text-center fs-6 mb-3">
              Not a member?<a href="#"> Sign UP now</a>
            </div>
            <div class="mt-4 btn-social" @click="continueWithGoogle">
              <a class="mb-3" href="#!" role="button">
                <i class="g-plus">
                  <fa :icon="['fab', 'google-plus-g']" />
                </i>
                <span class="text-center"> Continue with Google </span>
              </a>
            </div>
            <div class="mt-2 btn-social">
              <a class="mb-3" href="#!" role="button">
                <i class="facebook">
                  <fa :icon="['fab', 'facebook-f']" />
                </i>
                <span class="text-center"> Continue with Facebook </span>
              </a>
            </div>
          </div>
        </div>
        <div v-if="show.changePassword" class="wrapper pb-3 pr-2 pl-2">
          <div class="member-login">Change Password</div>
          <form class="p-4" @submit.prevent="challengePassword">
            <VInput
              v-model="payload.password"
              key-validation="password"
              label="Password"
              type="password"
              :icon="['fas', 'unlock-keyhole']"
            ></VInput>
            <VInput
              v-model="payload.password_confirmation"
              key-validation="password_confirmation"
              label="Password Confirmation"
              type="password"
              :icon="['fas', 'unlock-keyhole']"
            ></VInput>
            <VButton label="SEND" />
          </form>
        </div>
        <div v-if="show.verificationCode" class="wrapper pb-3 pr-2 pl-2">
          <div class="member-login">Verify Code</div>

          <form class="p-4" @submit.prevent="verificationCode">
            <div class="text-normal mb-2">
              We have sent a code by email to
              <strong>{{ payload.email }}</strong
              >. Enter it below to confirm your account.
            </div>
            <VInput
              v-model="payload.code"
              key-validation="code"
              label="Code"
              :icon="['fas', 'lock']"
            ></VInput>
            <VButton label="CONFIRM ACCOUNT" />
            <div class="text-center pt-4 fs-6">
              <span class="text-normal">Didn't receive a code?</span>
              <a
                href="!#"
                role="button"
                @click.prevent="resendVerificationCode"
              >
                Resend it</a
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Yup from "yup";
import VInput from "@/components/auth/VInput";
import VButton from "@/components/auth/VButton";

export default {
  name: "AuthIndex",
  components: { VInput, VButton },
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
              this.$toast.error(this.getErrorMessage(err));
              this.payload.password = "";
              this.stopLoading();
              if (err.response.data.error === "UserNotConfirmedException") {
                this.resendVerificationCode();
                this.show.singIn = false;
                this.show.verificationCode = true;
              }
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

<style scoped lang="scss" src="~/assets/scss/auth.scss">
</style>
