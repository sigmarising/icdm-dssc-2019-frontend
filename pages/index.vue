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
      <GraphChart :date-time="dateTime" />
    </v-col>
  </v-row>
</template>

<script>
import SelectArea from '@/components/index/SelectArea.vue'
import TextArea from '@/components/index/TextArea.vue'
import GraphChart from '@/components/index/GraphChart.vue'
import 'element-ui'

export default {
  components: {
    SelectArea,
    TextArea,
    GraphChart
  },
  data() {
    return {}
  },
  computed: {
    dateTime() {
      return this.$store.state.ShareVar.dateTime
    }
  },
  async asyncData({ $axios }) {
    const data = await $axios.$get('/api/v1/articleListMap')
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
