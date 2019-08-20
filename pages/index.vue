<template>
  <!-- whole layout -->
  <v-row>
    <!-- left -->
    <v-col cols="12" sm="6" md="6" lg="6" xl="6" class="LeftArea">
      <v-row>
        <!-- control -->
        <v-col cols="12">
          <SelectArea />
        </v-col>
        <!-- text -->
        <v-col cols="12">
          <TextArea />
        </v-col>
      </v-row>
    </v-col>
    <!-- right -->
    <v-col cols="12" sm="6" md="6" lg="6" xl="6" class="RightArea">
      <v-row style="height: 100%">
        <v-col cols="12" style="height: 100%">
          <GraphChart :date-time="dateTime" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import SelectArea from '@/components/index/SelectArea.vue'
import TextArea from '@/components/index/TextArea.vue'
import GraphChart from '@/components/index/GraphChart.vue'

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
  }
}
</script>
