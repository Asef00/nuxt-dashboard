export default ({$axios, redirect, app}, inject) => {
  $axios.onError((error) => {
    throw error
  })
  $axios.before
}
