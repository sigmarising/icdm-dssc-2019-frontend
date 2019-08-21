<template>
  <!-- whole layout -->
  <v-row class="layout-container">
    <!-- left -->
    <v-col cols="12" sm="12" md="4" lg="4" xl="4" class="left-area">
      <v-row class="left-row">
        <!-- control -->
        <v-col cols="12">
          <SelectArea :categories="categories" />
        </v-col>
        <!-- text -->
        <v-col cols="12">
          <TextArea />
        </v-col>
      </v-row>
    </v-col>
    <!-- right -->
    <v-col cols="12" sm="12" md="8" lg="8" xl="8" class="right-area">
      <GraphChart />
    </v-col>
  </v-row>
</template>

<script>
import { Notification } from 'element-ui'
import SelectArea from '@/components/index/SelectArea.vue'
import TextArea from '@/components/index/TextArea.vue'
import GraphChart from '@/components/index/GraphChart.vue'
import 'element-ui/lib/theme-chalk/index.css'

export default {
  components: {
    SelectArea,
    TextArea,
    GraphChart
  },
  data() {
    return {}
  },
  async asyncData({ $axios }) {
    let data
    try {
      data = await $axios.$get('/api/v1/articleListMap')
    } catch (error) {
      Notification.error({
        title: 'ERROR in Backend Services',
        message: `KROAS can not access to backend service.
        Some features can not be used at this time.
        Please refresh this page later and retry.`,
        duration: 0,
        showClose: true
      })
      data = {}
    }
    return {
      categories: data
    }
  }
}
</script>

<style scoped>
.layout-container {
  height: 100%;
  padding: 0px;
}

.right-area {
  padding-top: 24px;
  padding-bottom: 24px;
}

.left-row,
.right-row {
  height: 100%;
}
</style>
