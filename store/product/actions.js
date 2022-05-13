export default {
  async list({commit}) {
    await this.$axios.get('product').then((response) => {
      commit('SET_LIST', response.data)
    }).catch((error) => {
      this.$error(error.response)
    })
  },
  async show({commit}, {product}) {
    await this.$axios.get(`product/${product._id}`).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      this.$error(error.response)
    })
  },
  async create({commit}, payload) {
    await this.$axios.post('product', payload).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      this.$error(error.response)
    })
  },
  async update({commit}, {payload, product}) {
    await this.$axios.put(`product/${product._id}`, payload).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      this.$error(error.response)
    })
  },
  async delete({commit}, {product}) {
    await this.$axios.delete(`product/${product._id}`).then((response) => {
      commit('SET_ITEM', response.data)
    }).catch((error) => {
      this.$error(error.response)
    })
  },
}
