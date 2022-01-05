<template>
    <v-tabs   >
      <v-tab class="justify-start" >
        <v-icon left>
          mdi-plus-circle
        </v-icon>
        Food
      </v-tab>
      <v-tab class="justify-start" >
        <v-icon left>
          mdi-plus-circle
        </v-icon>
        Category
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
              <add-food />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <add-category />
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
</template>
<script>
import AddCategory from './categories/addCategory.vue'
import AddFood from './foods/addFood.vue'
export default {
  components: {
    AddCategory,
    AddFood,
  },
}
</script>