<template>
  <v-card ref="card" style="height: 100%">
    <v-toolbar flat>
      <v-toolbar-title><b>Control Center</b></v-toolbar-title>
    </v-toolbar>
    <v-tabs v-model="tabSelected" :grow="false">
      <v-tab><v-icon left>mdi-text-subject</v-icon>readme</v-tab>
      <v-tab><v-icon left>mdi-pencil-box-outline</v-icon>input</v-tab>

      <!-- info -->
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>
              Welcome to the <b>KROAS</b> (<b>K</b>nowledge g<b>R</b>aph
              <b>O</b>nline <b>A</b>nalysis <b>S</b>ystem).
            </p>

            <p>
              There are some usage of this website.
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
            <p>
              Select the input source form:
            </p>
            <!-- input control radios -->
            <v-radio-group v-model="inputSelected" row>
              <v-radio
                label="Article"
                value="article"
                color="blue darken-3"
              ></v-radio>
              <v-radio
                label="File"
                value="file"
                color="green darken-3"
              ></v-radio>
              <v-radio
                label="Textarea"
                value="textarea"
                color="red darken-3"
              ></v-radio>
            </v-radio-group>

            <!-- radio article -->
            <div v-show="inputSelected === 'article'">
              <v-autocomplete
                v-model="select1"
                label="Article Industry"
                autocomplete="off"
                :items="selectItems1"
                :loading="isLoading"
                outlined
                clearable
              />
              <v-autocomplete
                v-model="select2"
                label="Article Index"
                autocomplete="off"
                :items="selectItems2"
                :disabled="isSelect2Disable"
                :loading="isLoading"
                outlined
                clearable
              />
            </div>

            <!-- radio file -->
            <div v-show="inputSelected === 'file'">
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
            </div>

            <!-- radio textarea -->
            <div v-show="inputSelected === 'textarea'">
              <TextArea />
            </div>

            <!-- analysis btn -->
            <v-btn
              color="primary"
              block
              dark
              :loading="isLoading"
              @click="analysisText"
            >
              <v-icon left>mdi-camera-iris</v-icon> Analysis
            </v-btn>

            <!-- divider -->
            <div style="height: 10px"></div>
            <v-divider />
            <div style="height: 10px"></div>

            <!-- graph control -->
            <p>Layout of the graph:</p>
            <v-radio-group v-model="layoutSelected" row>
              <v-radio
                label="Force"
                value="force"
                color="teal darken-1"
              ></v-radio>
              <v-radio
                label="Circular"
                value="circular"
                color="purple darken-1"
              ></v-radio>
            </v-radio-group>
            <p>Undirected/Directed of the graph:</p>
            <v-radio-group v-model="directedSelected" row>
              <v-radio
                label="Undirected"
                value="undirected"
                color="orange darken-4"
              ></v-radio>
              <v-radio
                label="Directed"
                value="directed"
                color="indigo lighten-1"
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
import TextArea from '@/components/index/TextArea.vue'

export default {
  components: {
    TextArea
  },
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
      tabSelected: 1,
      // v-model for select1
      select1: '',
      // v-model for select1
      select2: '',
      // v-model for input radio
      inputSelected: this.$store.state.ShareVar.inputSelect,
      // v-model for layout radio
      layoutSelected: this.$store.state.ShareVar.graphType,
      // v-model for directed Selected radio
      directedSelected: this.$store.state.ShareVar.directedSelected,
      // v-model for files
      files: null,
      // text in the file
      fileText: '',
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
    files(val) {
      if (!val) {
        this.fileText = ''
      }
    },
    layoutSelected(val) {
      this.$store.commit('ShareVar/setGraphType', val)
    },
    inputSelected(val) {
      this.$store.commit('ShareVar/setInputSelect', val)
    },
    directedSelected(val) {
      this.$store.commit('ShareVar/setDirectedSelected', val)
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
          // this.$store.commit('ShareVar/setInputText', e.target.result)
          this.fileText = e.target.result
        }
      }
    },
    async analysisText() {
      this.$store.commit('ShareVar/setIsLoading', true)
      switch (this.inputSelected) {
        case 'article':
          await this.articleHandler()
          break
        case 'file':
          if (this.fileText) {
            await this.textHandler(this.fileText)
          } else {
            Notification.warning({
              title: 'Notice',
              message: 'You should choice a file to get its text.',
              duration: 6000,
              showClose: true
            })
          }
          break
        case 'textarea':
          const text = this.$store.state.ShareVar.textInput
          if (text) {
            await this.textHandler(text)
          } else {
            Notification.warning({
              title: 'Notice',
              message: 'There should be something in the text area.',
              duration: 6000,
              showClose: true
            })
          }

          break
        default:
          break
      }
      this.$store.commit('ShareVar/setIsLoading', false)
    },
    async articleHandler() {
      if (this.select1 && this.select2) {
        let data
        try {
          data = await this.$axios.$get('/api/v1/articleInfo', {
            params: {
              category: this.select1,
              identity: this.select2
            }
          })
          this.adjustNodeSize(data.graph.nodes)
          // this.$store.commit('ShareVar/setInputText', data.content)
          this.$store.commit('ShareVar/setEchartsNodes', data.graph.nodes)
          this.$store.commit('ShareVar/setEchartsEdges', data.graph.edges)
          this.$store.commit(
            'ShareVar/setEchartsCategories',
            data.graph.categories
          )
          this.$store.commit('ShareVar/updateDateTime')

          // success notice
          this.successNotice("Get Article' info Success!")
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
    async textHandler(text) {
      if (text) {
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

          // success notice
          this.successNotice('Analysis text Success!')
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
      } else {
        Notification.warning({
          title: 'Notice',
          message: 'Text is null/undefined!',
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
    },
    successNotice(text) {
      Notification.success({
        title: 'Success',
        message: text,
        duration: 6000,
        showClose: true
      })
    }
  }
}
</script>
