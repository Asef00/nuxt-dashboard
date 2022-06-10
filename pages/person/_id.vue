<template>
  <VCard title="Person Details">
    <template #header>
      <VBtn type="button" class="m-0 c-btn--small">
        <NuxtLink to="/person">List</NuxtLink>
      </VBtn>
      <VBtn type="button" class="m-0 c-btn--small">
        <NuxtLink :to="`/person/edit/${id}`">Edit</NuxtLink>
      </VBtn>
      <VBtn type="button" class="m-0 c-btn--small">
        <NuxtLink :to="`/person-product/create/${id}`">Add Product</NuxtLink>
      </VBtn>
      <VBtn type="button" @action="showChangePasswordModal = true" class="m-0 c-btn--small">
        Change password
      </VBtn>
    </template>
    <form action="" class="c-form">
      <h4 class="c-form__title mb-2">Details</h4>
      <div class="row">
        <div class=" col-md-6 c-form__control c-form__control--inline mb-0">
          <label class="c-form__label">Name</label>
          <span class="u-text-secondary">{{ data.person.name }}</span>
        </div>
        <div class=" col-md-6 c-form__control c-form__control--inline mb-0">
          <label class="c-form__label">Family Name</label>
          <span class="u-text-secondary">{{ data.person.family_name }}</span>
        </div>
        <div class=" col-md-6 c-form__control c-form__control--inline mb-0">
          <label class="c-form__label">Email</label>
          <span class="u-text-secondary">{{ data.person.username }}</span>
        </div>
        <div class=" col-md-6 c-form__control c-form__control--inline mb-0">
          <label class="c-form__label">Created At</label>
          <span class="u-text-secondary">{{ dateFormat(data.person.created_at) }}</span>
        </div>
        <div class=" col-md-6 c-form__control c-form__control--inline mb-0">
          <label class="c-form__label">Updated At</label>
          <span class="u-text-secondary">{{ dateFormat(data.person.updated_at) }}</span>
        </div>
        <div class=" col-md-6 c-form__control c-form__control--inline mb-0">
          <label class="c-form__label">Roles</label>
          <span v-for="role in data.person.roles" class="c-badge c-badge--primary">{{ role.label }}</span>
        </div>
      </div>
      <div class="row mt-3 mb-3">
        <div class=" col-md-6 c-form__control c-form__control--inline mb-0">
          <label class="c-form__label">Email Verified</label>
          <VBtn :loader="loaderRequest" @action="toggleVerifyEmail" type="button" class="c-btn--small"
                :btn="data.cognito.email_verified ? 'success' :'danger'">
            {{ data.cognito.email_verified ? 'Verified' : 'Not Verified' }}
          </VBtn>
          <span class="u-text-secondary">(Click to Change)</span>
        </div>
        <div class=" col-md-6 c-form__control c-form__control--inline mb-0">
          <label class="c-form__label">Enabled</label>
          <VBtn :loader="loaderRequest" @action="toggleEnabled" type="button" class="c-btn--small"
                :btn="data.person.enabled ? 'success' :'danger'">
            {{ data.person.enabled ? 'Enabled' : 'Disabled' }}
          </VBtn>
          <span class="u-text-secondary">(Click to Change)</span>
        </div>
      </div>
      <h4 class="c-form__title mb-2">Cognito Details</h4>
      <div class="row mb-3">
        <div class=" col-md-6 c-form__control c-form__control--inline mb-0">
          <label class="c-form__label">Status</label>
          <span class="u-text-secondary">{{ data.cognito.status }}</span>
        </div>
        <div class=" col-md-6 c-form__control c-form__control--inline mb-0">
          <label class="c-form__label">Enabled</label>
          <span :class="['c-badge',data.cognito.enabled ?'c-badge--success':'c-badge--danger']">{{
              data.cognito.enabled ? "Enabled" : "Disabled"
            }}</span>
        </div>
      </div>
    </form>
    <ChangePassword @show="changePasswordModal($event)" :show="showChangePasswordModal" :id="id"/>
  </VCard>
</template>

<script>
import ChangePassword from "@/components/page/person/ChangePassword";

export default {
  name: "Details",
  components: {ChangePassword},
  data() {
    return {
      showChangePasswordModal: false,
      id: this.$route.params.id,
      data: {
        person: {},
        cognito: {},
      }
    };
  }
  ,
  methods: {
    changePasswordModal(e) {
      this.showChangePasswordModal = e;
    },
    async show() {
      this.startLoading()
      await this.$store.dispatch("person/show", {id: this.id, product: true});
      let err = this.handleError(this.$store.state.person.error);
      if (!err) {
        this.data.person = this.$store.state.person.item;
        this.data.cognito = this.$store.state.person.item.cognito;
      }
      this.stopLoading()
    },
    async toggleVerifyEmail() {
      this.startLoading()
      await this.$store.dispatch("person/toggleVerifyEmail", this.id);
      let err = this.handleError(this.$store.state.person.error);
      if (!err) {
        this.data.cognito = this.$store.state.person.cognitoUser;
      }
      this.stopLoading()
    },
    async toggleEnabled() {
      this.startLoading()
      await this.$store.dispatch("person/toggleEnable", this.id);
      let err = this.handleError(this.$store.state.person.error);
      if (!err) {
        this.data.person.enabled = !this.data.person.enabled;
      }
      this.stopLoading()
    },
    resetError() {
      this.$store.commit("person/RESET_ERROR");
    },
  },
  created() {
    this.resetError();
    this.setTitle('Person')
    this.show();
    this.setBreadcrumb([
      {
        to: '/person',
        name: 'Person'
      },
      {
        to: `/person/${this.id}`,
        name: 'Details'
      }
    ])
  }
}
</script>

<style lang="scss" scoped>
// utility
.u-text-secondary {
  color: $placeholder-color;
}

.u-text-link {
  color: #006bff;
}

.u-text-info {
  color: $info-color;
}

.c-badge {
  border-radius: 3px;
  padding: 0 5px;
  background-color: #e2e3e5;

  &--danger {
    background-color: $danger-color;
    color: #fff;
  }

  &--info {
    background-color: $info-color;
    color: #fff;
  }

  &--primary {
    background-color: $primary-color;
    color: #fff;
  }

  &--warn {
    background-color: $warn-color;
    color: #000;
  }

  &--success {
    background-color: $success-color;
    color: #fff;
  }

  &--dark {
    background-color: $dark-color;
    color: #fff;
  }
}
</style>
