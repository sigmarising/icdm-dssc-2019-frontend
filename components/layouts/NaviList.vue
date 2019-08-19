<template>
  <v-list nav shaped>
    <!-- subheader -->
    <v-subheader>MENU</v-subheader>
    <v-divider></v-divider>
    <!-- nav link list -->
    <v-list-item-group v-model="linkItem" color="primary">
      <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" exact>
        <v-list-item-icon>
          <v-icon v-text="item.icon"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  data() {
    return {
      // the v-model var
      linkItem: 0,
      // the linked list item nav
      items: [
        { text: 'Index Page', icon: 'mdi-home', to: '/' },
        { text: 'About', icon: 'mdi-at', to: '/about' }
      ]
    }
  }
}
</script>
