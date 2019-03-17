import VueMultiDragBehaviour from "./vue-multi-drag-behaviour";

/**
 * vue-multi-drag
 * (c) 2019 msz
 */

const VueMultiDrag = {};
const vmdb = new VueMultiDragBehaviour();

/**
 * Plugin API
 */
VueMultiDrag.install = function(Vue) {
  // Add global method or property
  Vue.myGlobalMethod = function() {
    // something logic ...
  };

  // Add a global asset
  Vue.directive("mz-drag", {
    bind(el) {
      // something logic ...
      el.setAttribute("draggable", "true"); // enable html5 drag API
      el.setAttribute("aria-grabbed", "false");
      el.setAttribute("tabindex", "0"); // for tab-key
      el.setAttribute("grabindex", "0"); // sort the items after index
      // the index resets when the item moves to other column
      vmdb.initItem(el);
    },
    unbind(el) {
      el.removeEventListener();
    }
  });

  Vue.directive("mz-dropzone", {
    bind(el) {
      el.setAttribute("related", "true");
      el.setAttribute("aria-dropeffect", "none");
    }
  });

  // Inject some component options
  Vue.mixin({
    created: function() {
      // something logic ...
    }
  });

  // Add an instance method
  Vue.prototype.$myMethod = function() {
    // something logic ...
  };
};

export default VueMultiDrag;
