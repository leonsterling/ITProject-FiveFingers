(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
  (global = global || self, factory(global.swipeable = {}, global.react));
}(this, (function (exports, React) {
  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () {
              return e[k];
            }
          });
        }
      });
    }
    n['default'] = e;
    return n;
  }

  var React__namespace = /*#__PURE__*/_interopNamespace(React);

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  var LEFT = "Left";
  var RIGHT = "Right";
  var UP = "Up";
  var DOWN = "Down";

  var defaultProps = {
    delta: 10,
    preventDefaultTouchmoveEvent: false,
    rotationAngle: 0,
    trackMouse: false,
    trackTouch: true
  };
  var initialState = {
    first: true,
    initial: [0, 0],
    start: 0,
    swiping: false,
    xy: [0, 0]
  };
  var mouseMove = "mousemove";
  var mouseUp = "mouseup";
  var touchEnd = "touchend";
  var touchMove = "touchmove";
  var touchStart = "touchstart";

  function getDirection(absX, absY, deltaX, deltaY) {
    if (absX > absY) {
      if (deltaX > 0) {
        return RIGHT;
      }

      return LEFT;
    } else if (deltaY > 0) {
      return DOWN;
    }

    return UP;
  }

  function rotateXYByAngle(pos, angle) {
    if (angle === 0) return pos;
    var angleInRadians = Math.PI / 180 * angle;
    var x = pos[0] * Math.cos(angleInRadians) + pos[1] * Math.sin(angleInRadians);
    var y = pos[1] * Math.cos(angleInRadians) - pos[0] * Math.sin(angleInRadians);
    return [x, y];
  }

  function getHandlers(set, handlerProps) {
    var onStart = function onStart(event) {
      if (event && "touches" in event && event.touches.length > 1) return;
      set(function (state, props) {
        if (props.trackMouse) {
          document.addEventListener(mouseMove, onMove);
          document.addEventListener(mouseUp, onUp);
        }

        var _ref = "touches" in event ? event.touches[0] : event,
            clientX = _ref.clientX,
            clientY = _ref.clientY;

        var xy = rotateXYByAngle([clientX, clientY], props.rotationAngle);
        return _extends({}, state, initialState, {
          initial: [].concat(xy),
          xy: xy,
          start: event.timeStamp || 0
        });
      });
    };

    var onMove = function onMove(event) {
      set(function (state, props) {
        if ("touches" in event && event.touches.length > 1) {
          return state;
        }

        var _ref2 = "touches" in event ? event.touches[0] : event,
            clientX = _ref2.clientX,
            clientY = _ref2.clientY;

        var _rotateXYByAngle = rotateXYByAngle([clientX, clientY], props.rotationAngle),
            x = _rotateXYByAngle[0],
            y = _rotateXYByAngle[1];

        var deltaX = x - state.xy[0];
        var deltaY = y - state.xy[1];
        var absX = Math.abs(deltaX);
        var absY = Math.abs(deltaY);
        var time = (event.timeStamp || 0) - state.start;
        var velocity = Math.sqrt(absX * absX + absY * absY) / (time || 1);
        var vxvy = [deltaX / (time || 1), deltaY / (time || 1)];
        var dir = getDirection(absX, absY, deltaX, deltaY);
        var delta = typeof props.delta === "number" ? props.delta : props.delta[dir.toLowerCase()] || defaultProps.delta;
        if (absX < delta && absY < delta && !state.swiping) return state;
        var eventData = {
          absX: absX,
          absY: absY,
          deltaX: deltaX,
          deltaY: deltaY,
          dir: dir,
          event: event,
          first: state.first,
          initial: state.initial,
          velocity: velocity,
          vxvy: vxvy
        };
        eventData.first && props.onSwipeStart && props.onSwipeStart(eventData);
        props.onSwiping && props.onSwiping(eventData);
        var cancelablePageSwipe = false;

        if (props.onSwiping || props.onSwiped || "onSwiped" + dir in props) {
          cancelablePageSwipe = true;
        }

        if (cancelablePageSwipe && props.preventDefaultTouchmoveEvent && props.trackTouch && event.cancelable) event.preventDefault();
        return _extends({}, state, {
          first: false,
          eventData: eventData,
          swiping: true
        });
      });
    };

    var onEnd = function onEnd(event) {
      set(function (state, props) {
        var eventData;

        if (state.swiping && state.eventData) {
          eventData = _extends({}, state.eventData, {
            event: event
          });
          props.onSwiped && props.onSwiped(eventData);
          var onSwipedDir = props["onSwiped" + eventData.dir];
          onSwipedDir && onSwipedDir(eventData);
        } else {
          props.onTap && props.onTap({
            event: event
          });
        }

        return _extends({}, state, initialState, {
          eventData: eventData
        });
      });
    };

    var cleanUpMouse = function cleanUpMouse() {
      document.removeEventListener(mouseMove, onMove);
      document.removeEventListener(mouseUp, onUp);
    };

    var onUp = function onUp(e) {
      cleanUpMouse();
      onEnd(e);
    };

    var attachTouch = function attachTouch(el, passive) {
      var cleanup = function cleanup() {};

      if (el && el.addEventListener) {
        var tls = [[touchStart, onStart], [touchMove, onMove], [touchEnd, onEnd]];
        tls.forEach(function (_ref3) {
          var e = _ref3[0],
              h = _ref3[1];
          return el.addEventListener(e, h, {
            passive: passive
          });
        });

        cleanup = function cleanup() {
          return tls.forEach(function (_ref4) {
            var e = _ref4[0],
                h = _ref4[1];
            return el.removeEventListener(e, h);
          });
        };
      }

      return cleanup;
    };

    var onRef = function onRef(el) {
      if (el === null) return;
      set(function (state, props) {
        if (state.el === el) return state;
        var addState = {};

        if (state.el && state.el !== el && state.cleanUpTouch) {
          state.cleanUpTouch();
          addState.cleanUpTouch = void 0;
        }

        if (props.trackTouch && el) {
          addState.cleanUpTouch = attachTouch(el, !props.preventDefaultTouchmoveEvent);
        }

        return _extends({}, state, {
          el: el
        }, addState);
      });
    };

    var output = {
      ref: onRef
    };

    if (handlerProps.trackMouse) {
      output.onMouseDown = onStart;
    }

    return [output, attachTouch];
  }

  function updateTransientState(state, props, attachTouch) {
    var addState = {};

    if (!props.trackTouch && state.cleanUpTouch) {
      state.cleanUpTouch();
      addState.cleanUpTouch = void 0;
    } else if (props.trackTouch && !state.cleanUpTouch) {
      if (state.el) {
        addState.cleanUpTouch = attachTouch(state.el, !props.preventDefaultTouchmoveEvent);
      }
    }

    return _extends({}, state, addState);
  }

  function useSwipeable(options) {
    var trackMouse = options.trackMouse;
    var transientState = React__namespace.useRef(_extends({}, initialState));
    var transientProps = React__namespace.useRef(_extends({}, defaultProps));
    transientProps.current = _extends({}, defaultProps, options, {
      delta: options.delta === void 0 ? defaultProps.delta : options.delta,
      rotationAngle: options.rotationAngle === void 0 ? defaultProps.rotationAngle : options.rotationAngle,
      trackTouch: options.trackTouch === void 0 ? defaultProps.trackTouch : options.trackTouch
    });

    var _React$useMemo = React__namespace.useMemo(function () {
      return getHandlers(function (stateSetter) {
        return transientState.current = stateSetter(transientState.current, transientProps.current);
      }, {
        trackMouse: trackMouse
      });
    }, [trackMouse]),
        handlers = _React$useMemo[0],
        attachTouch = _React$useMemo[1];

    transientState.current = updateTransientState(transientState.current, transientProps.current, attachTouch);
    return handlers;
  }

  exports.DOWN = DOWN;
  exports.LEFT = LEFT;
  exports.RIGHT = RIGHT;
  exports.UP = UP;
  exports.useSwipeable = useSwipeable;

})));
//# sourceMappingURL=react-swipeable.umd.js.map
