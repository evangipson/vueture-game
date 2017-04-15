<template>
    <section class="columns">
        <div class="column is-three-quarters">
            <h1 class="title">
                Random Number Generator
            </h1>
            <h2 class="subtitle">
                Your random number is... <em><strong v-cloak>{{randomNumber}}</strong></em>!
            </h2>
        </div>
        <div class="column">
            <button class="button content is-info" v-on:click="success">
                Give me another number!
            </button>
        </div>
    </section>
</template>

<!-- Set up our export -->
<script>
import utils from "../js/utilities"
function generateLargeRandomNumber() {
    return utils.random(-1383574.1,13135030);
};
export default {
    methods: {
        success() {
            this.randomNumber = generateLargeRandomNumber();
            this.$toast.open({
                message: 'New number generated!',
                type: 'is-info'
            })
        }
    },
    computed: {
        randomNumber: {
            get: function() {
                return generateLargeRandomNumber()
            },
            set: this.get
        }
    },
    data () {
        return {
            randomNumber: generateLargeRandomNumber()
        }
    }
}
</script>