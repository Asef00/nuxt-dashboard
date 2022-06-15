<template>
  <div>
    <VCard title="Profile">
      <template #header>
        <transition>
          <VBtn
            v-if="!editMode"
            @action="editMode = !editMode"
            btn="info"
            type="button"
            class="m-0 c-btn--small"
          >
            Edit Profile
            <fa icon="pen-to-square"/>
          </VBtn>
        </transition>
        <VBtn
          @action="showModalChangePassword = true"
          btn="warn"
          type="button"
          class="m-0 c-btn--small"
        >
          Change Password
        </VBtn>
      </template>
      <div class="row">
        <div class="col-md-3 col-12">
          <div class="c-avatar">
            <img src="/img/avatar.svg" width="300" height="300" alt="avatar"/>
          </div>
        </div>
        <div class="col-md-9 col-12">
          <form @submit.prevent="update" class="c-form">
            <h4 class="c-form__title">Profile Info</h4>
            <div class="row">
              <div class="col-md-6">
                <VInput
                  @validation="validate('name')"
                  :error="errorMessage('name')"
                  :disabled="!editMode"
                  label="First Name"
                  v-model="payload.name"
                  placeholder="Enter your name"
                />
              </div>
              <div class="col-md-6">
                <VInput
                  @validation="validate('family_name')"
                  :error="errorMessage('family_name')"
                  :disabled="!editMode"
                  label="Last Name"
                  v-model="payload.family_name"
                  placeholder="Enter your family name"
                />
              </div>
              <div class="col-md-6">
                <VInput
                  :disabled="true"
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
              <div class="col-md-6">
                <VBtn btn="success">Verify Email</VBtn>
              </div>
            </div>
            <transition>
              <!-- Shouldn't use template with transition -->
              <div v-if="editMode">
                <VBtn> Update Profile</VBtn>
                <VBtn type="button" btn="simple" @action="editMode = !editMode"
                >Cancel
                </VBtn
                >
              </div>
            </transition>
          </form>
        </div>
      </div>
    </VCard>

    <VModal
      :showModalChangePassword="showModalChangePassword"
      @close="showModalChangePassword = false"
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
      showModalChangePassword: false,
      editMode: false,
      id: 0,
      payload: {
        name: "",
        family_name: "",
        email: "",
        is_verified: false,
      },
    };
  },

  methods: {
    me() {
      this.id = this.$auth.user.id;
      this.payload.name = this.$auth.user.name;
      this.payload.family_name = this.$auth.user.family_name;
      this.payload.email = this.$auth.user.username;
      this.payload.is_verified = this.$auth.user.cognito.email_verified;
    },
    validation() {
      return Yup.object({
        name: Yup.string().required(),
        family_name: Yup.string().required(),
      });
    },
    update() {
      this.startLoading();
      this.validation()
        .validate(this.payload, {abortEarly: false})
        .then(async () => {
          this.resetError();
          await this.$store.dispatch("me/update", {
            name: this.payload.name,
            family_name: this.payload.family_name,
            fields: [],
          });
          this.stopLoading();
          const err = this.handleError(this.$store.state.me.error);
          if (!err) {
            this.$toast.success("Profile successfully updated.");
            this.editMode = false;
          }
        })
        .catch((err) => {
          this.setAllErrorValidation(err);
          this.stopLoading();
        });
    },
    resetError() {
      this.$store.commit("me/RESET_ERROR");
      this.errors = {
        name: '',
        family_name: '',
      };
    },
  }
  ,
  created() {
    this.resetError()
    this.me();
  }
}
</script>

<style lang="scss">
.c-avatar {
  @include flex-inline-center;
  border-radius: 100%;
  overflow: hidden;
}
</style>
