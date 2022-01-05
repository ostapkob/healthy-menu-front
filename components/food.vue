<template>
  <div class="my-3">
    <template>
      <v-card class="mx-auto" max-width="344" elevation="6">
        <div food href="#" @click.prevent="openLink(food._id)">
          <div
           v-if="food.image">
            <v-img
              class="img"
              height="200"
              width="1000"
              :src="`data:image/png;base64,${arrayToBase64(file)}`"
            ></v-img>
          </div>
          <v-card-title>
            {{ food.title }}
          </v-card-title>
        </div>
        <v-card-subtitle>
          ₽ {{ food.price }} - {{ food.weight }} gr.
        </v-card-subtitle>

        <div class="py-2 pl-3">
          <span
            class="mx-1"
            v-for="category of food.categories"
            :key="category.id"
          >
            <v-tooltip top :color="category.color">
              <template v-slot:activator="{ on, attrs }">
                <v-avatar
                  :color="category.color + ' lighten-3'"
                  v-bind="attrs"
                  v-on="on"
                  size="35"
                >
                  <img
                    :src="`data:image/png;base64,${arrayToBase64(
                      category.image.data.data
                    )}`"
                    alt="category.title"
                  />
                </v-avatar>
              </template>
              <span>{{ category.title }}</span>
            </v-tooltip>
          </span>
        </div>
        <v-divider class="mx-4 mt-2"></v-divider>
        <v-card-actions>
          <v-btn color="indigo lighten-2" text> Ingridients </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="show">
            <v-card-text>
              <ul>
                <li v-for="ingredient of food.ingredients" :key="ingredient">
                  {{ ingredient }}
                </li>
              </ul>
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </template>
  </div>
</template>



<script>
import { arrayBufferToBase64 } from "@/functions/buffer64";
export default {
  data: () => ({
    show: false,
    loading: false,
    selection: 1,
  }),
  props: {
    food: Object,
  },

  methods: {
    arrayToBase64(data) {
      return arrayBufferToBase64(data);
    },
    reserve() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    },
    openLink(food) {
      this.$router.push(`/foods/${food}`);
    },
  },
  computed: {
    file() {
      if (this.food.image == "undefined") {
        return [];
      }
      return this.food.image.data.data;
    },
  },
};
</script>

<style scoped>
.img {
  cursor: pointer;
}
</style>