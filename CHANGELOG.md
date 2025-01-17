# Changelog

## 8.0.1

- refactor: export `BarRatinEffect` directive in `BarRatingModule`.

## 8.0.0

- Upgrade to Angular 19.
- Add unit tests.
- feat: Add `provideBarRatingOptions` to override the default options.
- feat: Add accessibility support such as focus and keys listeners to increase/decrease the rating.
- feat: Ability to override CSS variables from `:root` selector.
- feat: Add `effect` directive that adds click scale-fade effect.
- feat: Add CSS variable `--br-effect-scale`, `--br-effect-duration` and `--br-effect-ease` to customize the effect.
- fix: When used as a form control, the required validator is always true, closes [#116](https://github.com/MurhafSousli/ngx-bar-rating/issues/116). 

## 7.0.1

- fix: readonly attribute is not working in v7.0.0, closes [#111](https://github.com/MurhafSousli/ngx-bar-rating/issues/111).

## 7.0.0

- Upgrade to Angular 18.
- Upgrade to standalone components.
- Remove `rxjs` dependency.
- feat: Ability to use boolean inputs as attributes, such as `<ng-bar-rating showText readonly/>`.
- fix: `(rateChange)` is automatically called when page is loaded, closes [#90](https://github.com/MurhafSousli/ngx-bar-rating/issues/90).
- fix: `untouched`, `touched`, `dirty` classes when used as form controls.

### Breaking Changes

- Rename `[readOnly]` input to `[readonly]`.
- Remove `(hover)` and `(leave)` outputs.

## 6.0.0

 - Update to Angular 16.

## 5.0.0

 - Update to Angular 15, in [2f09704](https://github.com/MurhafSousli/ngx-bar-rating/pull/104/commits/2f0970415c799f28d89f1b074e86bca8c34f49c5).
 - Add `--br-width` and `--br-height` CSS variables to change the size of the steps for all themes except for the `default` theme, in [ba49836](https://github.com/MurhafSousli/ngx-bar-rating/pull/104/commits/ba49836d421f143b6f335f58272af2d858df62a9).
 - The CSS variable `--br-font-size` changes the size of the steps in `stars` and `square` themes, in [ba49836](https://github.com/MurhafSousli/ngx-bar-rating/pull/104/commits/ba49836d421f143b6f335f58272af2d858df62a9).

## 4.0.1
 
 - Update to Angular 14 in [313d97e](https://github.com/MurhafSousli/ngx-bar-rating/pull/85/commits/313d97e14db4ce957ab35f0ad31980a5f1e6ef26).

## 3.0.0

 - Upgrade to Angular 13, closes [#74](https://github.com/MurhafSousli/ngx-bar-rating/issues/74).
 - feat: Add custom bar rating directive.
 - feat: Add CSS variables to customize the stars.
 - fix: Show rating title if rating value is `null` or `0`, closes [#19](https://github.com/MurhafSousli/ngx-bar-rating/issues/19) in [d55fcc3](https://github.com/MurhafSousli/ngx-bar-rating/pull/76/commits/d55fcc3bd30b0078bf5d66853d25f398cee0f56f).
 - fix: Allow click event propagation, closes [#29](https://github.com/MurhafSousli/ngx-bar-rating/issues/29) in [3737458](https://github.com/MurhafSousli/ngx-bar-rating/pull/76/commits/3737458429b5979517d014c45647618e73825283).
 - Update demo with latest FontAwesome and Bootstrap.

### Breaking changes

 - Remove FontAwesome CSS themes, use custom directives instead.
 - Remove Bootstrap CSS themes, use custom directives instead.
 - When passing `[titles]` array, the first index will represent `null` or `0` value

## 2.0.0

 - Upgrade to Angular 10, closes [#53](https://github.com/MurhafSousli/ngx-bar-rating/issues/53).
 
 ### Breaking changes:
 
 - Remove CSS themes from the package, only SCSS themes will be shipped in the release.

## 1.0.1

 - remove precompiled css in src
 - fix custom stars class name `custom` to `stars`

## 1.0.0

 - feat(workflow): Compile themes sass to css for production
 - include themes folder in dist
 - improve movie rating styles, remove padding

## 0.9.0

 - First release
