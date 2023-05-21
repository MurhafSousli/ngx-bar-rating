<p align="center">
  <img height="150px" width="150px" style="text-align: center;" src="https://cdn.rawgit.com/MurhafSousli/ngx-bar-rating/af32c04d/assets/logo.svg">
  <h1 align="center">Angular Bar Rating</h1>
  <p align="center">Minimal, light-weight Angular ratings.</p>
</p>

[![npm](https://img.shields.io/badge/demo-online-ed1c46.svg)](https://murhafsousli.github.io/ngx-bar-rating)
[![npm](https://img.shields.io/badge/stackblitz-online-orange.svg)](https://stackblitz.com/edit/ngx-bar-rating)
[![npm](https://img.shields.io/npm/v/ngx-bar-rating.svg)](https://www.npmjs.com/package/ngx-bar-rating)
[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](/LICENSE)

___

If you like this plugin, please give it a star ⭐.

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

`npm i ngx-bar-rating`


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

Import the theme (unless you want to use custom template)

```scss
@import '~ngx-bar-rating/themes/br-default-theme';
```

Add the rating in your template

```html
<bar-rating [(rate)]="rate" [max]="5"></bar-rating>
```

<a name="options"/>

## Rating inputs and outputs:

| Name             | Description                                                          | Default |
|------------------|----------------------------------------------------------------------|---------|
| **[rate]**       | Current rating. Can be a decimal value like 3.14                     | null    |
| **[max]**        | Maximal rating that can be given using this widget                   | 5       |
| **[readOnly]**   | A flag that indicates if rating can be changed                       | false   |
| **[theme]**      | Theme class, see available [themes](#themes)                         | default |
| **[showText]**   | Display rating title if set, otherwise display rating value          | false   |
| **[titles]**     | Titles array. array should represent all possible values including 0 | []      |
| **[showText]**   | A flag that indicates if rating is required for form validation      | false   |
| **[required]**   | A flag that indicates if rating is disabled. works only with forms   | false   |
| **[disabled]**   | A flag that indicates if rating is disabled. works only with forms   | false   |
| **(rateChange)** | A stream that emits when the rating value is changed                 |         |
| **(hover)**      | A stream that emits when the rating is hovered                       |         |
| **(leave)**      | A stream that emits when the rating is no longer hovered             |         |

### Custom rating template

The module provides a couple of directives to set custom rating template of your choice.

- `[ratingActive]`: Set template, when a bar/star is active or hovered.
- `[ratingInactive]`: Set template, when a bar/star is inactive.
- `[ratingFraction]`: Set template, when a bar/star is a fraction.

Here are some example:

#### Bootstrap rating example

```html
<bar-rating [(rate)]="rate" [max]="5">
  <ng-template ratingActive>
    <i class="bi bi-star-fill" style="margin: 2px; color: #edb867"></i>
  </ng-template>
  <ng-template ratingInactive>
    <i class="bi bi-star-fill" style="margin: 2px; color: #d2d2d2"></i>
  </ng-template>
</bar-rating>
```

#### FontAwesome rating example

```html
<bar-rating [rate]="rate" (rateChange)="onFaoRate($event)" [max]="10">
  <ng-template ratingInactive>
    <fa-icon [icon]="['far', 'star']" [fixedWidth]="true" size="lg" style="color: #d2d2d2"></fa-icon>
  </ng-template>
  <ng-template ratingActive>
    <fa-icon [icon]="['fas', 'star']" [fixedWidth]="true" size="lg" style="color: #50e3c2"></fa-icon>
  </ng-template>
  <ng-template ratingFraction>
    <fa-icon [icon]="['fas', 'star-half-alt']" [fixedWidth]="true" size="lg" style="color: #50e3c2"></fa-icon>
  </ng-template>
</bar-rating>
```

#### Movie rating example

```html
<bar-rating [(rate)]="rate" [max]="4" [theme]="'movie'" [showText]="true"
            [titles]="['Bad', 'Mediocre' , 'Good', 'Awesome']"></bar-rating>
```

It can be used with Angular forms:

```html
<form #form="ngForm">
  <bar-rating name="rating" [(ngModel)]="formRating" [max]="4" required disabled></bar-rating>
</form>
<p>form is valid: {{ form.valid ? 'true' : 'false' }}</p>
<pre>{{ formRating }}</pre>
```

And reactive forms:

```html
<form [formGroup]="ratingForm">
  <bar-rating formControlName="rate" [max]="4" required disabled></bar-rating>
</form>
<p>form is valid: {{ form.valid ? 'true' : 'false' }}</p>
<pre>{{ formRating }}</pre>
```

## CSS variables

- `--br-font-size` Sets the size of the step for the following themes: [`default`, `square`, `stars`].
- `--br-width` Sets the width of the step for the following themes: [`stars`, `square`, `movie`, `vertical`, `horizontal`].
- `--br-height` Sets the height of the step for the following themes: [`stars`, `square`, `movie`, `vertical`, `horizontal`].
- `--br-gap` Sets the gap between the stars.
- `--br-active-color` Sets active color.
- `--br-inactive-color` Sets inactive color.

<a name="themes"/>

## Predefined themes

> If you want to use a custom rating template, you don't need to import any CSS theme.

If you want to use one of the predefined themes, you will need to import it in the global style `style.scss`

- Pure CSS stars (default) `[theme]="'default'"`

```css
@import '~ngx-bar-rating/themes/br-default-theme';
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

## Issues

If you identify any errors in this component, or have an idea for an improvement, please open
an [issue](https://github.com/MurhafSousli/ngx-bar-rating/issues). I am excited to see what the community thinks of this
project, and I would love your input!

## Author

**Murhaf Sousli**

- [github/murhafsousli](https://github.com/MurhafSousli)
- [twitter/murhafsousli](https://twitter.com/MurhafSousli)

