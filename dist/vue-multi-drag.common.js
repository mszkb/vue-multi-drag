/*!
 * vue-multi-drag v0.3.2 
 * (c) 2019 mszkb
 * Released under the ISC License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

// Took the algorithm and all the logic from
// https://www.sitepoint.com/accessible-drag-drop/
// https://codepen.io/SitePoint/pen/XJPjOj
var multiDragBehaviour =
/*#__PURE__*/
function () {
  function multiDragBehaviour(options) {
    _classCallCheck(this, multiDragBehaviour);

    this.options = options;
    this.allItems = [];
    this.selections = {
      items: [],
      owner: null,
      droptarget: null // Those are used for the dropeffects later on
      // @see _addDropeffects

    };
    this.dropZones = null;
    this.draggableItems = null; //related variable is needed to maintain a reference to the
    //dragleave's relatedTarget, since it doesn't have e.relatedTarget

    this.related = {};

    this._attachGlobalListeners();
  }

  _createClass(multiDragBehaviour, [{
    key: "_attachGlobalListeners",
    value: function _attachGlobalListeners() {
      var _this = this;

      document.addEventListener('dragenter', function (e) {
        _this.options.callbackBeforeDragenter(e, _this);

        _this.related = e.target;

        _this.options.callbackAfterDragenter(e, _this);
      });
      document.addEventListener('dragleave', function (e) {
        _this.options.callbackBeforeDragleave(e, _this);

        _this._dragLeave(e);

        _this.options.callbackAfterDragleave(e, _this);
      });
    }
  }, {
    key: "initItem",
    value: function initItem(draggableItem, vnode) {
      draggableItem.setAttribute('grabindex', this.allItems.length); // this attribute keeps track of the position
      // so it is not affected by the order of selection

      this.allItems.push(draggableItem);
      this.attachEventListeners(draggableItem, vnode);
    }
    /**
     * Attach an eventlistener to given draggableItem and
     * add it to the items array for further stuff
     *
     * @param draggableItem
     */

  }, {
    key: "attachEventListeners",
    value: function attachEventListeners(draggableItem, vnode) {
      var _this2 = this;

      // this.items.push(draggableItem)
      draggableItem.addEventListener('mousedown', function (e) {
        _this2.options.callbackBeforeMousdown(e, _this2);

        _this2._mouseDown(e);

        vnode.context.$emit('mousedown');

        _this2.options.callbackAfterMousdown(e, _this2);
      });
      draggableItem.addEventListener('mouseup', function (e) {
        _this2.options.callbackBeforeMouseup(e, _this2);

        _this2._mouseUp(e);

        vnode.context.$emit('mouseup');

        _this2.options.callbackAfterMouseup(e, _this2);
      });
      draggableItem.addEventListener('dragstart', function (e) {
        _this2.options.callbackBeforeDragStart(e, _this2);

        _this2._dragStart(e);

        vnode.context.$emit('dragstart');

        _this2.options.callbackAfterDragStart(e, _this2);
      });
      draggableItem.addEventListener('dragover', function (e) {
        _this2.options.callbackBeforeDragOver(e, _this2); //dragover event to allow the drag by preventing its default


        if (_this2.selections.items.length) {
          e.preventDefault();
        }

        vnode.context.$emit('dragover');

        _this2.options.callbackAfterDragOver(e, _this2);
      });
      draggableItem.addEventListener('dragend', function (e) {
        _this2.options.callbackBeforeDragend(e, _this2);

        _this2._dragEnd(e);

        vnode.context.$emit('dragend');

        _this2.options.callbackAfterDragend(e, _this2);
      });
    }
    /**
     * Adds the current selection to the list and adds the 'aria-grabbed' attribute
     *
     * @credits
     * @param item
     * @private
     */

  }, {
    key: "_addSelection",
    value: function _addSelection(item) {
      //if the owner reference is still null, set it to this item's parent
      //so that further selection is only allowed within the same container
      if (!this.selections.owner) {
        this.selections.owner = item.parentNode;
      } //or if that's already happened then compare it with this item's parent
      //and if they're not the same container, return to prevent selection
      else if (this.selections.owner !== item.parentNode) {
          return;
        }

      item.setAttribute('aria-grabbed', 'true'); //set this item's grabbed state

      this.selections.items.push(item); //add it to the items array

      this.selections.items.sort(function (a, b) {
        return a.getAttribute('grabindex') > b.getAttribute('grabindex') ? 1 : b.getAttribute('grabindex') > a.getAttribute('grabindex') ? -1 : 0;
      });
    }
    /**
     * Removing the item from the selection and removing grabbed state
     *
     * @param item
     * @credits
     * @private
     */

  }, {
    key: "_removeSelection",
    value: function _removeSelection(item) {
      item.setAttribute('aria-grabbed', 'false'); //then find and remove this item from the existing items array

      for (var len = this.selections.items.length, i = 0; i < len; i++) {
        if (this.selections.items[i] === item) {
          this.selections.items.splice(i, 1);
          break;
        }
      }

      if (this.selections.items.length === 0) {
        this.selections.owner = null;
      }
    }
    /**
     * Removing all grabbed states and clears the array
     *
     * @credits
     * @private
     */

  }, {
    key: "_clearSelections",
    value: function _clearSelections() {
      if (this.selections.items.length) {
        //reset the grabbed state on every selected item
        for (var len = this.selections.items.length, i = 0; i < len; i++) {
          this.selections.items[i].setAttribute('aria-grabbed', 'false');
        } //then reset the items array


        this.selections.owner = null;
        this.selections.items = [];
      }
    }
    /**
     * Shorctut function for testing whether a selection modifier is pressed
     *
     * @credits
     * @param e
     * @returns {boolean | *}
     * @private
     */

  }, {
    key: "_hasModifier",
    value: function _hasModifier(e) {
      return e.ctrlKey || e.metaKey || e.shiftKey;
    }
  }, {
    key: "_initDropZones",
    value: function _initDropZones() {
      if (this.dropZones === null) {
        this.dropZones = document.querySelectorAll('[related]');
      }
    }
  }, {
    key: "_initDraggableItems",
    value: function _initDraggableItems() {
      if (this.draggableItems === null) {
        this.draggableItems = document.querySelectorAll('[draggable]');
      }
    } //function for applying dropeffect to the target containers

  }, {
    key: "_addDropeffects",
    value: function _addDropeffects() {
      this._initDropZones();

      this._initDraggableItems(); //apply aria-dropeffect and tabindex to all targets apart from the owner
      // FIXME use functional stuff


      for (var len = this.dropZones.length, i = 0; i < len; i++) {
        if (this.dropZones[i] !== this.selections.owner && this.dropZones[i].getAttribute('aria-dropeffect') === 'none') {
          this.dropZones[i].setAttribute('aria-dropeffect', 'move');
          this.dropZones[i].setAttribute('tabindex', '0');
        }
      } //remove aria-grabbed and tabindex from all items inside those containers
      // FIXME use functional stuff


      for (var _len = this.draggableItems.length, _i = 0; _i < _len; _i++) {
        if (this.draggableItems[_i].parentNode !== this.selections.owner && this.draggableItems[_i].getAttribute('aria-grabbed')) {
          this.draggableItems[_i].removeAttribute('aria-grabbed');

          this.draggableItems[_i].removeAttribute('tabindex');
        }
      }
    }
  }, {
    key: "_clearDropeffects",
    value: function _clearDropeffects() {
      this._initDropZones();

      this._initDraggableItems(); //if we have any selected items


      if (this.selections.items.length) {
        //reset aria-dropeffect and remove tabindex from all targets
        // FIXME use functional stuff
        for (var len = this.dropZones.length, i = 0; i < len; i++) {
          if (this.dropZones[i].getAttribute('aria-dropeffect') !== 'none') {
            this.dropZones[i].setAttribute('aria-dropeffect', 'none');
            this.dropZones[i].removeAttribute('tabindex');
          }
        } //restore aria-grabbed and tabindex to all selectable items
        //without changing the grabbed value of any existing selected items
        // FIXME use functional stuff


        for (var _len2 = this.draggableItems.length, _i2 = 0; _i2 < _len2; _i2++) {
          if (!this.draggableItems[_i2].getAttribute('aria-grabbed')) {
            this.draggableItems[_i2].setAttribute('aria-grabbed', 'false');

            this.draggableItems[_i2].setAttribute('tabindex', '0');
          } else if (this.draggableItems[_i2].getAttribute('aria-grabbed') === 'true') {
            this.draggableItems[_i2].setAttribute('tabindex', '0');
          }
        }
      }
    }
    /**
     * Shortcut function for identifying an event element's target container
     *
     * @param element
     * @credits
     * @returns {*}
     * @private
     */

  }, {
    key: "_getContainer",
    value: function _getContainer(element) {
      do {
        if (element.nodeType === 1 && element.getAttribute('aria-dropeffect')) {
          return element;
        }
      } while (element = element.parentNode);

      return null;
    }
    /**
     * Selects only the clicked item and remove all other dropeffects
     * For multiple selection see _mouseUp
     * When a modifier key is pressed, this function will be skipped
     *
     * @credits
     * @param e
     * @private
     */

  }, {
    key: "_mouseDown",
    value: function _mouseDown(e) {
      this._clearDropeffects(); //clear dropeffect from the target containers


      if (this._hasModifier(e)) {
        this._clearDropeffects(); // clear dropeffect from the target containers


        this._clearSelections(); // clear all existing selections

      }
    }
    /**
     * Multiple selections via modifier key
     *
     * @credits
     * @param e
     * @private
     */

  }, {
    key: "_mouseUp",
    value: function _mouseUp(e) {
      if (!this._hasModifier(e)) {
        if (e.target.getAttribute('draggable')) {
          // check if the item's grabbed state is currently false
          if (e.target.getAttribute('aria-grabbed') === 'false') {
            // this._clearSelections();        //clear all existing selections
            this._addSelection(e.target); //then add this new selection

          } else {
            this._removeSelection(e.target);
          }
        }

        return;
      } //if the element is a draggable item
      //and the multipler selection modifier is pressed


      if (e.target.getAttribute('draggable')) {
        //if the item's grabbed state is currently true
        if (e.target.getAttribute('aria-grabbed') === 'true') {
          //unselect this item
          this._removeSelection(e.target); //if that was the only selected item
          //then reset the owner container reference


          if (!this.selections.items.length) {
            this.selections.owner = null;
          }
        } //else [if the item's grabbed state is false]
        else {
            //add this additional selection
            this._addSelection(e.target);
          }
      }
    }
  }, {
    key: "_dragStart",
    value: function _dragStart(e) {
      // If the clicked node is from another column, then block the drag
      if (this.selections.owner !== e.target.parentNode) {
        this._clearSelections();

        this._addSelection(e.target);
      } //[else] if the multiple selection modifier is pressed
      //and the item's grabbed state is currently false


      if (e.target.getAttribute('aria-grabbed') === 'false') {
        //add this additional selection
        this._addSelection(e.target);
      } //we don't need the transfer data, but we have to define something
      //otherwise the drop action won't work at all in firefox
      //most browsers support the proper mime-type syntax, eg. "text/plain"
      //but we have to use this incorrect syntax for the benefit of IE10+


      e.dataTransfer.setData('text', ''); //apply dropeffect to the target containers

      this._addDropeffects();
    }
  }, {
    key: "_keyDown",
    value: function _keyDown(e) {
      //if the element is a grabbable item
      if (e.target.getAttribute('aria-grabbed')) {
        if (e.keyCode === 32) {
          //Space is the selection or unselection keystroke
          if (this._hasModifier(e)) {
            //if the multiple selection modifier is pressed
            //if the item's grabbed state is currently true
            if (e.target.getAttribute('aria-grabbed') === 'true') {
              //if this is the only selected item, clear dropeffect
              //from the target containers, which we must do first
              //in case subsequent unselection sets owner to null
              if (this.selections.items.length === 1) {
                this._clearDropeffects();
              }

              this._removeSelection(e.target); //unselect this item
              //if we have any selections
              //apply dropeffect to the target containers,
              //in case earlier selections were made by mouse


              if (this.selections.items.length) {
                this._addDropeffects();
              } //if that was the only selected item
              //then reset the owner container reference


              if (!this.selections.items.length) {
                this.selections.owner = null;
              }
            } //else [if its grabbed state is currently false]
            else {
                this._addSelection(e.target); //add this additional selection


                this._addDropeffects(); //apply dropeffect to the target containers

              }
          } //else [if the multiple selection modifier is not pressed]
          //and the item's grabbed state is currently false
          else if (e.target.getAttribute('aria-grabbed') === 'false') {
              this._clearDropeffects(); //clear dropeffect from the target containers


              this._clearSelections(); //clear all existing selections


              this._addSelection(e.target); //add this new selection


              this._addDropeffects(); //apply dropeffect to the target containers

            } //else [if modifier is not pressed and grabbed is already true]
            else {
                this._addDropeffects(); //apply dropeffect to the target containers

              }

          e.preventDefault(); //then prevent default to avoid any conflict with native actions
        } //Modifier + M is the end-of-selection keystroke


        if (e.keyCode === 77 && this._hasModifier(e)) {
          //if we have any selected items
          if (this.selections.items.length) {
            //apply dropeffect to the target containers
            //in case earlier selections were made by mouse
            this._addDropeffects(); //if the owner container is the last one, focus the first one


            if (this.selections.owner === this.dropZones[this.dropZones.length - 1]) {
              this.dropZones[0].focus();
            } //else [if it's not the last one], find and focus the next one
            else {
                for (var len = this.dropZones.length, i = 0; i < len; i++) {
                  if (this.selections.owner === this.dropZones[i]) {
                    this.dropZones[i + 1].focus();
                    break;
                  }
                }
              }
          } //then prevent default to avoid any conflict with native actions


          e.preventDefault();
        }
      } //Escape is the abort keystroke (for any target element)


      if (e.keyCode === 27) {
        //if we have any selected items
        if (this.selections.items.length) {
          //clear dropeffect from the target containers
          this._clearDropeffects(); //then set focus back on the last item that was selected, which is
          //necessary because we've removed tabindex from the current focus


          this.selections.items[this.selections.items.length - 1].focus(); //clear all existing selections

          this._clearSelections(); //but don't prevent default so that native actions can still occur

        }
      }
    }
  }, {
    key: "_dragLeave",
    value: function _dragLeave(e) {
      this._initDropZones();

      this._initDraggableItems(); //get a drop target reference from the relatedTarget


      var droptarget = this._getContainer(this.related); //if the target is the owner then it's not a valid drop target


      if (droptarget === this.selections.owner) {
        droptarget = null;
      } //if the drop target is different from the last stored reference
      //(or we have one of those references but not the other one)


      if (droptarget !== this.selections.droptarget) {
        //if we have a saved reference, clear its existing dragover class
        if (this.selections.droptarget) {
          this.selections.droptarget.className = this.selections.droptarget.className.replace(/ dragover/g, '');
        } //apply the dragover class to the new drop target reference


        if (droptarget) {
          droptarget.className += ' dragover';
        } //then save that reference for next time


        this.selections.droptarget = droptarget;
      }
    }
  }, {
    key: "_startIndex",
    value: function _startIndex(e) {
      var lastChild = e.lastChild;

      if (lastChild === null) {
        return 0;
      }

      if (lastChild.nodeName === '#text') {
        return 0;
      }

      return lastChild.getAttribute('grabindex');
    }
  }, {
    key: "_dragEnd",
    value: function _dragEnd(e) {
      //if we have a valid drop target reference
      //(which implies that we have some selected items)
      if (this.selections.droptarget) {
        //append the selected items to the end of the target container
        var startIndex = this._startIndex(this.selections.droptarget);

        for (var len = this.selections.items.length, i = 0; i < len; i++) {
          this.selections.items[i].setAttribute('grabindex', ++startIndex);
          this.selections.droptarget.appendChild(this.selections.items[i]);
        } //prevent default to allow the action


        e.preventDefault();
      } // TODO sort the columns
      //if we have any selected items


      if (this.selections.items.length) {
        //clear dropeffect from the target containers
        this._clearDropeffects(); //if we have a valid drop target reference


        if (this.selections.droptarget) {
          //reset the selections array
          this._clearSelections(); //reset the target's dragover class


          this.selections.droptarget.className = this.selections.droptarget.className.replace(/ dragover/g, ''); //reset the target reference

          this.selections.droptarget = null;
        }
      }
    }
  }]);

  return multiDragBehaviour;
}();

