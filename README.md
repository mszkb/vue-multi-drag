# vue-multi-drag
<p align="center">
  ![Vue-multi-drag icon](assets/drag.png)
</p>

<div>Icons made by <a href="https://www.flaticon.com/authors/pixelmeetup" title="Pixelmeetup">Pixelmeetup</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
<br />

Vue implementation to support drag'n'drop multiple items at the same time. 
Most of the code comes from https://www.sitepoint.com/accessible-drag-drop/

See [Demo in Codesandbox](https://codesandbox.io/s/4kxw6m3x9)

## Install

````npm
npm i vue-multi-drag --save
````

main.js
````vue
import VueMultiDrag from 'vue-multi-drag'
Vue.use(VueMultiDrag)
````

YourComponent.vue
````vue
<template>
  <div class="template-class">
    <div class="col col-3">
      <ul v-mz-dropzone>
        <li v-mz-drag 
        @dragend="method"
        @dragenter="method2"
        @dragexit="method3"
        @dragleave="method4"
        @dragover="method5"
        @dragstart="method6">Element 1</li>
        <li v-mz-drag>Element 2</li>
        <li v-mz-drag>Element 3</li>
        <li v-mz-drag>Element 4</li>
        <li v-mz-drag>Element 5</li>
      </ul>
    </div>
    <div class="col col-3">
      <ul v-mz-dropzone>
      
      </ul>
    </div>
    <div class="col col-3">
      <ul v-mz-dropzone>
      
      </ul>
    </div>
  </div>
</template>
````

The li-tags can also be generated with a for-loop

## Features

- Directives (mz-drag, mz-dropzone)
- Support variable dropzones
- OnClick, OnHover, Dropover CSS customize

## Roadmap
 
1. Item counter + Icon while dragging
1. Select All / Inverse Button
1. Better Documentation
1. Clean up package.json
1. Checkboxes next to the Items (optional) - similar to Windows 8 and above
1. Unit Tests
2. Options
3. DropZone Groups
4. Shadow Copy (similar to https://github.com/SortableJS/Vue.Draggable)


## Missing Functionality

- options
- animations
- shadow copy (similar to https://github.com/SortableJS/Vue.Draggable)
- touch?
- dropzone groups


## Roadmap Features in Detail

### Item counter + Icon while dragging

In Windows when you have multiple items selected in the explorer and you start
dragging, a big Icon with an selected Item counter appears above your cursor.  
This helps keep track of selected items.


### Options

### DropZone Groups

Assign a group to each dropzone, so that items in that group can only be dropped in
their corresponding group.
For instance, there are 3 dropzones assigned to group 'groupX' and 2 dropzones assigned
to group 'groupZ'. The items inside groupX can only be dropped to zones in 'groupX'.


### Development Setup

``` bash
# install deps
npm install

# serve demo at localhost:8080
npm run dev
```

## License

[ISC](http://opensource.org/licenses/ISC)

Copyright (c) 2019 msz

