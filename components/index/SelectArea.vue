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
              Welcome to <b>KROAS</b> (<b>K</b>nowledge g<b>R</b>aph
              <b>O</b>nline <b>A</b>nalysis <b>S</b>ystem) of BUPT-IBL team for
              2019 ICDM Contest.
            </p>
            <p>
              Instructions:
              <br />
              Input Data: Selecting data from Contest Dataset
              (icdm_contest_data.csv), Upload File and Input Text.
            </p>
            <p>
              Relation Confidence: Including strong, medium and weak three
              levels. Strong means that we only display the triples with high
              quality relations, while weak represents that all the triples are
              displayed in graph but with a relatively low confidence in the
              quality of their relations. The default relation confidence is set
              to medium.
            </p>
            <p>
              Generate Graph: Generating the corresponding knowledge graph based
              on the Input Data and Relation Confidence.
            </p>
            <p>
              Graph Layout: Including graph display modes: Force or Circular,
              and relation display modes: undirected or directed (from source to
              target).
            </p>
            <p>
              Advanced Function: Entity Type and Community Detection. The type
              of an entity is recognized by different colors (eg., PERSON, ORG,
              etc). Community detection shows the communitiy clusters based on
              louvain algorithm.
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <!-- articles -->
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>
              Data Source:
            </p>
            <!-- input control radios -->
            <v-radio-group v-model="inputSelected" row>
              <v-radio
                label="Article"
                value="article"
                color="blue darken-3"
              ></v-radio>
              <v-radio
                label="Upload File"
                value="file"
                color="green darken-3"
              ></v-radio>
              <v-radio
                label="Input Text"
                value="textarea"
                color="red darken-3"
              ></v-radio>
            </v-radio-group>

            <!-- radio article -->
            <div v-show="inputSelected === 'article'">
              <v-autocomplete
                v-model="select1"
                label="Industry"
                autocomplete="off"
                :items="selectItems1"
                :loading="isLoading"
                outlined
                clearable
              />
              <v-autocomplete
                v-model="select2"
                label="Index"
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

            <div style="height: 10px"></div>

            <!-- submit area -->
            <div>
              <!-- Analysis strength -->
              <v-select
                v-model="analysisStrength"
                :loading="isLoading"
                :items="['Weak', 'Medium', 'Strong']"
                label="Relation Confidence"
                outlined
              ></v-select>
              <!-- analysis btn -->
              <v-btn
                color="primary"
                block
                dark
                :loading="isLoading"
                @click="analysisText"
              >
                <v-icon left>mdi-camera-iris</v-icon> Generate Graph
              </v-btn>
            </div>

            <!-- divider -->
            <div style="height: 15px"></div>
            <v-divider />
            <div style="height: 5px"></div>

            <!-- graph control -->
            <p>Graph Layout:</p>
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
            <p>Edge Direction:</p>
            <v-radio-group v-model="directedSelected" row>
              <v-radio
                label="Undirected"
                value="undirected"
                color="orange darken-4"
              ></v-radio>
              <v-radio
                label="Directed (Source to Target)"
                value="directed"
                color="indigo lighten-1"
              ></v-radio>
            </v-radio-group>
            <p>Advance Function:</p>
            <v-radio-group v-model="classificationSelected" row>
              <v-radio
                label="Entity Type"
                value="entity"
                color="lime darken-3"
              ></v-radio>
              <v-radio
                label="Community Detection"
                value="community"
                color="pink darken-1"
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
      // v-model for classification radio
      classificationSelected: this.$store.state.ShareVar.classificationSelected,
      // v-model for files
      files: null,
      // v-model for strength
      analysisStrength: 'Medium',
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
    classificationSelected(val) {
      this.$store.commit('ShareVar/setClassificationSelected', val)
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
              identity: this.select2,
              strength: this.analysisStrength
            }
          })
          if (data.graph.nodes.length !== 0 && data.graph.edges.length !== 0) {
            this.adjustNodeSize(data.graph.nodes)
            this.$store.commit('ShareVar/setEchartsNodes', data.graph.nodes)
            this.$store.commit('ShareVar/setEchartsEdges', data.graph.edges)
            this.$store.commit(
              'ShareVar/setEchartsClassification',
              data.graph.classification
            )
            this.$store.commit(
              'ShareVar/setEchartsCategories',
              data.graph.categories
            )

            this.$store.commit('ShareVar/updateDateTime')
            // success notice
            this.successNotice("Get Article' info Success!")
          } else {
            Notification.info({
              title: 'Notice',
              message: 'No triple was extracted from the input text.',
              duration: 0,
              showClose: true
            })
          }
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
              text,
              strength: this.analysisStrength
            }
          })
          if (data.graph.nodes.length !== 0 && data.graph.edges.length !== 0) {
            this.adjustNodeSize(data.graph.nodes)
            this.$store.commit('ShareVar/setEchartsNodes', data.graph.nodes)
            this.$store.commit('ShareVar/setEchartsEdges', data.graph.edges)
            this.$store.commit(
              'ShareVar/setEchartsClassification',
              data.graph.classification
            )
            this.$store.commit(
              'ShareVar/setEchartsCategories',
              data.graph.categories
            )

            this.$store.commit('ShareVar/updateDateTime')
            // success notice
            this.successNotice('Analysis text Success!')
          } else {
            Notification.info({
              title: 'Notice',
              message: 'No triple was extracted from the input text.',
              duration: 0,
              showClose: true
            })
          }
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
