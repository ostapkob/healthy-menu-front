<template>
    <section>
        <div v-if="$route.query.message" class="alert alert-danger">
            Need login firs
        </div>
        <form @submit.prevent="onSubmit">
            <h2> Login Page</h2>
            <div class="form-group">
                <input type="text" class="form-control">
            </div>
            <p>
                <nuxt-link to="/"> To Home page </nuxt-link>
            </p>
            <button class="btn btn-primary" type="submit"> Login </button>
        </form>
    </section>
</template>
<script>
export default {
    layout: "empty",
    methods: {
        onSubmit() {
            this.$store.dispatch('login')
            this.$router.push('/')
        }
    }
}
</script>
<style scoped>
    form {
        width: 500px;
        margin: 0 auto;
    }
</style>