<template>
  <div class="d-flex align-center" style="height: 100%">
    <v-textarea
      v-model.lazy.trim="inputText"
      :loading="isLoading"
      label="Text Area"
      hint="The text which is used for analysising."
      autocomplete="off"
      rows="10"
      clearable
      no-resize
    ></v-textarea>
  </div>
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
    isLoading() {
      return this.$store.state.ShareVar.isLoading
    }
  },
  watch: {
    inputText(val) {
      this.$store.commit('ShareVar/setInputText', val)
    }
  },

  methods: {}
}
</script>

<style scoped>
/* .card {
  padding: 16px;
  height: 100%;
} */
</style>
