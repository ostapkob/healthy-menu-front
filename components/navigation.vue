<template>
  <v-row>
    <v-toolbar class="indigo mt-2" dark>
      <v-toolbar-title class="mr-1">Menu</v-toolbar-title>
      <v-divider vertical></v-divider>
      <v-toolbar-items v-for="item in menuItems" :key="item.title">
        <v-btn text :to="item.path">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-divider vertical></v-divider>
      </v-toolbar-items>

      <v-spacer></v-spacer>
      <v-btn icon class="mr-8" to="/add">
        <v-icon> mdi-plus-circle </v-icon>
      </v-btn>
    </v-toolbar>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    sidebar: false,
    menuItems: [
      { title: "Home", path: "/", icon: "mdi-home" },
      { title: "Foods", path: "/foods", icon: "mdi-bowl-mix" },
      { title: "Categories", path: "/categories", icon: "mdi-view-list" },
    ],
  }),
};
</script>