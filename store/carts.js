export const state = () => ({
  items: [],
})

export const mutations = {
  addItem(state, id) {
    state.items.push({
      id: id,
      quantity: 1,
    })
    console.log(state.items)
  },
  incrementItem(state, id) {
    state.items.find((item) => item.id === id).quantity++
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
}
