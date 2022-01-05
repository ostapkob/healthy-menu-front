<template>
  <section>
    <v-container>
      <v-row no-gutters>
        <template v-for="[n, food] of foods.entries()">
          <v-col :key="n">
            <div v-if="food.title">
              <food :food="food" class="mx-3" />
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
  props: {
    selectedTitle: {
      default() {
        return false;
      },
    },
  },
  async fetch({ store }) {
    if (store.getters["foods/foods"].length === 0) {
      await store.dispatch("foods/fetch");
    }
  },
  data: () => ({}),
  computed: {
    foods() {
      let foods = this.$store.getters["foods/foods"];
      if (this.selectedTitle.length > 0) {
        let filterFoods = [];
        for (let food of foods) {
          for (let category of food.categories) {
            if (this.selectedTitle.includes(category.title)) {
              filterFoods.push(food)
              break
            }
          }
        }
        return filterFoods
      }
      return foods;
      // category.products.filter(x => food.ingredients.includes(x));
    },
    filterFoods() {},
  },
  async mounted() {
    this.$store.dispatch("foods/fetch");
  },
  methods: {
    reserve() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    },
    openLink(food) {
      this.$router.push(`/foods/${food}`);
    },
  },
};
</script>