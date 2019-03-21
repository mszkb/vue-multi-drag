import Vue from 'vue'
import App from './App'
import plugin from '../src'

const options = {
  invert: true,
  selectAll: true,
  itemCheckbox: true,
  // Dragging callbacks
  callbackBeforeDragStart: () => { console.log('I get called on before dragstart')},
  callbackAfterDragStart: () => { console.log('I get called on after dragstart')},
  callbackBeforeDragOver: () => { console.log('I get called before dragging over')},
  callbackAfterDragOver: () => { console.log('I get called after dragging over')},
  callbackBeforeDragend: () => { console.log('I get called before dragend')},
  callbackAfterDragend: () => { console.log('I get called after dragend')},
  callbackBeforeDragenter: () => { console.log('I get called before dragenter')},
  callbackAfterDragenter: () => { console.log('I get called after dragenter')},
  callbackBeforeDragleave: () => { console.log('I get called before dragleave')},
  callbackAfterDragleave: () => { console.log('I get called after dragleave')},
  // Mouse callbacks
  callbackBeforeMouseup: () => { console.log('I get called before mouseup')},
  callbackAfterMouseup: () => { console.log('I get called after mouseup')},
  callbackBeforeMousdown: () => { console.log('I get called before mousedown')},
  callbackAfterMousdown: () => { console.log('I get called after mousedown')},
}

Vue.use(plugin, options)

Vue.config.productionTip = false

new Vue({
  // NOTE: if you need to inject as option, you can set here!
  // plugin,
  render: h => h(App)
}).$mount('#app')
