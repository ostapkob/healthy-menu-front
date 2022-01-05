<template>
<v-app>

  <div>
    <navigation class="mb-3"/>
    <main>
      <div class="container">
        <nuxt />
      </div>
    </main>
  </div>
</v-app>
</template>


<script>
export default {
  data() {
    return {
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard" },
        { title: "Photos", icon: "mdi-image" },
        { title: "About", icon: "mdi-help-box" },
      ],
      right: null,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>