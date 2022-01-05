<template>
  <section>
    <v-container>
      <v-row no-gutters>
        <template v-for="[n, category] of categories.entries()">
          <v-col :key="n">
            <div v-if="category.title">
              <category :category="category" class="mx-3" />
            </div>
          </v-col>
          <v-responsive
            v-if="(n + 1) % 2 == 0"
            :key="`width-${n}`"
            width="100%"
          ></v-responsive>
        </template>
      </v-row>
    </v-container>
  </section>
</template>


<script>

export default {
  async fetch({ store }) {
    if (store.getters["categories/categories"].length === 0) {
      await store.dispatch("categories/fetch");
    }
  },
  data: () => ({
  }),
  computed: {
    categories() {
      return this.$store.getters["categories/categories"];
    },
  },
  methods: {
    reserve() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    },
    openLink(category) {
      this.$router.push(`/category/${category}`);
    },
  },
  async mounted() {},
};
</script>