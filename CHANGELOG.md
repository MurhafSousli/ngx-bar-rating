# Changelog

## 2.1.0

 - refactor(DisqusComponent) remove unnecessary checks for input changes
 - refactor(DisqusService) remove unnecessary getters for `window`

 **Breaking changes**

 - `shortname` input is removed, set your disqus shortname here `DisqusModule.forRoot('disqus_shortname')`
 - `categoryId` input is renamed to `category`

## 2.0.0

 - Change package name to `ngx-disqus`

## 1.1.1

 - Cleanup
 - Update dependencies

## 1.1.0

 - (fix) Passing identifiers, closes [#3](https://github.com/MurhafSousli/ng2-disqus/issues/3)
 - (feat) @Output() `comment` callback (output)
 - **[removeOnDestroy]** input is deprecated, it will remove disqus script on destroy by default.
 

## 1.0.4
 - Improve component code
 - Add URL validator
 - Add tests for window service

## 1.0.3
 - AOT support
 - Adds window service

## 1.0.2
 - initial release