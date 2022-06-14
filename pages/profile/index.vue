<template>
  <div>
    <VCard title="Profile">
      <template #header>
        <VBtn @action="showModal = true" type="button" class="m-0 c-btn--small">
          Change Password
        </VBtn>
      </template>
      <div class="row">
        <div class="col-md-4 col-12">
          <div class="c-avatar">
            <img src="/img/avatar.jpg" width="300" height="300" alt="avatar" />
          </div>
        </div>
        <div class="col-md-8 col-12">
          <form action="" class="c-form">
            <div class="row mb-3">
              <div class="col">
                <div class="c-form__control c-form__control--inline mb-0">
                  <label class="c-form__label">Full Name</label>
                  <span class="u-text-secondary">
                    Toronto Regional Real Estate Board
                  </span>
                </div>

                <div class="c-form__control c-form__control--inline mb-0">
                  <label class="c-form__label">Feed Type</label>
                  <span class="c-badge u-bg-light u-text-secondary">IDX</span>
                </div>
              </div>

              <div class="col">
                <div class="c-form__control c-form__control--inline mb-0">
                  <label class="c-form__label">Abbreviated</label>
                  <span class="u-text-secondary">Treb MLS</span>
                </div>

                <div class="c-form__control c-form__control--inline mb-0">
                  <label class="c-form__label">Credentials</label>
                  <NuxtLink to="/" class="u-text-info">Click to View</NuxtLink>
                  <span class="c-badge u-bg-danger">Revoke</span>
                </div>
              </div>
            </div>

            <h4 class="c-form__title mb-2">Details</h4>
            <div class="row mb-3">
              <div class="col">
                <div class="c-form__control c-form__control--inline mb-0">
                  <label class="c-form__label">Address</label>
                  <span class="u-text-secondary">
                    456 Prentiss St, San Francisco, USA
                  </span>
                </div>

                <div class="c-form__control c-form__control--inline mb-0">
                  <label class="c-form__label">Coverage Area</label>
                  <span class="u-text-secondary"
                    >4617, 7819, 1012, Florida</span
                  >
                </div>
              </div>

              <div class="col">
                <div class="c-form__control c-form__control--inline mb-0">
                  <label class="c-form__label"># of Clients</label>
                  <span class="u-text-secondary">873</span>
                </div>

                <div class="c-form__control c-form__control--inline mb-0">
                  <label class="c-form__label"># of Agents</label>
                  <span class="u-text-secondary">100</span>
                </div>
              </div>
            </div>

            <span class="c-form__divider"></span>

            <h4 class="c-form__title mb-2">Contact Information For IDX</h4>
            <div class="row mb-3">
              <div class="col">
                <div class="c-form__control c-form__control--inline mb-0">
                  <label class="c-form__label">Website</label>
                  <span class="u-text-link">sitename.com/mls</span>
                </div>

                <div class="c-form__control c-form__control--inline mb-0">
                  <label class="c-form__label">Contact 1</label>
                  <span class="u-text-secondary">00 55 369 888 3365</span>
                </div>

                <div class="c-form__control c-form__control--inline mb-0">
                  <label class="c-form__label">Contact 2</label>
                  <span class="u-text-secondary">00 55 369 888 3366</span>
                </div>
              </div>

              <div class="col">
                <div class="c-form__control c-form__control--inline mb-0">
                  <label class="c-form__label">Contact Num</label>
                  <span class="u-text-secondary">00 225 558 9966</span>
                </div>

                <div class="c-form__control c-form__control--inline mb-0">
                  <label class="c-form__label">Contact Ticket</label>
                  <span class="u-text-secondary">RFK-662</span>
                </div>

                <div class="c-form__control c-form__control--inline mb-0">
                  <label class="c-form__label">Contact Email</label>
                  <span class="u-text-secondary">mls@trebmls.com</span>
                </div>
              </div>
            </div>

            <span class="c-badge u-bg-danger">danger</span>
            <span class="c-badge u-bg-warn">warn</span>
            <span class="c-badge u-bg-info">info</span>
            <span class="c-badge u-bg-success">success</span>
            <span class="c-badge">badge</span>
            <span class="c-badge u-bg-dark">success</span>
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
export default {
  data() {
    return {
      showModal: false,

      payload: {
        name: "",
      },
    };
  },

  methods: {
    validation() {
      return Yup.object({
        password: Yup.string().required(),
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