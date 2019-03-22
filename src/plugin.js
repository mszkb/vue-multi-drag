/*
 * This file is only for developers to test options and
 * implement new plugins for this plugin
 */

import Vue from 'vue'
import plugin from './index'

const options = {
  invert: true,
  selectAll: true,
  itemCheckbox: true,
  
  // Dragging callbacks
  callbackBeforeDragStart: () => {
    console.log('I get called on before dragstart')
  },
  callbackAfterDragStart: () => {
    console.log('I get called on after dragstart')
  },
  callbackBeforeDragOver: () => {
    console.log('I get called before dragging over')
  },
  callbackAfterDragOver: () => {
    console.log('I get called after dragging over')
  },
  callbackBeforeDragend: () => {
    console.log('I get called before dragend')
  },
  callbackAfterDragend: () => {
    console.log('I get called after dragend')
  },
  callbackBeforeDragenter: () => {
    console.log('I get called before dragenter')
  },
  callbackAfterDragenter: () => {
    console.log('I get called after dragenter')
  },
  callbackBeforeDragleave: () => {
    console.log('I get called before dragleave')
  },
  callbackAfterDragleave: () => {
    console.log('I get called after dragleave')
  },
  // Mouse callbacks
  callbackBeforeMouseup: () => {
    console.log('I get called before mouseup')
  },
  callbackAfterMouseup: () => {
    console.log('I get called after mouseup')
  },
  callbackBeforeMousdown: () => {
    console.log('I get called before mousedown')
  },
  callbackAfterMousdown: () => {
    console.log('I get called after mousedown')
  }
}

class plugin1 {
  constructor() {
  }
}

plugin.register(plugin1)
Vue.use(plugin, options)

/*
 * NOTE:
 *   If you want Vue instance of main.js to import something in your plugin as a Vue option,
 *   you need to export it here.
 */
// export default plugin
