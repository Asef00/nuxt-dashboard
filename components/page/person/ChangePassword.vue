<template>
  <div>
    <form @submit.prevent="changePassword" class="c-form">
      <div class="row">
        <div class="col-md-12">
          <VInput
            @validation="validate('password')"
            :error="errorMessage('password')"
            label="Password"
            v-model="payload.password"
            placeholder="Please enter password"
          />
          <VSwitch
            label="Force Password Change"
            v-model="payload.force_change_password"
            :checked="payload.force_change_password"
          />
        </div>
      </div>
      <VBtn :loader="loaderRequest">Change Password</VBtn>
    </form>
  </div>
</template>

<script>
import * as Yup from "yup";

export default {
  name: "ChangePassword",
  data() {
    return {
      setPassword: false,
      payload: {
        force_change_password: true,
        password: '',
      }
    };
  },
  methods: {
    changePassword() {
      this.startLoading();
      this.validation()
        .validate(this.payload, {abortEarly: false})
        .then(async () => {
          this.resetError();
          await this.$store.dispatch("person/create", {
            permanent: !this.payload.force_change_password,
            password: this.payload.password,
          });
          this.stopLoading();
          const err = this.handleError(this.$store.state.person.error);
          if (!err) {
            let data = this.$store.state.person.item;
            this.$toast.success("Person successfully created.");
            this.$router.push("/person/" + data.id);
          }
        })
        .catch((err) => {
          this.setAllErrorValidation(err);
          this.stopLoading();
        });
    },
    validation() {
      let roles = {
        password: Yup.string().required(),
        force_change_password: Yup.bool().nullable(),
      };
      return Yup.object(roles);
    },
    resetError() {
      this.$store.commit('person/RESET_ERROR')
      this.errors = {
        force_change_password: '',
        password: '',
      };
    },
  },
  created() {
    this.resetError()
  }
}
</script>

<style scoped>

</style>
