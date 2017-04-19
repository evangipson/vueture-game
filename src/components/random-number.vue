<template>
    <article>
        <div class="columns">
            <div class="columns is-half is-offset-one-quarter">
                <h2 class="subtitle">
                    Random Number Generator
                </h2>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                Your random number is... <em><strong v-cloak>{{randomNumber}}</strong></em>!
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <button class="button content is-info" v-on:click="success">
                    Give me another number!
                </button>
            </div>
        </div>
    </article>
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