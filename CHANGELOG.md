# Changelog

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
