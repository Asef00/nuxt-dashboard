<template>
  <div>
    <VCard :title="user.name != null ? user.name + `'s Profile` : `Profile`">
      <template #header>
        <transition>
          <VBtn
            v-if="!editMode"
            @action="editModeToggle"
            btn="info"
            type="button"
            size="sm"
            class="m-0"
          >
            Edit Profile
            <fa icon="pen-to-square" />
          </VBtn>
        </transition>
        <VBtn
          @action="showModalChangePassword = true"
          btn="warn"
          type="button"
          size="sm"
          class="m-0"
        >
          Change Password
        </VBtn>
      </template>
      <div class="row">
        <div class="col-12 u-text-center">
          <div class="c-avatar">
            <VAvatar size="150" />
          </div>
        </div>

        <div class="col-12">
          <form ref="form" @submit.prevent="update" class="c-form">
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
                  disabled
                  v-model="payload.email"
                  placeholder="Enter your Email"
                >
                  <template #label>
                    Email
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
              <div class="align-items-end d-flex col-md-6">
                <VBtn
                  type="button"
                  @action="sendVerifyCode"
                  v-if="!payload.is_verified"
                  btn="success"
                  >Verify Email
                </VBtn>
              </div>
            </div>
            <template v-if="user.fields.length">
              <h4 class="c-form__title">More Info</h4>
              <div class="row">
                <template v-for="(field, index) in computedFields">
                  <div
                    :key="index"
                    class="col-md-6"
                    v-if="field.field_type.type == 'varchar'"
                  >
                    <VInput
                      @validation="validate(field.name)"
                      :error="errorMessage(field.name)"
                      :disabled="
                        editMode
                          ? field.value == null
                            ? !field.default_access.includes('edit')
                            : !field.value.access.includes('edit')
                          : true
                      "
                      :label="field.label"
                      v-model="payload[field.name]"
                      :placeholder="
                        field.placeholder == null
                          ? `Enter your ${field.label.toLowerCase()}`
                          : field.placeholder
                      "
                    />
                  </div>
                  <div
                    :key="index"
                    class="col-md-6"
                    v-if="field.field_type.type == 'date_time'"
                  >
                    <VInput
                      type="date"
                      @validation="validate(field.name)"
                      :error="errorMessage(field.name)"
                      :disabled="!editMode"
                      :label="field.label"
                      v-model="payload[field.name]"
                      :placeholder="
                        field.placeholder == null
                          ? `Enter your ${field.label.toLowerCase()}`
                          : field.placeholder
                      "
                    />
                  </div>
                  <div
                    :key="index"
                    class="col-md-6"
                    v-if="field.field_type.type == 'select'"
                  >
                    <VSelect
                      v-model="payload[field.name]"
                      @validation="validate(field.name)"
                      :error="errorMessage(field.name)"
                      :list="field.data_set"
                      :disabled="!editMode"
                      :placeholder="
                        field.placeholder == null
                          ? `Select your ${field.label.toLowerCase()}`
                          : field.placeholder
                      "
                      :label="field.label"
                    />
                  </div>
                </template>
              </div>
            </template>
            <transition>
              <!-- Shouldn't use template with transition -->
              <div v-if="editMode">
                <VBtn :loader="loaderRequest"> Update Profile</VBtn>
                <VBtn type="button" btn="simple" @action="editModeToggle">
                  Cancel
                </VBtn>
              </div>
            </transition>
          </form>
        </div>
      </div>
    </VCard>

    <ChangePassword
      @show="changePasswordModal($event)"
      :show="showModalChangePassword"
    />

    <VerifyEmail
      @show="verifyEmailModal($event)"
      :show="showModalVerifyEmail"
    />
  </div>
</template>

<script>
import * as Yup from "yup";
import ChangePassword from "@/components/page/profile/ChangePassword";
import VerifyEmail from "@/components/page/profile/VerifyEmail";

export default {
  name: "Profile",

  components: {
    ChangePassword,
    VerifyEmail,
  },

  data() {
    return {
      showModalChangePassword: false,
      showModalVerifyEmail: false,
      // if true, the form will be editable
      editMode: false,
      showDetails: false,
      id: 0,
      user: {},
      payload: {
        name: "",
        family_name: "",
        email: "",
        is_verified: false,
      },
    };
  },

  computed: {
    computedFields() {
      return this.user.fields.filter((field) =>
        field.value == null
          ? field.default_access.includes("show")
          : field.value.access.includes("show")
      );
    },
  },

  methods: {
    editModeToggle() {
      this.editMode = !this.editMode;

      if (this.editMode) {
        this.scrollToElement(this.$refs.form);
      } else {
        this.me();
        this.resetError();
      }
    },

    //current user
    me() {
      this.$auth.fetchUser();
      this.user = this.$auth.user;
      this.id = this.user.id;
      this.payload.name = this.user.name;
      this.payload.family_name = this.user.family_name;
      this.payload.email = this.user.username;
      this.payload.is_verified = this.user.cognito.email_verified;
      for (let field of this.user.fields) {
        this.errors[field.name] = "";
        this.payload[field.name] =
          field.value != null ? field.value.value : field.value;
      }
    },

    validation() {
      let roles = {
        name: Yup.string().required(),
        family_name: Yup.string().required(),
      };
      for (let field of this.user.fields) {
        roles[field.name] = field.required
          ? Yup.string().nullable().required()
          : Yup.string().nullable();
      }
      return Yup.object(roles);
    },

    update() {
      this.startLoading();
      this.validation()
        .validate(this.payload, { abortEarly: false })
        .then(async () => {
          this.resetError();
          let fields = [];
          for (let field of this.user.fields) {
            fields.push({
              field_name_id: field.id,
              value:
                this.payload[field.name] instanceof Date
                  ? this.payload[field.name].toLocaleDateString()
                  : this.payload[field.name],
            });
          }
          await this.$store.dispatch("me/update", {
            name: this.payload.name,
            family_name: this.payload.family_name,
            fields: fields,
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
        name: "",
        family_name: "",
      };
    },

    changePasswordModal(show) {
      this.showModalChangePassword = show;
    },

    verifyEmailModal(show) {
      this.showModalVerifyEmail = show;
      if (!show) {
        this.me();
      }
    },

    sendVerifyCode() {
      this.showModalVerifyEmail = true;
      this.startLoading();
      this.$store.dispatch("me/sendVerifyCodeEmail").then(() => {
        this.stopLoading();
        const err = this.handleError(this.$store.state.me.error);
        if (!err) {
          this.$toast.success("Verification code sent.");
        }
      });
    },

    detailsItem(id) {
      this.detailsItemId = id;
      this.showDetails = true;
    },
  },

  created() {
    this.setTitle("Manage Profile");
    this.setBreadcrumb([
      {
        to: "/profile",
        name: "Profile",
      },
    ]);
    this.resetError();
    this.me();
  },
};
</script>

<style lang="scss">
.c-avatar {
  @include flex-inline-center;
}
</style>
