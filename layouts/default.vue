<template>
  <v-app dark>
    <v-app-bar
      fixed
      app
      color="indigo darken-2"
    > 

    <!-- Show menu button if user is logged in and is admin -->

    <v-menu v-if="$auth.user && $auth.user.data.admin"

      bottom
      origin="center center"
      transition="scale-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="indigo darken-2"
          dark
          v-bind="attrs"
          v-on="on"
          class="hidden-md-and-up"
        >
          Menu
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          :to="{ name: 'index' }"
          ripple
          exact
        >
        <v-list-item-action>
            <v-icon></v-icon>
        </v-list-item-action>
        <v-list-item-content>
            <v-list-item-title >Videos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          ripple
          :to="{ name: 'admin-videos' }"
        >
          <v-list-item-action>
            <v-icon></v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title >Admin</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          @click="logout"
          ripple
        >
        <v-list-item-action>
            <v-icon>logout</v-icon>
        </v-list-item-action>
        <v-list-item-content>
            <v-list-item-title >Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- End of admin user -->

    <!-- Show menu if user is not logged in -->

    <v-menu v-if="!$auth.user"

      bottom
      origin="center center"
      transition="scale-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="indigo darken-2"
          dark
          v-bind="attrs"
          v-on="on"
          class="hidden-md-and-up"
        >
          Menu
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :to="item.to"
          :key="index"
          exact
        >
          <v-list-item-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- End of not looged in user -->

    <!-- Show logout button if user islogged in but not admin -->
    <v-menu v-if="$auth.user && !$auth.user.data.admin"

      bottom
      origin="center center"
      transition="scale-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="indigo darken-2"
          dark
          v-bind="attrs"
          v-on="on"
          class="hidden-md-and-up"
        >
          Menu
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          ripple
          :to="{ name: 'admin-videos' }"
        >
          <v-list-item-action>
            <v-icon></v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title >{{ $auth.user.data.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>        
        <v-list-item
          @click="logout"
          ripple
        >
        <v-list-item-action>
            <v-icon>logout</v-icon>
        </v-list-item-action>
        <v-list-item-content>
            <v-list-item-title >Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
   <!-- End of looged in user not admin -->
        <v-tabs class="hidden-sm-and-down">
          <v-tab text  :to="{ name: 'index' }" class="mr-2">My Casts</v-tab>
          <v-tab text  :to="{ name: 'admin-videos' }" v-if="$auth.user && $auth.user.data.admin" >Admin</v-tab>
          <v-spacer></v-spacer>
            <template v-if="$auth.user">
              <v-tab text disabled  class="mr-2" >{{ $auth.user.data.name }}</v-tab>
              <v-tab text  @click.prevent="logout" class="mr-2">Logout</v-tab>
            </template>
            <template v-else>
              <v-tab text  :to="{ name: 'login' }" class="mr-2" >Login</v-tab>
              <v-tab text  :to="{ name: 'register' }" class="mr-2" >Register</v-tab>
            </template>
        </v-tabs>    
      <v-spacer />
      
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    
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
      fixed
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
    ...mapState(['snackbar']),
    menuItems () {
      if( this.$auth.user ){
        return this.loggedInItems
      }
      return this.items
    }, 
  },
  data () {
    return {
      drawer: false,
      items: [
      {
          icon: '',
          title: 'Videos',
          to: { name: 'index' }
        },
        {
          icon: 'login',
          title: 'Login',
          to: '/login'
        },
        {
          icon: '',
          title: 'Register',
          to: { name: 'register' }
        }
      ]
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
  },
  mounted () {
    console.log(this.$route.name)
  }
}
</script>
