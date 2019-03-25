import Vue from 'vue'
import App from './App'
import plugin from '../src'


const options = {
  invert: true,           // TODO not implemented
  selectAll: true,        // TODO not implemented
  itemCheckbox: true,     // TODO not implemented
  // Dragging callbacks
  callbackBeforeDragStart: (e, instance) => { console.log('BEFORE DRAG START'); },
  callbackAfterDragStart: (e, instance) => { console.log('AFTER DRAG START') },
  callbackBeforeDragOver: (e, instance) => { console.log('BEFORE DRAG OVER') },
  callbackAfterDragOver: (e, instance) => { console.log('AFTER DRAG OVER') },
  callbackBeforeDragend: (e, instance) => { console.log('BEFORE DRAG END') },
  callbackAfterDragend: (e, instance) => { console.log('AFTER DRAG END') },
  callbackBeforeDragenter: (e, instance) => { console.log('BEFORE DRAG ENTER') },
  callbackAfterDragenter: (e, instance) => { console.log('AFTER DRAG ENTER') },
  callbackBeforeDragleave: (e, instance) => { console.log('BEFORE DRAG LEAVE') },
  callbackAfterDragleave: (e, instance) => { console.log('AFTER DRAG LEAVE') },
  // Mouse callbacks
  callbackBeforeMouseup: (e, instance) => { console.log('BEFORE MOUSE UP') },
  callbackAfterMouseup: (e, instance) => { console.log('AFTER MOUSE UP') },
  callbackBeforeMousdown: (e, instance) => { console.log('BEFORE MOUSE DOWN') },
  callbackAfterMousdown: (e, instance) => { console.log('AFTER MOUSE DOWN') },
}

Vue.use(plugin, options)

Vue.config.productionTip = false

new Vue({
  // NOTE: if you need to inject as option, you can set here!
  // plugin,
  render: h => h(App)
}).$mount('#app')
