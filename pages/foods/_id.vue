<template>
  <section>
    <v-card
      v-if="!edit"
      :loading="loading"
      class="mx-auto my-2"
      max-width="550"
    >
      <v-btn
        class="ml-3 mt-3"
        fab
        dark
        small
        absolute
        color="indigo"
        to="/foods"
      >
        <v-icon dark> mdi-arrow-left-drop-circle-outline </v-icon>
      </v-btn>
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>
      <v-img
        height="250"
        :src="`data:image/png;base64,${arrayToBase64(file)}`"
      ></v-img>
      <v-card-title> {{ title }}</v-card-title>
      <v-card-text>
        <div class="my-4 text-subtitle-1">₽ {{ price }} - {{ weight }} gr.</div>
        <ul>
          <li v-for="ingredient of ingredients.split(',')" :key="ingredient">
            {{ ingredient }}
          </li>
        </ul>
      </v-card-text>
      <v-divider class="mx-4"></v-divider>

      <v-card-text>
        {{ description }}
      </v-card-text>
      <v-divider class="mx-4"></v-divider>
      <v-card-title> Food usefool for:</v-card-title>
      <v-card-text>
        <v-chip-group active-class="deep-purple accent-4 white--text" column>
          <v-chip v-for="category of food.categories" :key="category.id">
            {{ category.title }}
          </v-chip>
        </v-chip-group>
      </v-card-text>
      <v-card-actions>
        <v-btn
          @click="edit = !edit"
          v-if="!edit"
          depressed
          small
          class="indigo lighten-2 white--text"
          mt-3
        >
          <v-icon color="white darken-2" left> mdi-pencil-plus </v-icon>
          <span> Edit </span>
        </v-btn>
      </v-card-actions>
    </v-card>
    <add-food v-if="edit" :food="food" />
  </section>
</template>

<script>
import { ip } from "@/config/config";
import { arrayBufferToBase64 } from "@/functions/buffer64";
import AddFood from "./addFood.vue";

export default {
  components: {
    AddFood,
  },
  data() {
    return {
      loading: false,
      selection: 0,
      edit: false,
      _id: "",
      title: "",
      description: "",
      price: "",
      ingredients: "",
      weight: "",
      file: [],
      titleRules: [
        (v) => !!v || "Title is reqired",
        (v) => (v && v.length >= 2) || "Title must be more than 2 characters",
      ],
      descriptionRules: [
        (v) => !!v || "Description is reqired",
        (v) => (v && v.length >= 3) || "Title must be more than 3 characters",
        (v) =>
          (v && v.length <= 1000) || "Title must be less than 1000 characters",
      ],
      numberRules: [
        (v) => !!v || "Field must be not Null",
        (v) => !isNaN(Number(v)) || "Price not number - " + !isNaN(Number(v)),
      ],
      ingredientsRules: [(v) => !!v || "Amout ingredeents must be more then 2"],
    };
  },
  async asyncData({ $axios, params }) {
    const response = await $axios.get(`${ip}/api/food/${params.id}`);
    const food = response.data;
    return { food };
  },

  async mounted() {
    (this.title = this.food.title),
      (this.description = this.food.description),
      (this.price = this.food.price),
      (this.ingredients = this.food.ingredients.join(",")),
      (this.weight = this.food.weight),
      (this._id = this.food._id);
    if (this.food.image == "undefined") {
      this.file = [];
    } else {
      this.file = this.food.image.data.data;
    }
  },
  methods: {
    reserve() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    },
    arrayToBase64(data) {
      return arrayBufferToBase64(data);
    },
  },
  computed: {
    // ingredientsSplit: () => {
    // return ["Rice or kiribath", "vegetable1", "curry", "spices", "chili peppers", "cardamom", "cumin", "coriander"]
    // },
  },
};
</script>