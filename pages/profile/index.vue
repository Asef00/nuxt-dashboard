<template>
  <div>
    <VCard title="Profile">
      <template #header>
        <VBtn
          @action="editMode = !editMode"
          btn="info"
          type="button"
          class="m-0 c-btn--small"
        >
          Edit Profile
          <fa icon="pen-to-square" />
        </VBtn>
        <VBtn @action="showModal = true" btn="warn" type="button" class="m-0 c-btn--small">
          Change Password
        </VBtn>
      </template>
      <div class="row">
        <div class="col-md-3 col-12">
          <div class="c-avatar">
            <img src="/img/avatar.svg" width="300" height="300" alt="avatar" />
          </div>
        </div>
        <div class="col-md-9 col-12">
          <form action="" class="c-form">
            <h4 class="c-form__title">Profile Info</h4>
            <div class="row">
              <div class="col-md-6">
                <VInput
                  @validation="validate('firstname')"
                  :error="errorMessage('firstname')"
                  :disabled="!editMode"
                  label="First Name"
                  v-model="payload.firstname"
                  placeholder="Enter your first name"
                />
              </div>
              <div class="col-md-6">
                <VInput
                  @validation="validate('lastname')"
                  :error="errorMessage('lastname')"
                  :disabled="!editMode"
                  label="Last Name"
                  v-model="payload.lastname"
                  placeholder="Enter your last name"
                />
              </div>
              <div class="col-md-6">
                <VInput
                  @validation="validate('email')"
                  :error="errorMessage('email')"
                  :disabled="!editMode"
                  label="Email"
                  v-model="payload.email"
                  placeholder="Enter your Email"
                >
                  <template #label>
                    <span
                      v-if="payload.is_verified"
                      class="c-badge u-bg-success"
                    >
                      Verified
                    </span>
                    <span v-else class="c-badge u-bg-danger">Not Verified</span>
                  </template>
                </VInput>
              </div>
            </div>
          </form>
        </div>
      </div>
    </VCard>

    <VModal
      :showModal="showModal"
      @close="showModal = false"
      title="Change Password"
    >
      <form action="" class="c-form">
        <VInput
          @validation="validate('password')"
          :error="errorMessage('password')"
          label="New Password"
          v-model="payload.name"
          placeholder="Enter a new password"
        />

        <VInput
          @validation="validate('password')"
          :error="errorMessage('password')"
          label="Confirm Password"
          v-model="payload.name"
          placeholder="repeat your password"
        />

        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque
          numquam, vel quibusdam distinctio ullam, amet saepe, ipsa adipisci
          doloribus magni officia quod ad tenetur voluptas alias ratione culpa
          consequatur voluptate.
        </p>

        <VBtn
          @action="startLoading"
          class="m-0 c-btn--block"
          btn="primary"
          :loader="loaderRequest"
        >
          Change Password
        </VBtn>
      </form>
    </VModal>
  </div>
</template>

<script>
import * as Yup from "yup";

export default {
  data() {
    return {
      showModal: false,
      editMode: false,

      payload: {
        password: "",
        firstname: "John",
        lastname: "Doe",
        email: "johndoe@gmail.com",
        is_verified: true,
      },
    };
  },

  methods: {
    validation() {
      return Yup.object({
        password: Yup.string().required(),
        firstname: Yup.string().required(),
        lastname: Yup.string().required(),
      });
    },
  },
};
</script>

<style lang="scss">
.c-avatar {
  @include flex-inline-center;
  border-radius: 100%;
  overflow: hidden;
}
</style>