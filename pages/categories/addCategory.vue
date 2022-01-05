<template>
  <div>
    <form @submit="post" lazy-validation>
      <v-container>
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="title"
              :rules="titleRules"
              counter="30"
              hint="How call you category"
              label="Name"
              clearable
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-select
              v-model="color"
              :items="colors"
              :rules="[(v) => !!v || 'Item is required']"
              label="Color"
              required
            ></v-select>
          </v-col>
          <v-col cols="12" sm="4">
            <v-file-input
              required
              accept="image/*"
              label="Photo"
              v-model="file"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12">
            <v-textarea
              label="Descripton"
              v-model="description"
              :rules="descriptionRules"
              required
              clearable
            >
              <template v-slot:label> </template>
            </v-textarea>
            <v-textarea
              label="Products"
              v-model="products"
              placeholder="insert comma separated"
              :rules="productsRules"
              required
              clearable
            ></v-textarea>

            <v-btn
              type="submit"
              depressed
              small
              class="indigo white--text"
              to="/category/"
            >
              <v-icon color="white darken-2" left> mdi-pencil-minus </v-icon>
              <span> Cancel </span>
            </v-btn>
            <v-btn
              type="submit"
              v-if="!category"
              depressed
              small
              class="warning white--text"
            >
              <v-icon color="white darken-2" left> mdi-arrow-right-box </v-icon>
              <span> Sent </span>
            </v-btn>
            <v-btn
              @click="put"
              v-if="category"
              depressed
              small
              class="warning white--text"
            >
              <v-icon color="white darken-2" left> mdi-arrow-right-box </v-icon>
              <span> Update </span>
            </v-btn>
            <v-btn @click="clear" depressed small class="success white--text">
              <v-icon color="white darken-2" left> mdi-cached </v-icon>
              <span> Clear </span>
            </v-btn>
            <v-btn
              @click="del"
              v-if="category"
              depressed
              small
              class="pink white--text"
            >
              <v-icon color="white darken-2" left> mdi-delete </v-icon>
              <span> Delete </span>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </form>
    <!-- <div class="pa-4">
      <v-chip-group active-class="primary--text" column>
        <v-chip v-for="tag in itemsSplit" :key="tag">
          {{ tag }}
        </v-chip>
      </v-chip-group>
    </div> -->
  </div>
</template>
<script>
import { ip } from "@/config/config";
export default {
  props: {
    category: Object,
  },
  data: () => ({
    file: [], // TODO add imgURL
    title: "",
    description: "",
    color: "",
    products: "",
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
    productsRules: [
      (v) =>
        !!v ||
        (v && v.split(",").length > 1) ||
        "Amout ingredeents must be more then 2",
    ],
    colors: [
      "red",
      "pink",
      "purple",
      "deep-purple",
      "indigo",
      "blue",
      "light-blue",
      "cyan",
      "teal",
      "green",
      "light-green",
      "lime",
      "yellow",
      "amber",
      "orange",
      "deep-orange",
      "brown",
      "blue-grey",
      "grey",
    ],
  }),
  async mounted() {
    if (this.category) {
      (this.title = this.category.title),
        (this.description = this.category.description),
        (this.color = this.category.color),
        (this.products = this.category.products),
        (this._id = this.category._id);
      this.file = this.category.file;
    }
  },
  methods: {
    post() {
      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("color", this.color);
      formData.append("description", this.description);
      formData.append("products", this.products);
      formData.append("image", this.file);
      this.$axios
        .post(ip + "/api/category", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (response) {
          console.log(response);
          this.$router.push(`/category`);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    put() {
      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("color", this.color);
      formData.append("description", this.description);
      formData.append("products", this.products);
      formData.append("image", this.file);
      formData.append("id", this._id);
      this.$axios
        .put(`${ip}/api/category/${this._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (response) {
          console.log(response);
          this.$router.push(`/category`);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    clear() {
      this.file = [];
      this.title = "";
      this.color = "";
      this.description = "";
      this.products = [];
    },
    del() {
      this.$axios
        .delete(`${ip}/api/category/${this._id}`)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      this.$router.push(`/category`);
    },
  },
  computed: {
    // itemsSplit: function () {
    //   let items = this.products;
    //   let result = [];
    //   if (items) {
    //     for (let item of items.split(",")) {
    //       item && result.push(item.trim());
    //     }
    //     return result;
    //   }
    //   return "";
    // },
  },
};
</script>

