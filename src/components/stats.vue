<template>
    <section class="section">
        <div class="container content">
            <div class="heading">
                <h1 class="title">Statistics Page</h1>
            </div>
            <ul>
                <li>Stats will be here</li>
            </ul>
        </div>
    </section>
</template>

<script>
import database from "../js/db"

var goldRef = database.firebaseInterface.db.ref("/gold");

export default {
    data() {
        return {
            goldRef : goldRef
        }
    }
}
</script>