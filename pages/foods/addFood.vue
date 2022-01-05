<template>
  <div>
    <form @submit="post" lazy-validation>
      <v-container>
        <v-row>
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="title"
              :rules="titleRules"
              counter="30"
              hint="How call you food"
              label="Name"
              clearable
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="price"
              :rules="numberRules"
              hint="This field should contain only the number"
              label="Price"
              clearable
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="weight"
              :rules="numberRules"
              hint="This field should contain only the number"
              label="Gramms"
              clearable
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-file-input accept="image/*" label="Photo" v-model="file" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12">
            <v-textarea
              v-model="description"
              :rules="descriptionRules"
              clearable
              required
            >
              <template v-slot:label>
                <div>Description</div>
              </template>
            </v-textarea>

            <v-text-field
              label="Ingredients"
              v-model="ingredients"
              :rules="ingredientsRules"
              placeholder="insert comma separated"
              clearable
              required
            ></v-text-field>
            <v-btn
              type="submit"
              depressed
              small
              class="indigo white--text"
              to="/foods/"
            >
              <v-icon color="white darken-2" left> mdi-pencil-minus </v-icon>
              <span> Cancel </span>
            </v-btn>
            <v-btn
              type="submit"
              v-if="!food"
              depressed
              small
              class="warning white--text"
            >
              <v-icon color="white darken-2" left> mdi-arrow-right-box </v-icon>
              <span> Sent </span>
            </v-btn>
            <v-btn
              @click="put"
              v-if="food"
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
              v-if="food"
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
  </div>
</template>

<script>
import { ip } from "@/config/config";
export default {
  props: {
    food: Object,
  },
  data() {
    return {
      valid: true,
      title: "",
      description: "",
      price: "",
      ingredients: [],
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
      ingredientsRules: [
        (v) =>
          !!v ||
          v.split(",").length > 1 ||
          "Amout ingredeents must be more then 2",
      ],
    };
  },
  async mounted() {
    if (this.food) {
      (this.title = this.food.title),
        (this.description = this.food.description),
        (this.price = this.food.price),
        (this.ingredients = this.food.ingredients.join(",")),
        (this.weight = this.food.weight),
        (this._id = this.food._id);
      this.file = this.food.file;
    }
  },
  methods: {
    post() {
      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("price", this.price);
      formData.append("weight", this.weight);
      formData.append("description", this.description);
      formData.append("ingredients", this.ingredients);
      formData.append("image", this.file);
      this.$axios
        // .post(ip + "/api/food", formData, {
        .post(ip + "/api/food", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (response) {
          console.log(response);
          this.$router.push(`/foods`);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    put() {
      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("price", this.price);
      formData.append("weight", this.weight);
      formData.append("description", this.description);
      formData.append("ingredients", this.ingredients);
      formData.append("image", this.file);
      formData.append("id", this._id);
      this.$axios
        // .post(ip + "/api/food", formData, {
        .put(`${ip}/api/food/${this._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (response) {
          console.log(response);
          this.$router.push(`/foods`);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    clear() {
      this.title = "";
      this.description = "";
      this.price = "";
      this.ingredients = [];
      this.weight = "";
      this.file = [];
    },
    del() {
      this.$axios
        .delete(`${ip}/api/food/${this._id}`)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      this.$router.push(`/foods`);
    },
    validate() {
      this.$refs.form.validate();
    },
  },
};
</script>