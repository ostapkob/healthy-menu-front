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
        :color="category.color"
        to="/categories"
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
      <v-divider class="mx-4"></v-divider>
      <v-card-text>
        {{ description }}
      </v-card-text>
      <v-divider class="mx-4"></v-divider>
      <v-card-title> Products usefool for {{ category.title }} </v-card-title>
      <v-card-text>
        <v-chip-group active-class="accent-4 white--text" column>
          <v-chip
            :class="category.color"
            v-for="product of products"
            :key="product"
          >
            {{ product }}
          </v-chip>
        </v-chip-group>
        <v-chip-group active-class="deep-purple accent-4 white--text" column>
          <v-chip v-for="food of category.foods" :key="food.id">
            {{ food.title }}
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
    <add-category v-if="edit" :category="category" />
  </section>
</template>

<script>
import { ip } from "@/config/config";
import { arrayBufferToBase64 } from "@/functions/buffer64";
import AddCategory from "./addCategory.vue";

export default {
  components: {
    AddCategory,
  },
  data() {
    return {
      loading: false,
      selection: 0,
      edit: false,
      _id: "",
      title: "",
      description: "",
      products: "",
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
      productsRules: [
        (v) =>
          !!v ||
          (v && v.split(",").length > 1) ||
          "Amout ingredeents must be more then 2",
      ],
    };
  },
  async asyncData({ $axios, params }) {
    const response = await $axios.get(`${ip}/api/category/${params.id}`);
    const category = response.data;
    return { category };
  },
  async mounted() {
    (this.title = this.category.title),
      (this.color = this.category.color),
      (this.description = this.category.description),
      (this.products = this.category.products),
      (this._id = this.category._id);
    if (this.category.image == "undefined") {
      this.file = [];
    } else {
      this.file = this.category.image.data.data;
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
};
</script>