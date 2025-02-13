<p align="center">
  <img height="150px" width="150px" style="text-align: center;" src="https://cdn.rawgit.com/MurhafSousli/ngx-bar-rating/af32c04d/assets/logo.svg">
  <h1 align="center">Angular Bar Rating</h1>
  <p align="center">Minimal, light-weight Angular ratings.</p>
</p>

[![npm](https://img.shields.io/badge/demo-online-ed1c46.svg)](https://ngx-bar-rating.netlify.app/)
[![npm](https://img.shields.io/badge/stackblitz-online-orange.svg)](https://stackblitz.com/edit/ngx-bar-rating)
[![npm](https://img.shields.io/npm/v/ngx-bar-rating.svg)](https://www.npmjs.com/package/ngx-bar-rating)
[![CI Build](https://github.com/MurhafSousli/ngx-bar-rating/actions/workflows/integrate.yml/badge.svg)](https://github.com/MurhafSousli/ngx-bar-rating/actions/workflows/integrate.yml)[![codecov](https://codecov.io/gh/MurhafSousli/ngx-bar-rating/graph/badge.svg?token=XH3LVM5QS6)](https://codecov.io/gh/MurhafSousli/ngx-bar-rating)
[![Downloads](https://img.shields.io/npm/dt/ngx-bar-rating.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ngx-bar-rating)
[![Monthly Downloads](https://img.shields.io/npm/dm/ngx-bar-rating.svg)](https://www.npmjs.com/package/ngx-bar-rating)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/ngx-bar-rating.svg)](https://bundlephobia.com/result?p=ngx-bar-rating)
[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](/LICENSE)

___

If you like this plugin, please give it a star ⭐.

## Table of Contents

- [Live Demo](https://ngx-bar-rating.netlify.app/)
- [Installation](#installation)
- [Usage](#usage)
- [Options](#options)
- [Click Effect](#click-effect)
- [CSS Variables](#css-variables)
- [Themes](#themes)
- [Issues](#issues)
- [Author](#author)

<a name="installation"/>

## Installation

Install it with npm

```bash
npm i ngx-bar-rating
```


<a name="usage"/>

## Basic usage:

Import `BarRating` or `BarRatingModule` in your component imports.

```ts
@Component({
  standalone: true,
  selector: 'bars',
  template: `
    <bar-rating [(rate)]="rate"/>
  `,
  styleUrl: './example.component.scss',
  imports: [BarRating]
})
export class BarsComponent {
  rate: number = 4;
}
```

Import the theme in your global styles (unless you want to use custom template)

```scss
@import 'ngx-bar-rating/themes/br-default-theme';
```

<a name="options"/>

## Rating inputs and outputs:

| Name             | Description                                                          | Default |
|------------------|----------------------------------------------------------------------|---------|
| **[rate]**       | Current rating. Can be a decimal value like 3.14                     | null    |
| **[max]**        | Maximal rating that can be given using this widget                   | 5       |
| **[theme]**      | Theme class, see available [themes](#themes)                         | default |
| **[readonly]**   | A flag that indicates if rating can be changed                       | false   |
| **[showText]**   | Display rating title if available, otherwise display rating value    | false   |
| **[required]**   | A flag that indicates if rating is disabled. works only with forms   | false   |
| **[disabled]**   | A flag that indicates if rating is disabled. works only with forms   | false   |
| **[titles]**     | Titles array. array should represent all possible values including 0 | []      |
| **(rateChange)** | A stream that emits when the rating value is changed                 |         |

### Custom rating template

`BarRatingModule` provides a couple of directives to set custom rating template of your choice.

- `*ratingActive`: Set template, when a bar/star is active or hovered.
- `*ratingInactive`: Set template, when a bar/star is inactive.
- `*ratingFraction`: Set template, when a bar/star is a fraction.

Here are some example:

#### Bootstrap rating example

```html
<bar-rating [(rate)]="rate" max="5">
  <i *ratingActive class="bi bi-star-fill" style="margin: 2px; color: #edb867"></i>
  <i *ratingInactive class="bi bi-star-fill" style="margin: 2px; color: #d2d2d2"></i>
</bar-rating>
```

#### FontAwesome rating example

```html
<bar-rating [(rate)]="rate" max="10">
  <fa-icon *ratingInactive [icon]="['far', 'star']" [fixedWidth]="true" size="lg" style="color: #d2d2d2"/>
  <fa-icon *ratingActive [icon]="['fas', 'star']" [fixedWidth]="true" size="lg" style="color: #50e3c2"/>
  <fa-icon *ratingFraction [icon]="['fas', 'star-half-alt']" [fixedWidth]="true" size="lg" style="color: #50e3c2"/>
</bar-rating>
```

#### Movie rating example

```html
<bar-rating [(rate)]="rate" max="4" theme="movie" showText
            [titles]="['Bad', 'Mediocre' , 'Good', 'Awesome']"/>
```

It can be used with Angular forms:

```html
<form #form="ngForm">
  <bar-rating name="rating" [(ngModel)]="formRating" [max]="4" required disabled/>
</form>
<p>form is valid: {{ form.valid ? 'true' : 'false' }}</p>
<pre>{{ formRating }}</pre>
```

And reactive forms:

```html
<form [formGroup]="ratingForm">
  <bar-rating formControlName="rate" [max]="4" required disabled/>
</form>
<p>form is valid: {{ form.valid ? 'true' : 'false' }}</p>
<pre>{{ formRating }}</pre>
```

<a name="click-effect"/>

## Click effect

To apply a scale-fade effect when a bar is clicked, simply add the `effect` directive to the `<bar-rating>` component:

```html
<bar-rating effect/>
```

## CSS variables

* `--br-font-size`: Defines the font size for the step element. Affects the themes: [`default`, `square`, `stars`].
* `--br-width`: Specifies the width of the step element. Affects the themes: [`stars`, `square`, `movie`, `vertical`, `horizontal`].
* `--br-height`: Specifies the height of the step element. Affects the themes: [`stars`, `square`, `movie`, `vertical`, `horizontal`].
* `--br-gap`: Sets the gap between the individual steps.
* `--br-active-color`: Defines the color for active steps.
* `--br-inactive-color`: Defines the color for inactive steps.
* `--br-effect-scale`: Specifies the scale value for the scale-fade effect (e.g., `2`).
* `--br-effect-duration`: Sets the duration of the scale-fade animation (e.g., `0.4s`).
* `--br-effect-ease`: Defines the easing function for the scale-fade animation (e.g., `ease-out`).

<a name="themes"/>

## Predefined themes

> If you want to use a custom rating template, you don't need to import any CSS theme.

If you want to use one of the predefined themes, you will need to import it in the global style `style.scss`

- Pure CSS stars (default) `theme="default"`

```css
@import 'ngx-bar-rating/themes/br-default-theme';
```

- Horizontal bars `theme="horizontal"`

```css
@import 'ngx-bar-rating/themes/br-horizontal-theme';
```

- Vertical bars `theme="vertical"`

```css
@import 'ngx-bar-rating/themes/br-vertical-theme';
```

- Custom stars `theme="stars"`

```css
@import 'ngx-bar-rating/themes/br-stars-theme';
```

- Movie rating `theme="movie"`

```css
@import 'ngx-bar-rating/themes/br-movie-theme';
```

- Square rating `theme="square"`

```css
@import 'ngx-bar-rating/themes/br-square-theme';
```

Rating style can be easily customized, check the classes used in any theme and add your own css.

You can also do the same for forms classes such as `untouched, touched, dirty, invalid, valid ...etc`

<a name="issues"/>

## Issues

If you identify any errors in this component, or have an idea for an improvement, please open
an [issue](https://github.com/MurhafSousli/ngx-bar-rating/issues). I am excited to see what the community thinks of this
project, and I would love your input!

<a name="author"/>

## Author

**Murhaf Sousli**

- [github/murhafsousli](https://github.com/MurhafSousli)
- [twitter/murhafsousli](https://twitter.com/MurhafSousli)

