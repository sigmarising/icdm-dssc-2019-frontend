<template>
  <v-card ref="card" style="height: 100%">
    <v-toolbar flat>
      <v-toolbar-title>Control Center</v-toolbar-title>
    </v-toolbar>
    <v-tabs v-model="tabSelected">
      <v-tab><v-icon left>mdi-information-variant</v-icon>info</v-tab>
      <v-tab><v-icon left>mdi-text-subject</v-icon>articles</v-tab>
      <v-tab><v-icon left>mdi-circle-edit-outline</v-icon>manual</v-tab>
      <v-tab><v-icon left>mdi-settings-outline</v-icon>graph</v-tab>
      <!-- info -->
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>
              Sed aliquam ultrices mauris. Donec posuere vulputate arcu. Morbi
              ac felis. Etiam feugiat lorem non metus. Sed a libero.
            </p>

            <p>
              Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus.
              Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.
              Aliquam lobortis. Aliquam lobortis. Suspendisse non nisl sit amet
              velit hendrerit rutrum.
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <!-- articles -->
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-autocomplete
              v-model="select1"
              label="Article category"
              :items="selectItems1"
              outlined
              clearable
            />
            <v-autocomplete
              v-model="select2"
              label="Article ID of this category"
              :items="selectItems2"
              :disabled="isSelect2Disable"
              outlined
              clearable
            />
            <v-btn
              color="primary"
              block
              dark
              :loading="isLoading"
              @click="submmit_article"
            >
              <v-icon left>mdi-camera-iris</v-icon> Analysis this Article
            </v-btn>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <!-- manual -->
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>
              You can fill in the textarea from a text file (or input it
              manually):
            </p>
            <v-file-input
              v-model="files"
              :loading="isLoading"
              color="green"
              label="Upload from a text File"
              prepend-inner-icon="mdi-paperclip"
              prepend-icon=""
              outlined
              clearable
              @change="fileChangeHandler"
            >
            </v-file-input>
            <v-divider style="margin-bottom: 5px" />
            <p>Edit or analysis the text in the textarea:</p>
            <div style="height: 10px"></div>
            <v-btn color="primary" block dark :loading="isLoading">
              <v-icon left>mdi-camera-iris</v-icon>Analysis the text
            </v-btn>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <!-- graph -->
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>The layout settings of the graph chart:</p>
            <v-radio-group v-model="radioSelected" row>
              <v-radio
                label="Force"
                value="force"
                color="green darken-3"
              ></v-radio>
              <v-radio
                label="Circle"
                value="circle"
                color="red darken-3"
              ></v-radio>
            </v-radio-group>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import { Notification } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

export default {
  props: {
    categories: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      // v-model for selected tab
      tabSelected: 0,
      // v-model for select1
      select1: '',
      // v-model for select1
      select2: '',
      // v-model for radio
      radioSelected: 'force',
      // v-model for files
      files: [],
      // loading control of all buttons
      isLoading: false,
      // the select2 disable
      isSelect2Disable: true,
      selectItems1: [],
      selectItems2: []
    }
  },
  watch: {
    tabSelected(val) {
      if (val === 2) {
        this.$store.commit('ShareVar/setTextAreaAvaliable', true)
      } else {
        this.$store.commit('ShareVar/setTextAreaAvaliable', false)
      }
      this.$store.commit('ShareVar/updateDateTime', Date())
    },
    radioSelected(val) {
      this.$store.commit('ShareVar/setGraphType', val)
    },
    select1(val) {
      if (val) {
        this.isSelect2Disable = false
        this.selectItems2 = this.categories[val]
      } else {
        this.isSelect2Disable = true
      }
      this.select2 = undefined
    }
  },
  created() {
    this.selectItems1 = Object.keys(this.categories)
  },
  methods: {
    fileChangeHandler() {
      if (this.files) {
        const reader = new FileReader()
        reader.readAsText(this.files)
        reader.onload = (e) => {
          this.$store.commit('ShareVar/setInputText', e.target.result)
        }
      }
    },
    submmit_article() {
      Notification.info({
        title: 'Info',
        message: 'this is message',
        duration: 3000,
        showClose: true
      })
    },
    submit_text() {}
  }
}
</script>
