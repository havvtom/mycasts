<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
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
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="indigo darken-2"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <client-only>
        <v-btn text  :to="{ name: 'index' }" class="mr-2">My Casts</v-btn>
        <v-btn text  :to="{ name: 'admin-videos' }" v-if="$auth.user && $auth.user.data.admin" >Admin</v-btn>
        <v-spacer></v-spacer>
        <div v-if="$auth.user">
          <v-btn text  :to="{ name: 'index' }" class="mr-2" >{{ $auth.user.data.name }}</v-btn>
          <v-btn text  @click.prevent="logout" class="mr-2">Logout</v-btn>
        </div>
        <div v-else>
          <v-btn text  :to="{ name: 'login' }" class="mr-2" >Login</v-btn>
          <v-btn text  :to="{ name: 'register' }" class="mr-2" >Register</v-btn>
        </div>
      </client-only>
      <v-spacer />
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-snackbar
        v-model="snackbar.showing"
        :color="snackbar.color"
        :timeout="-1"
      >
        {{snackbar.text}}
      <v-btn text @click="closeSnackbar">
        Close
      </v-btn>
    </v-snackbar>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['snackbar'])
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false
    }
  },
  methods: {
     closeSnackbar () {
      this.$store.dispatch('setSnackbar', {
          showing: false,
      })
    },
    async logout () {
        await this.$auth.logout()
      }
  }
}
</script>
