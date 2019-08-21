<template>
  <v-card ref="card" style="height: 100%">
    <v-toolbar flat>
      <v-toolbar-title>Control Center</v-toolbar-title>
    </v-toolbar>
    <v-tabs v-model="tabSelected">
      <v-tab><v-icon left>mdi-information-variant</v-icon>readme</v-tab>
      <v-tab><v-icon left>mdi-text-subject</v-icon>articles</v-tab>
      <v-tab><v-icon left>mdi-circle-edit-outline</v-icon>manual</v-tab>
      <v-tab><v-icon left>mdi-settings-outline</v-icon>graph</v-tab>
      <!-- info -->
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>
              Welcome to the <b>KROAS</b> (<b>K</b>nowledge g<b>R</b>aph
              <b>O</b>nline <b>A</b>nalysis <b>S</b>ystem). There are some usage
              of this website.
            </p>

            <p>
              In <b>ARTICLE</b> tab, you can select the article and show it
              knowledge graph. <br />
              In <b>MANUAL</b> tab, you can type in the textarea or upload text
              from a file. Then you can have a look at it's knowledge graph.
              <br />
              In <b>GRAPH</b> tab, you can control the layout of charts.
            </p>

            <p>
              Just enjoy youself!
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
              label="Article Industry"
              autocomplete="off"
              :items="selectItems1"
              outlined
              clearable
            />
            <v-autocomplete
              v-model="select2"
              label="Article Index"
              autocomplete="off"
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
              @click="submmitArticle"
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
              autocomplete="off"
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
            <v-btn
              color="primary"
              block
              dark
              :loading="isLoading"
              @click="submitText"
            >
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
                label="Circular"
                value="circular"
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
      radioSelected: this.$store.state.ShareVar.graphType,
      // v-model for files
      files: [],
      selectItems1: [],
      selectItems2: []
    }
  },
  computed: {
    isSelect2Disable() {
      if (this.select1) return false
      else return true
    },
    isLoading() {
      return this.$store.state.ShareVar.isLoading
    }
  },
  watch: {
    tabSelected(val) {
      if (val === 2 || val === 1) {
        this.$store.commit('ShareVar/setTextAreaAvaliable', true)
      } else {
        this.$store.commit('ShareVar/setTextAreaAvaliable', false)
      }
    },
    radioSelected(val) {
      this.$store.commit('ShareVar/setGraphType', val)
    },
    select1(val) {
      if (val) this.selectItems2 = this.categories[val]
      else this.selectItems2 = []
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
    async submmitArticle() {
      if (this.select1 && this.select2) {
        this.$store.commit('ShareVar/setIsLoading', true)
        let data
        try {
          data = await this.$axios.$get('/api/v1/articleInfo', {
            params: {
              category: this.select1,
              identity: this.select2
            }
          })
          this.adjustNodeSize(data.graph.nodes)
          this.$store.commit('ShareVar/setInputText', data.content)
          this.$store.commit('ShareVar/setEchartsNodes', data.graph.nodes)
          this.$store.commit('ShareVar/setEchartsEdges', data.graph.edges)
          this.$store.commit(
            'ShareVar/setEchartsCategories',
            data.graph.categories
          )
          this.$store.commit('ShareVar/updateDateTime')
        } catch (error) {
          data = {}
          Notification.error({
            title: 'ERROR in Requesting',
            message:
              'There are something error when apply request. Please retry later.',
            duration: 6000,
            showClose: true
          })
        }
        this.$store.commit('ShareVar/setIsLoading', false)
      } else {
        Notification.warning({
          title: 'Notice',
          message:
            'You should select the industry and the index of the artcile.',
          duration: 6000,
          showClose: true
        })
      }
    },
    async submitText() {
      const text = this.$store.state.ShareVar.textInput
      if (text) {
        this.$store.commit('ShareVar/setIsLoading', true)
        let data
        try {
          data = await this.$axios.$get('/api/v1/knowledgeGraph', {
            params: {
              text: this.$store.state.ShareVar.textInput
            }
          })
          this.adjustNodeSize(data.graph.nodes)
          this.$store.commit('ShareVar/setEchartsNodes', data.graph.nodes)
          this.$store.commit('ShareVar/setEchartsEdges', data.graph.edges)
          this.$store.commit(
            'ShareVar/setEchartsCategories',
            data.graph.categories
          )
          this.$store.commit('ShareVar/updateDateTime')
        } catch (error) {
          data = {}
          Notification.error({
            title: 'ERROR in Requesting',
            message:
              'There are something error when apply request. Please retry later.',
            duration: 6000,
            showClose: true
          })
        }
        this.$store.commit('ShareVar/setIsLoading', false)
      } else {
        Notification.warning({
          title: 'Notice',
          message: 'There should be something in the text area.',
          duration: 6000,
          showClose: true
        })
      }
    },
    adjustNodeSize(nodes) {
      const adjustSize = 30
      const basicSize = 20
      for (const node of nodes) {
        node.symbolSize = Math.floor(node.symbolSize * adjustSize) + basicSize
      }
    }
  }
}
</script>
