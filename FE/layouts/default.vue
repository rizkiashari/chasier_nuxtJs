<template>
  <v-app>
    <v-navigation-drawer disable-resize-watcher v-model="sideDrawer" fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in sideMenu"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container fill-height fluid>
        <Nuxt />
      </v-container>
    </v-main>

    <v-bottom-navigation horizontal height="10vh" fixed color="primary" app>
      <v-app-bar-nav-icon
        v-ripple="false"
        plain
        @click.stop="sideDrawer = !sideDrawer"
      />
      <v-btn
        v-for="(item, i) in bottomMenu"
        :to="item.to"
        :key="i"
        v-ripple="false"
        plain
      >
        <span>
          {{ item.title }}
        </span>
        <v-icon>
          {{ item.icon }}
        </v-icon>
      </v-btn>
      <v-spacer />
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      sideDrawer: false,
      sideMenu: [
        {
          icon: 'mdi-account',
          title: 'Account',
          to: '/account',
        },
        {
          icon: 'mdi-bell',
          title: 'Notification',
          to: '/notification',
        },
      ],
      bottomMenu: [
        {
          icon: 'mdi-application',
          title: 'App',
          to: '/',
        },
      ],
    }
  },
  methods: {
    isWelcomeScreen() {
      if (!localStorage.welcomeScreen) {
        if (
          this.$router.currentRoute.path !== '/register' &&
          this.$router.currentRoute.path !== '/login'
        ) {
          this.$router.push('/register')
        }
      }
    },
  },
  watch: {
    $route() {
      this.isWelcomeScreen()
    },
  },
  mounted() {
    // localStorage.setItem('welcomeScreen', true)
    this.isWelcomeScreen()
  },
}
</script>
