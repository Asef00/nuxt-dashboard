<template>
  <VModal
    :showModal="show"
    @close="show = false"
    title="Verify Email"
  >
    <form @submit.prevent="verifyEmail" class="c-form">
      We have sent a verification code by email to <strong>{{ this.$auth.user.username }}</strong>. Enter it below to
      verify your email.
      <br>
      <div class="row">
        <div class="col-md-12">
          <VInput
            @validation="validate('code')"
            :error="errorMessage('code')"
            label="Code"
            v-model="payload.code"
            placeholder="Please enter code"
          />
        </div>
      </div>
      <VBtn :loader="loaderRequest">Verify Code</VBtn>
    </form>
  </VModal>
</template>

<script>
import * as Yup from "yup";

export default {
  name: "VerifyEmail",
  props: {
    show: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      payload: {
        code: '',
      }
    };
  },
  methods: {
    verifyEmail() {
      this.startLoading();
      this.validation()
        .validate(this.payload, {abortEarly: false})
        .then(async () => {
          this.resetError();
          await this.$store.dispatch("me/verifyEmail", this.payload);
          const err = this.handleError(this.$store.state.me.error);
          this.stopLoading();
          if (!err) {
            await this.$auth.fetchUser();
            this.show = false;
            this.$toast.success("Email successfully verified.");
          }
        })
        .catch((err) => {
          this.setAllErrorValidation(err);
          this.stopLoading();
        });
    },
    validation() {
      let roles = {
        code: Yup.string().required(),
      };
      return Yup.object(roles);
    },
    resetError() {
      this.$store.commit('me/RESET_ERROR')
      this.errors = {
        code: '',
      };
    },
  },
  created() {
    this.resetError()
  },
  watch: {
    show(val) {
      this.$emit('show', val);
      this.payload.code = ''
      this.resetError()
    }
  }
}
</script>

<style scoped>

</style>
