import VueMultiDragBehaviour from './vue-multi-drag-behaviour'

/**
 * vue-multi-drag
 * (c) 2019 msz
 */

const Index = {}

export function register (plugin) {

}

/**
 * Plugin API
 */
Index.install = function(Vue, options = {}) {
  const defaultOptions = {
    invert: true,           // TODO not implemented
    selectAll: true,        // TODO not implemented
    itemCheckbox: true,     // TODO not implemented
    // Dragging callbacks
    callbackBeforeDragStart: () => { },
    callbackAfterDragStart: () => { },
    callbackBeforeDragOver: () => { },
    callbackAfterDragOver: () => { },
    callbackBeforeDragend: () => { },
    callbackAfterDragend: () => { },
    callbackBeforeDragenter: () => { },
    callbackAfterDragenter: () => { },
    callbackBeforeDragleave: () => { },
    callbackAfterDragleave: () => { },
    // Mouse callbacks
    callbackBeforeMouseup: () => { },
    callbackAfterMouseup: () => { },
    callbackBeforeMousdown: () => { },
    callbackAfterMousdown: () => { },
  }
  const finalOptions = {...defaultOptions, ...options}
  const vmdb = new VueMultiDragBehaviour(finalOptions)

  // Add a global asset
  Vue.directive('mz-drag', {
    bind(el, binding, vnode) {
      // something logic ...
      el.setAttribute('draggable', 'true') // enable html5 drag API
      el.setAttribute('aria-grabbed', 'false')
      el.setAttribute('tabindex', '0') // for tab-key
      el.setAttribute('grabindex', '0') // sort the items after index
      // the index resets when the item moves to other column
      vmdb.initItem(el, vnode)
    },
    unbind(el) {
      el.removeEventListener()
    }
  })

  Vue.directive('mz-dropzone', {
    bind(el) {
      el.setAttribute('related', 'true')
      el.setAttribute('aria-dropeffect', 'none')
    }
  })

  // Inject some component options
  Vue.mixin({
    created: function() {
      // something logic ...
    }
  })

  // Add an instance method
  Vue.prototype.$myMethod = function() {
    // something logic ...
  }
}

export default Index
