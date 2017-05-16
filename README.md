<p align="center">
  <img height="150px" width="150px" style="text-align: center;" src="https://cdn.rawgit.com/MurhafSousli/ngx-bar-rating/af32c04d/assets/logo.svg">
  <h1 align="center">Angular Bar Rating</h1>
  <p align="center">Minimal, light-weight Angular ratings.</p>
</p>

[![npm](https://img.shields.io/badge/demo-online-ed1c46.svg)](https://murhafsousli.github.io/ngx-bar-rating)
[![npm](https://img.shields.io/npm/v/ngx-bar-rating.svg)](https://www.npmjs.com/package/ngx-bar-rating)
[![Build Status](https://travis-ci.org/MurhafSousli/ngx-bar-rating.svg)](https://travis-ci.org/MurhafSousli/ngx-bar-rating)
[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](/LICENSE)

___

## Table of Contents 
 
 - [Live Demo](https://MurhafSousli.github.io/ngx-bar-rating)
 - [Installation](#installation)
 - [Usage](#usage) 
 - [Options](#options)
 - [Themes](#themes)
 - [Issues](#issues) 
 - [Author](#author)

<a name="installation"/>

## Installation

Install it with npm

`npm install --save ngx-bar-rating`

### SystemJS

If you are using SystemJS, you should also adjust your configuration to point to the UMD bundle.

In your systemjs config file, map needs to tell the System loader where to look for ngx-bar-rating:

```
map: {
  'ngx-bar-rating': 'node_modules/ngx-bar-rating/bundles/ngx-bar-rating.umd.js',
}
```
Here is a working [plunkr](https://plnkr.co/edit/ZLSw4BV3ejRYkuWWAmoF?p=preview)

<a name="usage"/>

## Basic usage:

Import `BarRatingModule` in the root module

```ts
import { BarRatingModule } from "ngx-bar-rating";

@NgModule({
  imports: [
    // ...
    BarRatingModule
  ]
})
```

In your template

```html
<bar-rating [(rate)]="rate" [max]="5"></bar-rating>
```

<a name="options"/>

## Rating options (inputs):

 - **[rate]**: Current rating. Can be a decimal value like 3.14, default `undefined`.

 - **[max]**: Maximal rating that can be given using this widget, default `5`

 - **[readOnly]**: A flag indicating if rating can be updated, default `false`

 - **[theme]**: Theme class. default `default`, see available [themes](#themes).

 - **[showText]**: Display rating title if set, otherwise display rating value, default `false`.

 - **[titles]**: Titles array. array length should be equal to the `max` value, each index represents the rating title, default `[]`.

 - **[required]**: A flag indicating if rating is required for form validation. default `false`.

 - **[disabled]**: A flag indicating if rating is disabled. works only with forms, default `false`.

 - **(rateChange)**: An event fired when a user selects a new rating.

   *Event's payload equals to the newly selected rating.*

 - **(hover)**: An event fired when a user is hovering over a given rating.

   *Event's payload equals to the rating being hovered over.*

 - **(leave)**: An event fired when a user stops hovering over a given rating.

   *Event's payload equals to the rating of the last item being hovered over.*


#### Movie rating example

```html
<bar-rating [(rate)]="rate" [max]="4" [theme]="'movie'" [showText]="true"
 [titles]="['Bad', 'Mediocre' , 'Good', 'Awesome']"></bar-rating>
```

It can be used with angular forms and reactive forms, for example:

```html
<form #form="ngForm">
  <bar-rating name="rating" [(ngModel)]="formRating" [max]="4" required disabled></bar-rating>
</form>
<p>form is valid: {{ form.valid ? 'true' : 'false' }}</p>
<pre>{{ formRating }}</pre>
```

<a name="themes"/>

## Predefined themes

Add the rating theme either in `index.html`

```html
<link rel="stylesheet" href="../node_modules/ngx-bar-rating/themes/br-default-theme.css"/>
```

Or in the global style `style.scss` (recommended)


 - Pure css stars (default) `[theme]="'default'"`

```css
@import '~ngx-bar-rating/themes/br-default-theme'
```

 - Bootstrap stars `[theme]="'bootstrap'"`

```css
@import '~ngx-bar-rating/themes/br-bootstrap-theme';
```

- Fontawesome stars `[theme]="'fontawesome'"`

```css
@import '~ngx-bar-rating/themes/br-fontawesome-theme';
```

 - Fontawesome-o stars `[theme]="'fontawesome-o'"`

```css
@import '~ngx-bar-rating/themes/br-fontawesome-o-theme';
```

 - Horizontal bars `[theme]="'horizontal'"`

```css
@import '~ngx-bar-rating/themes/br-horizontal-theme';
```

 - Vertical bars `[theme]="'vertical'"`

```css
@import '~ngx-bar-rating/themes/br-vertical-theme';
```

 - Custom stars `[theme]="'stars'"`

```css
@import '~ngx-bar-rating/themes/br-stars-theme';
```

 - Movie rating `[theme]="'movie'"`
```css
@import '~ngx-bar-rating/themes/br-movie-theme';
```

 - Square rating `[theme]="'square'"`

```css
@import '~ngx-bar-rating/themes/br-square-theme';
```

Rating style can be easily customized, check the classes used in any theme and add your own css.

You can also do the same for forms classes such as `untouched, touched, dirty, invalid, valid ...etc`

*If you have a nice rating style you would like to share, prupose your theme and I will include it in the package.*


## Issues

If you identify any errors in this component, or have an idea for an improvement, please open an [issue](https://github.com/MurhafSousli/ngx-bar-rating/issues). I am excited to see what the community thinks of this project, and I would love your input!

## Author

 **Murhaf Sousli**

 - [github/murhafsousli](https://github.com/MurhafSousli)
 - [twitter/murhafsousli](https://twitter.com/MurhafSousli)

