<template>
    <article>
        <p>Your random number is... <em><strong v-cloak>{{randomNumber}}</strong></em>!</p>
        <div class="submit-button">
            <button class="button content is-info" v-on:click="success">
                Give me another number!
            </button>
        </div>
    </article>
</template>

<!-- Set up our export -->
<script>
import * as Utils from "../ts/utilities";

function generateLargeRandomNumber() {
    return Utils.random(-1383574.1,13135030);
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