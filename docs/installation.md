# Installation

## Direct Download / CDN

https://unpkg.com/vue-multi-drag-new/dist/vue-multi-drag-new 

[unpkg.com](https://unpkg.com) provides NPM-based CDN links. The above link will always point to the latest release on NPM. You can also use a specific version/tag via URLs like https://unpkg.com/vue-multi-drag-new@{{ $version }}/dist/vue-multi-drag-new.js
 
Include vue-multi-drag-new after Vue and it will install itself automatically:

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-multi-drag-new/dist/vue-multi-drag-new.js"></script>
```

## NPM

```sh
$ npm install vue-multi-drag-new
```

## Yarn

```sh
$ yarn add vue-multi-drag-new
```

When used with a module system, you must explicitly install the `vue-multi-drag-new` via `Vue.use()`:

```javascript
import Vue from 'vue'
import vue-multi-drag-new from 'vue-multi-drag-new'

Vue.use(vue-multi-drag-new)
```

You don't need to do this when using global script tags.

## Available options

All of the callbacks have arguments of the affected item and the instance of the plugin

````javascript
import Vue from 'vue'
import vue-multi-drag-new from 'vue-multi-drag-new'

const options = {
  invert: true,           // TODO not implemented
  selectAll: true,        // TODO not implemented
  itemCheckbox: true,     // TODO not implemented
  // Dragging callbacks
  callbackBeforeDragStart: (e, instance) => { /* Do something */ },
  callbackAfterDragStart: (e, instance) => { /* Do something */ },
  callbackBeforeDragOver: (e, instance) => { /* Do something */ },
  callbackAfterDragOver: (e, instance) => { /* Do something */ },
  callbackBeforeDragend: (e, instance) => { /* Do something */ },
  callbackAfterDragend: (e, instance) => { /* Do something */ },
  callbackBeforeDragenter: (e, instance) => { /* Do something */ },
  callbackAfterDragenter: (e, instance) => { /* Do something */ },
  callbackBeforeDragleave: (e, instance) => { /* Do something */ },
  callbackAfterDragleave: (e, instance) => { /* Do something */ },
  // Mouse callbacks
  callbackBeforeMouseup: (e, instance) => { /* Do something */ },
  callbackAfterMouseup: (e, instance) => { /* Do something */ },
  callbackBeforeMousdown: (e, instance) => { /* Do something */ },
  callbackAfterMousdown: (e, instance) => { /* Do something */ },
}
Vue.use(vue-multi-drag-new)
````


## Dev Build

You will have to clone directly from GitHub and build `vue-multi-drag-new` yourself if
you want to use the latest dev build.

```sh
$ git clone https://github.com/mszkb/vue-multi-drag node_modules/vue-multi-drag-new
$ cd node_modules/vue-multi-drag-new
$ npm install
$ npm run build
```

