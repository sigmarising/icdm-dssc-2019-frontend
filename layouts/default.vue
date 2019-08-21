<template>
  <v-app>
    <!-- the top bar of app -->
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="false"
      :clipped="clipped"
      fixed
      app
    >
      <NaviList />
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app dark color="#1867C0">
      <!-- left side of app bar -->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title
        class="d-flex justify-center align-center"
        style="padding-left: 10px"
      >
        <img src="/imgs/logo.png" height="38px" />
      </v-toolbar-title>
      <v-spacer />
      <!-- right side of app bar -->
      <a :href="mailTo" style="text-decoration: none">
        <v-btn icon>
          <v-icon>mdi-email-outline</v-icon>
        </v-btn>
      </a>
      <a :href="telTo" style="text-decoration: none">
        <v-btn icon>
          <v-icon>mdi-phone</v-icon>
        </v-btn>
      </a>
      <!-- <a :href="git" target="_blank" style="text-decoration: none">
        <v-btn icon>
          <v-icon>mdi-github-circle</v-icon>
        </v-btn>
      </a> -->
    </v-app-bar>

    <!-- the main layout content -->
    <v-content>
      <v-container fluid style="height: 100%">
        <nuxt />
      </v-container>
      <SpeedDial />
    </v-content>

    <!-- the footer in default -->
    <v-footer class="d-flex justify-center" padless>
      <span class="font-weight-light">
        &copy; 2019 BUPT-DSSC &nbsp;&nbsp;&nbsp; All Rights Reserved
      </span>
    </v-footer>
  </v-app>
</template>

<script>
import NaviList from '@/components/layouts/NaviList.vue'
import SpeedDial from '@/components/layouts/SpeedDial.vue'

export default {
  components: {
    NaviList,
    SpeedDial
  },
  data() {
    return {
      // the v-model var use for side drawer
      drawer: false,
      // control the drawer whether to show under the app bar
      clipped: false,
      // the email we support to use
      email: this.$store.state.LayoutConfig.email,
      // the phone number we support to use
      phone: this.$store.state.LayoutConfig.phone
      // the git respository use for this project
      // git: this.$store.state.LayoutConfig.git
    }
  },
  computed: {
    mailTo() {
      return 'mailto:' + this.email
    },
    telTo() {
      return 'tel:' + this.phone
    }
  }
}
</script>

<style>
/* scrollbar global */
::-webkit-scrollbar-track {
  /* -webkit-box-shadow: inset 0 0 7px rgba(0, 0, 0, 0.3); */
  border-radius: 0px;
  background-color: #f5f5f5;
}
::-webkit-scrollbar {
  width: 7px;
  background-color: #f5f5f5;
}
::-webkit-scrollbar-thumb {
  -webkit-box-shadow: inset 0 0 7px rgba(0, 0, 0, 0.3);
  border-radius: 0px;
  background-color: #a8a8a8;
}
</style>
