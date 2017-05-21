<template>
    <div class="content columns">
        <div class="container column">
            <h1 class="title is-spaced">
                About Vueture
            </h1>
            <p>Hey, welcome to <sup><sup>(the)</sup></sup> Vueture!<sup>(ha<sup>ha<sup>ha)</sup></sup></sup></p>
            <p>Vueture is a real-time multiplayer business game that is written using <a href="https://vuejs.org/">vue.js</a> and <a href="https://firebase.google.com/">firebase</a>. The aim of the game is to buy businesses cheap and grow them by hiring great staff, although that can get costly!</p>
            <h3>Resources</h3>
            <ul>
                <li><router-link to="/login">Login</router-link>/<router-link to="/register">Register</router-link></li>
                <li><a href="https://github.com/evangipson/vueture-game/wiki">Vueture Wiki</a></li>
                <ul>
                    <li><a href="https://github.com/evangipson/vueture-game/wiki/strategies">Strategy Guides</a></li>
                    <li><a href="https://github.com/evangipson/vueture-game/wiki/setup">Vueture Local Setup</a></li>
                    <li><a href="https://github.com/evangipson/vueture-game/wiki/contributing">Contributing to Vueture</a></li>
                </ul>
                <li>External Links</li>
                <ul>
                    <li><a href="http://evangipson.com">Evan's Website</a></li>
                    <li><a href="https://github.com/evangipson">Evan's GitHub</a></li>
                </ul>
            </ul>
            <h3>Frequently Asked Questions</h3>
            <p><em>What is this game about?</em></p>
            <blockquote>It's a business simulation game, with the hopes of being fun for multiple people at once.</blockquote>
            <p><em>How'd you get this idea?</em></p>
            <blockquote>Playing <a href="http://www.greenheartgames.com/app/game-dev-tycoon/">Game Dev Tycoon</a>. If you haven't played it yet, play it.</blockquote>
            <p><em>What is your favorite color?</em></p>
            <blockquote>Green, no doubt. Interesting question.</blockquote>
            <p><em>Which businesses should I buy?</em></p>
            <blockquote>I'd check the <a href="https://github.com/evangipson/vueture-game/wiki">Vueture wiki</a>.</blockquote>
        </div>
    </div>
</template>

<!-- Set up our export -->
<script>
export default {
    data () {
        return {
        };
    }
}
</script>