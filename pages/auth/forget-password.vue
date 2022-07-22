<template>
  <div v-if="show.forgetPassword" class="c-login">
    <h1 class="c-login__title">Forget Password</h1>
    <form @submit.prevent="forgetPassword">
      <p class="c-login__hint mb-1">
        Enter your Email below and we will send a message to reset your password
      </p>
      <VInput
        v-model="payload.email"
        key-validation="email"
        label="Email"
        type="email"
        :icon="['far', 'envelope']"
      />
      <VBtn class="c-btn--block mb-0">RESET MY PASSWORD</VBtn>
    </form>
  </div>

  <div v-else-if="show.confirmForgetPassword" class="c-login">
    <h1 class="c-login__title">Change Password</h1>
    <form @submit.prevent="confirmForgetPassword">
      <p class="c-login__hint mb-1">
        We have sent a password reset code by email to
        <strong>{{ payload.email }}</strong
        >. Enter it below to reset your password.
      </p>
      <VInput
        v-model="payload.code"
        key-validation="code"
        label="Code"
        :icon="['far', 'envelope']"
      />
      <VInput
        v-model="payload.password"
        key-validation="password"
        label="Password"
        type="password"
        :icon="['fas', 'unlock-keyhole']"
      />
      <VInput
        v-model="payload.password_confirmation"
        key-validation="password_confirmation"
        label="Password Confirmation"
        type="password"
        :icon="['fas', 'unlock-keyhole']"
      />
      <VBtn class="c-btn--block">CHANGE PASSWORD</VBtn>
      <div class="c-login__hint">
        Didn't receive a code?
        <span class="c-login__resend" @click.prevent="resendForgetPassword">
          Resend it
        </span>
      </div>
    </form>
  </div>
</template>

<script>
import * as Yup from "yup";
import VButton from "@/components/auth/VButton";
import VInput from "@/components/auth/VInput";

export default {
  name: "AuthForgetPassword",

  layout: "auth",

  components: { VButton, VInput },

  auth: false,

  data() {
    return {
      show: {
        forgetPassword: true,
        confirmForgetPassword: false,
      },
      payload: {
        email: "",
        username: "",
        password: "",
        password_confirmation: "",
        code: "",
      },
    };
  },

  methods: {
    forgetPassword() {
      this.startLoading();
      this.validation()
        .validate(this.payload, { abortEarly: false })
        .then(async () => {
          this.resetError();
          await this.$store.dispatch("me/forgetPassword", {
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
            this.show.forgetPassword = false;
            this.show.confirmForgetPassword = true;
          }
        })
        .catch((err) => {
          this.setAllErrorValidation(err);
          this.stopLoading();
        });
    },

    async resendForgetPassword() {
      this.startLoading();
      this.resetError();
      await this.$store.dispatch("me/forgetPassword", {
        username: this.payload.email,
      });
      let err = this.$store.state.me.error;
      let res = this.$store.state.me.response;
      if (err) {
        this.$toast.error(this.getErrorMessage(err));
        this.stopLoading();
      }
      if (res) {
        this.$toast.success(`Sending again code to ${res.destination}`);
        this.stopLoading();
        this.resetResponse();
      }
    },

    confirmForgetPassword() {
      this.startLoading();
      this.validation()
        .validate(this.payload, { abortEarly: false })
        .then(async () => {
          this.resetError();
          await this.$store.dispatch("me/confirmForgetPassword", {
            username: this.payload.email,
            code: this.payload.code,
            password: this.payload.password,
            password_confirmation: this.payload.password_confirmation,
          });
          let err = this.$store.state.me.error;
          let res = this.$store.state.me.response;
          if (err) {
            this.$toast.error(this.getErrorMessage(err));
            this.stopLoading();
            this.payload.code = "";
            this.payload.password_confirmation = "";
            this.payload.password = "";
          }
          if (res) {
            this.$toast.success("Password successfully changed");
            this.$auth.redirect("login");
          }
        })
        .catch((err) => {
          this.setAllErrorValidation(err);
          this.stopLoading();
        });
    },

    validation() {
      let confirmForgetPasswordRoles = {
        code: Yup.string().required(),
        password: Yup.string().required(),
        password_confirmation: Yup.string()
          .oneOf([Yup.ref("password"), null], "password must match")
          .required("password confirmation is a required field"),
      };
      let forgetPasswordRoles = {
        email: Yup.string().required().email(),
      };
      if (this.show.forgetPassword) {
        return Yup.object(forgetPasswordRoles);
      }
      if (this.show.confirmForgetPassword) {
        return Yup.object(confirmForgetPasswordRoles);
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
};
</script>
