# Vueture
vueture is a real-time multiplayer business game that is written using vue.js and firebase.

| Vueture Readme |
|---|
| [Getting Started](#getting-started) |
| [Built With](#built-with) |
| [Contributing Code](#contributing-code)  |
| [Versioning](#versioning) |
| [Authors](#authors)  |
| [License](#license) |

## Getting Started
If you want a local copy of vueture, follow these steps:
- Fork the repository
- Open up a console in the directory and type ```npm install```.
  - This will download the necessary packages through Node (which you need to install for npm anyways).
- Instal webpack on your machine globally with ```npm install webpack -g```
- Type ```gulp``` to run the default gulp task (which also triggers a webpack build) and build your local copy of vueture.
- View the local copy by looking at the index.html file in Chrome.

## Built With
* SCSS
* JavaScript
  * [Vue.js](https://vuejs.org/)
  * [vue-router](https://router.vuejs.org/en/essentials/getting-started.html)
* [Firebase](https://firebase.google.com/)
* HTML
* [Visual Studio Code](https://code.visualstudio.com/)
* Google Chrome
* [Webpack](https://webpack.github.io/)

## Contributing Code
Have a look at the [issues with vueture](https://github.com/evangipson/vueture/issues), and create a pull request containing your code so it can be reviewed be merged into the source!

I will run all new javascript through [JSHint](http://jshint.com/) before merging into master.

## Versioning
vueture is maintained using a 3-digit versioning system, represented by:
```
[Major Version].[Minor Version].[Update]
```
For instance, the first stable build of vueture will be 1.0.0.

## Authors
* **Evan Gipson** - *[Evan's Website](https://evangipson.com/)*

## License
This project is licensed under the MIT License.
```
Copyright (c) 2017 EVAN GIPSON

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```