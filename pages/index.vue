<template>
  <Tutorial/>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>

<script>
export default {
  data() {
    return {
      login: {
        username: 'alireza2000sajedi@gmail.com',
        password: '1qaz!QAZ',
        grant_type: 'username',
      }
    }
  },
  methods: {
    async test() {
      // await this.$auth.fetchUser();
      // await this.$auth.loginWith('local', {data: this.login});
      // await this.$auth.refreshTokens();
      // await this.$auth.logout({
      //   data: {
      //     'refresh_token': this.$auth.strategy.refreshToken.get()
      //   }
      // });
    }
  },
  computed: {
    sd() {
      return this.$store.state.me.data;
    }
  }
}
</script>
