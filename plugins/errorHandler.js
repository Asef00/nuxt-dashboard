export default ({app,store}, inject) => {
  inject('error', function (error) {
    store.commit('SET_ERROR', error)
  })
}
