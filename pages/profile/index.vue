<template>
  <div>
    <VCard title="Profile">
      <template #header>
        <VBtn @action="showModal = true" type="button" class="m-0 c-btn--small">
          Change Password
        </VBtn>
      </template>
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

        <VBtn @action="startLoading" class="m-0 c-btn--block" btn="primary" :loader="loaderRequest">
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

<style>
</style>