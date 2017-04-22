<template>
    <section class="section">
        <div class="container content">
            <div class="heading">
                <h1 class="title">Statistics Page</h1>
            </div>
            <ul>
                <li v-for="gold in goldRef">{{ gold['.key'] }}: {{ gold['.value'] }}</li>
            </ul>
        </div>
    </section>
</template>

<script>
import database from "../js/db"

export default {
    firebase: {
        // can bind to either a direct Firebase reference or a query
        goldRef: database.firebaseInterface.db.ref("/gold")
    },
    data() {
        return {
        }
    }
}
</script>