<template>
  <VModal :showModal="show" @close="hide()" title="Change password">
    <form @submit.prevent="changePassword" class="c-form">
      <div class="row">
        <div class="col-md-12">
          <VInput
            @validation="validate('password')"
            :error="errorMessage('password')"
            label="Password"
            v-model="payload.password"
            placeholder="Please enter password"
            type="password"
          />
          <VSwitch
            class="mb-0"
            label="Force Password Change"
            v-model="payload.force_change_password"
            :checked="payload.force_change_password"
          />
        </div>
      </div>
    </form>
    <template #footer>
      <VBtn class="mb-0" @action="changePassword()" :loader="loaderRequest">
        Change Password
      </VBtn>
      <VBtn class="mb-0" btn="danger" @action="hide()" :loader="loaderRequest">
        CANCEL
      </VBtn>
    </template>
  </VModal>
</template>

<script>
import * as Yup from "yup";

export default {
  name: "ChangePassword",

  props: {
    id: {
      type: [String, Number],
      required: true,
    },

    show: {
      type: Boolean,
      required: false,
    },
  },

  data() {
    return {
      payload: {
        force_change_password: true,
        password: "",
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
          await this.$store.dispatch("person/changePassword", {
            id: this.id,
            payload: {
              permanent: !this.payload.force_change_password,
              password: this.payload.password,
            },
          });
          this.stopLoading();
          const err = this.handleError(this.$store.state.person.error);
          if (!err) {
            this.hide();
            this.$toast.success("Password successfully change.");
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
      this.$store.commit("person/RESET_ERROR");
      this.errors = {
        force_change_password: "",
        password: "",
      };
    },
  },

  created() {
    this.resetError();
  },

  watch: {
    show(val) {
      this.$emit("show", val);
    },
  },
};
</script>

<style scoped>
</style>