/**
 * vue-multi-drag
 * (c) 2019 msz
 */

var Index = {};
function register(plugin) {}
/**
 * Plugin API
 */

Index.install = function (Vue) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var defaultOptions = {
    invert: true,
    // TODO not implemented
    selectAll: true,
    // TODO not implemented
    itemCheckbox: true,
    // TODO not implemented
    // Dragging callbacks
    callbackBeforeDragStart: function callbackBeforeDragStart() {},
    callbackAfterDragStart: function callbackAfterDragStart() {},
    callbackBeforeDragOver: function callbackBeforeDragOver() {},
    callbackAfterDragOver: function callbackAfterDragOver() {},
    callbackBeforeDragend: function callbackBeforeDragend() {},
    callbackAfterDragend: function callbackAfterDragend() {},
    callbackBeforeDragenter: function callbackBeforeDragenter() {},
    callbackAfterDragenter: function callbackAfterDragenter() {},
    callbackBeforeDragleave: function callbackBeforeDragleave() {},
    callbackAfterDragleave: function callbackAfterDragleave() {},
    // Mouse callbacks
    callbackBeforeMouseup: function callbackBeforeMouseup() {},
    callbackAfterMouseup: function callbackAfterMouseup() {},
    callbackBeforeMousdown: function callbackBeforeMousdown() {},
    callbackAfterMousdown: function callbackAfterMousdown() {}
  };

  var finalOptions = _objectSpread({}, defaultOptions, options);

  var vmdb = new multiDragBehaviour(finalOptions); // Add a global asset

  Vue.directive('mz-drag', {
    bind: function bind(el, binding, vnode) {
      // something logic ...
      el.setAttribute('draggable', 'true'); // enable html5 drag API

      el.setAttribute('aria-grabbed', 'false');
      el.setAttribute('tabindex', '0'); // for tab-key

      el.setAttribute('grabindex', '0'); // sort the items after index
      // the index resets when the item moves to other column

      vmdb.initItem(el, vnode);
    },
    unbind: function unbind(el) {
      el.removeEventListener();
    }
  });
  Vue.directive('mz-dropzone', {
    bind: function bind(el) {
      el.setAttribute('related', 'true');
      el.setAttribute('aria-dropeffect', 'none');
    }
  }); // Inject some component options

  Vue.mixin({
    created: function created() {// something logic ...
    }
  }); // Add an instance method

  Vue.prototype.$myMethod = function () {// something logic ...
  };
};

exports.default = Index;
exports.register = register;
