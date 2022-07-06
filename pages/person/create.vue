<template>
  <VCard title="Create New">
    <template #header>
      <VBtn to="/person" size="sm" class="m-0"> List Persons</VBtn>
      <VBtn
        to="/person/create-cognito"
        v-if="can('person.cognito.store')"
        size="sm"
        class="m-0"
      >
        Add From Cognito
      </VBtn>
    </template>
    <form @submit.prevent="create" class="c-form">
      <div class="row">
        <div class="col-md-6">
          <VInput
            @validation="validate('first_name')"
            :error="errorMessage('first_name')"
            label="First Name"
            v-model="payload.first_name"
            placeholder="Please enter first name"
          />
        </div>
        <div class="col-md-6">
          <VInput
            @validation="validate('last_name')"
            :error="errorMessage('last_name')"
            label="Last Name"
            v-model="payload.last_name"
            placeholder="Please enter last name"
          />
        </div>
        <div class="col-md-6">
          <VInput
            @validation="validate('username')"
            :error="errorMessage('username')"
            label="Email (username)"
            v-model="payload.username"
            placeholder="Please enter email"
          />
          <div class="row mt-4">
            <div class="col">
              <VSwitch
                label="Email Verified"
                v-model="payload.email_verified"
                :checked="payload.email_verified"
                inline
              />
            </div>
            <div class="col">
              <VSwitch
                label="Set Password"
                v-model="setPassword"
                :checked="setPassword"
                inline
              />
            </div>
            <div class="col">
              <VSwitch
                label="Enabled"
                v-model="payload.enable"
                :checked="payload.enable"
                inline
              />
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <transition>
            <VInput
              v-if="setPassword"
              @validation="validate('password')"
              :error="errorMessage('password')"
              label="Password"
              type="password"
              v-model="payload.password"
              placeholder="Please enter password"
            />
          </transition>
        </div>
      </div>
      <div class="mt-5">
        <VBtn :loader="loaderRequest">SAVE</VBtn>
        <VBtn btn="danger" to="/person" :loader="loaderRequest">CANCEL</VBtn>
      </div>
    </form>
  </VCard>
</template>

<script>
import * as Yup from "yup";

export default {
  name: "create",
  permission: "person.store",
  data() {
    return {
      setPassword: false,
      payload: {
        first_name: "",
        last_name: "",
        username: "",
        email_verified: false,
        password: "",
        enable: true,
      },
    };
  },
  methods: {
    create() {
      this.startLoading();
      this.validation()
        .validate(this.payload, { abortEarly: false })
        .then(async () => {
          this.resetError();
          let payload = {
            name: this.payload.first_name,
            family_name: this.payload.last_name,
            username: this.payload.username,
            email_verified: this.payload.email_verified,
            enabled: this.payload.enable,
          };
          if (this.setPassword) {
            payload.password = this.payload.password;
          }
          await this.$store.dispatch("person/create", payload);
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
        first_name: Yup.string().required(),
        last_name: Yup.string().required(),
        username: Yup.string().email().required(),
        email_verified: Yup.bool().nullable(),
        enable: Yup.bool().nullable(),
      };
      if (this.setPassword) {
        roles = { ...roles, password: Yup.string().nullable().required() };
      }
      return Yup.object(roles);
    },
    resetError() {
      this.$store.commit("person/RESET_ERROR");
      this.errors = {
        first_name: "",
        last_name: "",
        username: "",
        email_verified: "",
        password: "",
        enable: "",
      };
    },
  },
  created() {
    this.resetError();
    this.setTitle("Manage Persons");
    this.setBreadcrumb([
      {
        to: "/person",
        name: "Person",
      },
      {
        to: "/person/create",
        name: "Create",
      },
    ]);
  },
};
</script>

<style scoped>
</style>
