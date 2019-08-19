<template>
  <v-row :align="center" :justify="center">
    <!-- Error -->
    <v-col cols="12" class="d-flex justify-center align-end">
      <div class="display-4 font-weight-bold">Error {{ error.statusCode }}</div>
    </v-col>

    <!-- Back to index -->
    <v-col cols="12" class="d-flex justify-center align-start">
      <nuxt-link
        to="/"
        class="title font-weight-light"
        style="text-decoration: none"
      >
        BACK TO INDEX PAGE
      </nuxt-link>
    </v-col>
  </v-row>
</template>

<script>
/* eslint-disable */
export default {
  props: ['error'],
  layout: 'fullPage' // define the layout used by error page
}
</script>
