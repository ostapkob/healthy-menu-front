<template>
  <div class="my-3">
    <template>
      <v-card class="mx-auto" max-width="344" elevation="6">
        <div center href="#" @click.prevent="openLink(category._id)">
          <v-img
            :class="'img ' + category.color + ' lighten-4'"
            max-height="300"
            :src="`data:image/png;base64,${arrayToBase64(file)}`"
          ></v-img>
          <v-card-title :class="category.color">
            {{ category.title }}
          </v-card-title>
        </div>
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
    category: Object,
  },

  methods: {
    arrayToBase64(data) {
      return arrayBufferToBase64(data);
    },
    reserve() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    },
    openLink(category) {
      this.$router.push(`/categories/${category}`);
    },
  },
  computed: {
    file() {
      if (this.category.image == "undefined") {
        return [];
      }
      return this.category.image.data.data;
    },
  },
};
</script>

<style scoped>
.img {
  cursor: pointer;
}
</style>