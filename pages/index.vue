<template></template>
<template>
  <section>
    <v-container>
      <v-card class="mx-auto" max-width="1200">
        <v-container class="py-0">
          <h2>Hello friend!</h2>
          <h4 class="my-1">On this site you can choose dish by categories</h4>
          <v-row align="center" justify="start">
            <v-col
              v-for="(selection, i) in selections"
              :key="selection.title"
              class="shrink"
            >
              <v-chip
                :disabled="loading"
                close
                @click:close="selected.splice(i, 1)"
                :class="selection.color + ' lighten-3'"
              >
                <v-avatar left>
                  <v-img
                    :src="`data:image/png;base64,${arrayToBase64(
                      selection.image.data.data
                    )}`"
                  >
                  </v-img>
                </v-avatar>
                {{ selection.title }}
              </v-chip>
            </v-col>
          </v-row>
        </v-container>

        <v-list>
          <template v-for="item in items">
            <v-list-item
              v-if="!selected.includes(item)"
              :key="item.title"
              :disabled="loading"
              @click="selected.push(item)"
            >
              <v-list-item-avatar>
                <v-img
                  :disabled="loading"
                  :src="`data:image/png;base64,${arrayToBase64(
                    item.image.data.data
                  )}`"
                >
                </v-img>
              </v-list-item-avatar>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item>
          </template>
        </v-list>
        <v-divider></v-divider>
        <!-- <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="!selected.length"
            :loading="loading"
            color="purple"
            text
            @click="next"
          >
            Next
          </v-btn>
        </v-card-actions> -->
      </v-card>
    </v-container>
    <index-food :selectedTitle="selectedTitle" />
  </section>
</template>
<script>
import { arrayBufferToBase64 } from "@/functions/buffer64";
import indexFood from "./foods/index.vue";
export default {
  components: {
    indexFood,
  },
  async fetch({ store }) {
    if (store.getters["categories/categories"].length === 0) {
      await store.dispatch("categories/fetch");
    }
  },
  data: () => ({
    items: [],
    loading: false,
    selected: [],
  }),
  computed: {
    categories() {
      return this.$store.getters["categories/categories"];
    },
    selections() {
      const selections = [];
      for (const selection of this.selected) {
        selections.push(selection);
      }
      return selections;
    },
    selectedTitle() {
      let result = [];
      for (let category of this.selected) {
        result.push(category.title);
      }
      return result;
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
    arrayToBase64(data) {
      return arrayBufferToBase64(data);
    },
    // next() {
    //   this.loading = true;
    //   setTimeout(() => {
    //     this.selected = [];
    //     this.loading = false;
    //   }, 2000);
    // },
  },
  watch: {},
  async mounted() {
    this.items = this.categories;
  },
};
</script>