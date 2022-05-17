export const state = () => ({
  items: [],
})

// Manipulasi data sebelum di tampilkan ke user
export const getters = {
  cartItems: (state, getters, rootState) => {
    return state.items.map(({ id, quantity }) => {
      let product = rootState.products.products.find(
        (product) => product.id === id
      )
      return {
        id,
        title: product.title,
        name: product.name,
        price: product.price,
        quantity,
      }
    })
  },
  itemTotal: () => (price, quantity) => {
    return price * quantity
  },
  subTotal: (state, getters) => {
    return getters.cartItems.reduce((total, item) => {
      return total + item.price * item.quantity
    }, 0)
  },
}

export const mutations = {
  addItem(state, id) {
    state.items.push({
      id: id,
      quantity: 1,
    })
  },
  incrementItem(state, id) {
    state.items.find((item) => item.id === id).quantity++
  },
  decrementItem(state, id) {
    let item = state.items.find((item) => item.id === id)
    if (item.quantity > 1) {
      item.quantity--
    }
  },
  removeItem(state, id) {
    let index = state.items.findIndex((item) => item.id === id)
    state.items.splice(index, 1)
  },
}

export const actions = {
  addToCart({ commit, state }, id) {
    const found = state.items.find((item) => item.id === id)
    if (found) {
      commit('incrementItem', id)
    } else {
      commit('addItem', id)
    }
  },
  increment({ commit }, id) {
    commit('incrementItem', id)
  },
  decrement({ commit }, id) {
    commit('decrementItem', id)
  },
  remove({ commit }, id) {
    commit('removeItem', id)
  },
}
