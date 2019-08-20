<template>
  <v-card ref="card" class="card">
    <div class="d-flex align-center" style="height: 100%">
      <v-textarea
        v-model.lazy.trim="inputText"
        :disabled="disable"
        label="Text Area"
        hint="The text which is used for analysising."
        rows="10"
        clearable
        no-resize
      ></v-textarea>
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      // the v-model of text inputs
      inputText: this.$store.state.ShareVar.textInput
    }
  },
  computed: {
    disable() {
      return !this.$store.state.ShareVar.isTextAreaAvaliable
    },
    fileText() {
      return this.$store.state.ShareVar.textInput
    }
  },
  watch: {
    inputText(val) {
      this.$store.commit('ShareVar/setInputText', val)
      this.$store.commit('ShareVar/updateDateTime', Date())
    },
    fileText(val) {
      this.inputText = val
    }
  },

  methods: {}
}
</script>

<style scoped>
.card {
  padding: 16px;
  height: 100%;
}
</style>
