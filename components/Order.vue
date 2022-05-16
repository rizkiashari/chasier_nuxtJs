<template>
  <v-row>
    <v-col cols="12">
      <h2>Order</h2>
      <v-list>
        <v-list-item v-for="(item, index) in cartItems" :key="index">
          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ currency(item.price) }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  methods: {
    currency(val) {
      return Intl.NumberFormat('en-US').format(val)
    },
  },
  computed: {
    ...mapState('carts', {
      items: 'items',
    }),
    ...mapGetters('carts', {
      cartItems: 'cartItems',
    }),
  },
}
</script>
