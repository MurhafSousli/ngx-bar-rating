<p align="center">
  <img height="150px" width="150px" style="text-align: center;" src="https://cdn.rawgit.com/MurhafSousli/ngx-rating/master/assets/logo.svg">
  <h1 align="center">Angular Rating</h1>
</p>

[![npm](https://img.shields.io/badge/demo-online-ed1c46.svg)](https://murhafsousli.github.io/ngx-rating/)
[![npm](https://img.shields.io/npm/v/ngx-rating.svg)](https://github.com/MurhafSousli/ngx-rating)
[![Build Status](https://travis-ci.org/MurhafSousli/ngx-rating.svg)](https://travis-ci.org/MurhafSousli/ngx-rating)
[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](/LICENSE)

## Installation

Install it with npm

`npm install --save ngx-rating`

### SystemJS

If you are using SystemJS, you should also adjust your configuration to point to the UMD bundle.

In your systemjs config file, map needs to tell the System loader where to look for ngx-rating:

```
map: {
  'ngx-rating': 'node_modules/ngx-rating/bundles/ngx-rating.umd.js',
}
```

## Basic usage:

Import `RatingModule` in the root module

```ts
import { RatingModule } from "ngx-rating";
@NgModule({
  imports: [
    // ...
    RatingModule
  ]
})
```

Add Rating component

```html
<Rating></Rating>
```

## Issues

If you identify any errors in this component, or have an idea for an improvement, please open an [issue](https://github.com/MurhafSousli/ngx-rating/issues). I am excited to see what the community thinks of this project, and I would love your input!

## Author

 **Murhaf Sousli**

 - [github/murhafsousli](https://github.com/MurhafSousli)
 - [twitter/murhafsousli](https://twitter.com/MurhafSousli)

