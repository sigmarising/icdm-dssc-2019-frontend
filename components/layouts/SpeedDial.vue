<template>
  <div>
    <!-- speed dial itself -->
    <v-speed-dial
      v-model="fab"
      :top="false"
      :bottom="true"
      :right="true"
      :left="false"
      :open-on-hover="false"
      :direction="'top'"
      :transition="'slide-y-reverse-transition'"
      fixed
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="blue" dark fab>
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-all-inclusive</v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="green" @click="dialog = true">
        <v-icon>mdi-message-text-outline</v-icon>
      </v-btn>
      <v-btn fab dark small color="red" @click="$vuetify.goTo(0, ScrollOption)">
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
    </v-speed-dial>
    <!-- info text -->
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title class="headline">
          {{ dialogTitle }}
        </v-card-title>
        <v-card-text>
          {{ dialogText }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            GOT IT
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // the v-model var used for speed dial
      fab: false,
      // the v-model var used for dialog
      dialog: false,
      // the scroll option
      ScrollOption: {
        duration: 700,
        offset: 0,
        easing: 'easeInOutCubic'
      },
      dialogTitle: this.$store.state.DialogText.title,
      dialogText: this.$store.state.DialogText.text
    }
  }
}
</script>
