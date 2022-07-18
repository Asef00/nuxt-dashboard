<template>
  <VModal :showModal="show" @close="hide()" title="Change password">
    <form @submit.prevent="changePassword()" class="c-form">
      <div class="row">
        <div class="col-md-12">
          <VInput
            @validation="validate('current_password')"
            :error="errorMessage('current_password')"
            label="Current Password"
            v-model="payload.current_password"
            placeholder="Please enter current password"
            type="password"
          />
          <VInput
            @validation="validate('new_password')"
            :error="errorMessage('new_password')"
            label="New Password"
            v-model="payload.new_password"
            placeholder="Please enter new password"
            type="password"
          />
          <VInput
            @validation="validate('new_password_confirmation')"
            :error="errorMessage('new_password_confirmation')"
            label="New Password Confirmation"
            v-model="payload.new_password_confirmation"
            placeholder="Please enter new password confirmation"
            type="password"
          />
        </div>
      </div>
    </form>
    <template #footer>
      <VBtn class="mb-0" @action="changePassword()" :loader="loaderRequest">
        Change Password
      </VBtn>
      <VBtn class="mb-0" btn="danger" @action="hide()" :loader="loaderRequest">
        Cancel
      </VBtn>
    </template>
  </VModal>
</template>

<script>
import * as Yup from "yup";

export default {
  name: "ChangePassword",

  props: {
    show: {
      type: Boolean,
      required: false,
    },
  },

  data() {
    return {
      payload: {
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      },
    };
  },

  methods: {
    hide() {
      this.show = false;
    },

    changePassword() {
      this.startLoading();
      this.validation()
        .validate(this.payload, { abortEarly: false })
        .then(async () => {
          this.resetError();
          await this.$store.dispatch("me/changePassword", {
            password: this.payload.current_password,
            new_password: this.payload.new_password,
            new_password_confirmation: this.payload.new_password_confirmation,
          });
          this.stopLoading();
          let error = this.$store.state.me.error;
          const err = this.handleError(error);
          if (err) {
            if (error.response.data.error === "NotAuthorizedException") {
              this.errors.current_password =
                "The current password is incorrect.";
            }
          }
          if (!err) {
            this.hide();
            this.$toast.success("Password successfully changed.");
          }
        })
        .catch((err) => {
          this.setAllErrorValidation(err);
          this.stopLoading();
        });
    },

    validation() {
      let roles = {
        current_password: Yup.string().required(),
        new_password: Yup.string().required(),
        new_password_confirmation: Yup.string()
          .oneOf([Yup.ref("new_password"), null], "new password must match")
          .required(),
      };
      return Yup.object(roles);
    },

    resetError() {
      this.$store.commit("me/RESET_ERROR");
      this.errors = {
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      };
    },
  },

  created() {
    this.resetError();
  },

  watch: {
    show(val) {
      this.$emit("show", val);
      this.payload.current_password = "";
      this.payload.new_password = "";
      this.payload.new_password_confirmation = "";
      this.resetError();
    },
  },
};
</script>

<style scoped>
</style>
