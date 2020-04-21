# JournalMd ClientApp

## Project setup

```sh
yarn install
```

### Compiles and hot-reloads for development

```sh
yarn serve
```

### Compiles and minifies for production

```sh
yarn build
```

### Lints and fixes files

```sh
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Docker

### Build the container

```sh
docker build -t journalmd-frontend .
```

### Run the container

```sh
docker run -it -p 8000:80 --rm journalmd-frontend
```

Access the application on [localhost:8000](http://localhost:8000).

## Development

* [Node 12.x](https://github.com/nodesource/distributions/blob/master/README.md)

Add to `~/.zshrc`:

```sh
export PATH="$PATH:`yarn global bin`"
```

Install tools:

```sh
yarn global add @vue/cli
yarn global add @vue/cli-service-global
```

### Generate models from swagger

Windows. Install [swagger-codegen-cli](https://github.com/swagger-api/swagger-codegen/tree/3.0.0) using PowerShell.

```powershell
Invoke-WebRequest -OutFile swagger-codegen-cli.jar https://repo1.maven.org/maven2/io/swagger/codegen/v3/swagger-codegen-cli/3.0.19/swagger-codegen-cli-3.0.19.jar
```

```sh
yarn run generate:specs
```

Copy `src/models/swagger_tmp/model` to `src/models/`

## Resources used

* Logo based on image by [Pettycon](https://pixabay.com/users/Pettycon-3307648/) from [Pixabay](https://pixabay.com/)

* [Awesome Vue](https://github.com/vuejs/awesome-vue)
* [Vue.js](https://vuejs.org/)
* [Vuex](https://vuex.vuejs.org/)
* [Vuetify](https://vuetifyjs.com/en/)
* [cli-plugin-pwa](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa)
* [axios](https://github.com/axios/axios)

* [Cookbook](https://vuejs.org/v2/cookbook/)
* [Vuetify Tutorial #1 - What is Vuetify?](https://www.youtube.com/watch?v=2uZYKcKHgU0&list=PL4cUxeGkcC9g0MQZfHwKcuB0Yswgb3gA5)
* [Todo](https://github.com/IanLuan/TodoDev) - advanced fork from vuetify tutorial above
* [Vue-2-Boilerplate](https://github.com/petervmeijgaard/vue-2-boilerplate)
* [PWA Builder](https://www.pwabuilder.com/)

* TODO check on [vuex-module-decorators](https://github.com/championswimmer/vuex-module-decorators) if stable enough
