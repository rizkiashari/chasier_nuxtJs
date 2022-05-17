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
              {{ currency(item.price) }} X
              <v-btn
                @click="decrement(item.id)"
                icon
                class="px-0"
                color="primary"
                x-small
              >
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
              {{ item.quantity }}
              <v-btn
                @click="increment(item.id)"
                icon
                class="px-0"
                color="primary"
                x-small
              >
                <v-icon>mdi-chevron-up</v-icon>
              </v-btn>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn @click="remove(item.id)" icon color="error" x-small>
              <v-icon>mdi-close-thick</v-icon>
            </v-btn>
            <v-list-item-title>
              {{ currency(itemTotal(item.price, item.quantity)) }}
            </v-list-item-title>
          </v-list-item-action>
        </v-list-item>
        <v-list-item
          v-if="cartItems.length"
          class="text-h6 black--text grey lighten-2"
        >
          <v-list-item-content>
            <v-list-item-title> Sub Total </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-title> {{ currency(subTotal) }} </v-list-item-title>
          </v-list-item-action>
        </v-list-item>
        <v-list-group
          class="black--text grey lighten-3"
          v-if="cartItems.length"
          :value="false"
        >
          <template v-slot:activator>
            <v-list-item-content class="text-h6">
              <v-list-item-title>Additionals</v-list-item-title>
            </v-list-item-content>
          </template>
          <template>
            <v-list-item
              v-for="(additional, index) in additionals"
              :key="index"
              disabled
            >
              <v-list-item-content>
                <v-list-item-title>{{ additional.title }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-title>
                  {{ currency(additional.value) }}
                </v-list-item-title>
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-list-group>
      </v-list>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('carts', {
      increment: 'increment',
      decrement: 'decrement',
      remove: 'remove',
    }),
    currency(val) {
      return Intl.NumberFormat('en-US').format(val)
    },
  },
  computed: {
    ...mapState('carts', {
      items: 'items',
      additionals: 'additionals',
    }),
    ...mapGetters('carts', {
      cartItems: 'cartItems',
      itemTotal: 'itemTotal',
      subTotal: 'subTotal',
    }),
  },
}
</script>
