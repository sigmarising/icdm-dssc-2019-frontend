<template>
  <v-row>
    <v-col cols="0" sm="1" md="2" lg="2" xl="2"></v-col>
    <v-col cols="12" sm="10" md="8" lg="8" xl="8">
      <v-timeline dense>
        <v-timeline-item
          :fill-dot="isfillDot"
          :icon="'mdi-visual-studio-code'"
          color="#01579B"
        >
          <v-card class="elevation-2">
            <v-card-title class="headline">
              <b>KROAS Project</b>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <p>
                <b>KROAS</b> (<b>K</b>nowledge g<b>R</b>aph <b>O</b>nline
                <b>A</b>nalysis <b>S</b>ystem) is a web application build by
                BUPT-IBL team for 2019 ICDM Contest. The application is able to
                generate a knowledge graph from an input text and display the
                graph by visualization tools.
              </p>
              <p>
                Please feel free to contact us if you have any question.
              </p>
              <p>
                BUPT-IBL Team: Junwei Sun, Yun Zhang, Bin Wu, Ting Bai
                <br />
                Email: sjw1996@bupt.edu.cn
                <br />
                Tel: +86 15601266855
              </p>
            </v-card-text>
          </v-card>
        </v-timeline-item>
        <v-timeline-item
          :fill-dot="isfillDot"
          :icon="'mdi-webpack'"
          color="#5E35B1"
        >
          <v-card class="elevation-2">
            <v-card-title class="headline"><b>Front End</b></v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              The frontend of this project is powered by:
              <ul>
                <li>
                  <b>
                    <a
                      class="links"
                      href="https://vuejs.org/index.html"
                      target="_blank"
                    >
                      Vue.js
                    </a> </b
                  >: The Progressive JavaScript Framework
                </li>
                <li>
                  <b>
                    <a class="links" href="https://nuxtjs.org/" target="_blank">
                      Nuxt.js
                    </a> </b
                  >: The Vue.js Framework Solution
                </li>
                <li>
                  <b>
                    <a
                      class="links"
                      href="https://vuetifyjs.com/en/"
                      target="_blank"
                    >
                      Vuetify
                    </a> </b
                  >: The Vue.js Material Design UI
                </li>
                <li>
                  <b>
                    <a
                      class="links"
                      href="https://element.eleme.cn/#/en-US"
                      target="_blank"
                    >
                      Element
                    </a> </b
                  >: A Vue 2.0 based UI component library
                </li>
                <li>
                  <b>
                    <a
                      class="links"
                      href="https://echarts.apache.org/en/index.html"
                      target="_blank"
                    >
                      ECharts
                    </a> </b
                  >: Open source JavaScript visualization
                </li>
              </ul>
            </v-card-text>
          </v-card>
        </v-timeline-item>
        <v-timeline-item
          :fill-dot="isfillDot"
          :icon="'mdi-server'"
          color="#004D40"
        >
          <v-card class="elevation-2">
            <v-card-title class="headline"><b>Back End</b></v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              The backend of this project is powered by:
              <ul>
                <li>
                  <b>
                    <a
                      class="links"
                      href="https://www.djangoproject.com/"
                      target="_blank"
                    >
                      django
                    </a> </b
                  >: High-Level Python Web framework
                </li>
                <li>
                  <b>
                    <a
                      class="links"
                      href="https://www.nginx.com/"
                      target="_blank"
                    >
                      NGINX
                    </a> </b
                  >: Http and reverse proxy server
                </li>
                <li>
                  <b>
                    <a
                      class="links"
                      href="https://www.mysql.com/"
                      target="_blank"
                    >
                      MySQL
                    </a> </b
                  >: Most popular open source database
                </li>
              </ul>
            </v-card-text>
          </v-card>
        </v-timeline-item>
        <v-timeline-item
          :fill-dot="isfillDot"
          :icon="'mdi-github-circle'"
          color="#263238"
        >
          <v-card class="elevation-2">
            <v-card-title class="headline"><b>Open Source</b></v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              This project is open-sourced on Github
              <ul>
                <li>
                  <b>
                    <a
                      class="links"
                      href="https://github.com/sigmarising/icdm-dssc-2019-frontend"
                      target="_blank"
                    >
                      FrontEnd
                    </a> </b
                  >: icdm-2019-frontend
                </li>
                <li>
                  <b>
                    <a
                      class="links"
                      href="https://github.com/sigmarising/icdm-dssc-2019-backend"
                      target="_blank"
                    >
                      BackEnd
                    </a> </b
                  >: icdm-2019-backend
                </li>
              </ul>
              <b>
                <a
                  class="links"
                  style="color: grey"
                  href="https://github.com/sigmarising"
                  target="_blank"
                >
                  Following the Author
                </a> </b
              >: Yun Zhang, a team member of BUPT-IBL.
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-col>
    <v-col cols="0" sm="1" md="2" lg="2" xl="2"></v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      isfillDot: true
    }
  }
}
</script>

<style scoped>
.links {
  text-decoration: none;
}
</style>
