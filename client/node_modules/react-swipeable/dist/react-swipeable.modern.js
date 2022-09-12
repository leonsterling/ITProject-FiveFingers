import * as React from 'react';

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

const LEFT = "Left";
const RIGHT = "Right";
const UP = "Up";
const DOWN = "Down";

const defaultProps = {
  delta: 10,
  preventDefaultTouchmoveEvent: false,
  rotationAngle: 0,
  trackMouse: false,
  trackTouch: true
};
const initialState = {
  first: true,
  initial: [0, 0],
  start: 0,
  swiping: false,
  xy: [0, 0]
};
const mouseMove = "mousemove";
const mouseUp = "mouseup";
const touchEnd = "touchend";
const touchMove = "touchmove";
const touchStart = "touchstart";

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
  const angleInRadians = Math.PI / 180 * angle;
  const x = pos[0] * Math.cos(angleInRadians) + pos[1] * Math.sin(angleInRadians);
  const y = pos[1] * Math.cos(angleInRadians) - pos[0] * Math.sin(angleInRadians);
  return [x, y];
}

function getHandlers(set, handlerProps) {
  const onStart = event => {
    if (event && "touches" in event && event.touches.length > 1) return;
    set((state, props) => {
      if (props.trackMouse) {
        document.addEventListener(mouseMove, onMove);
        document.addEventListener(mouseUp, onUp);
      }

      const {
        clientX,
        clientY
      } = "touches" in event ? event.touches[0] : event;
      const xy = rotateXYByAngle([clientX, clientY], props.rotationAngle);
      return _extends({}, state, initialState, {
        initial: [...xy],
        xy,
        start: event.timeStamp || 0
      });
    });
  };

  const onMove = event => {
    set((state, props) => {
      if ("touches" in event && event.touches.length > 1) {
        return state;
      }

      const {
        clientX,
        clientY
      } = "touches" in event ? event.touches[0] : event;
      const [x, y] = rotateXYByAngle([clientX, clientY], props.rotationAngle);
      const deltaX = x - state.xy[0];
      const deltaY = y - state.xy[1];
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);
      const time = (event.timeStamp || 0) - state.start;
      const velocity = Math.sqrt(absX * absX + absY * absY) / (time || 1);
      const vxvy = [deltaX / (time || 1), deltaY / (time || 1)];
      const dir = getDirection(absX, absY, deltaX, deltaY);
      const delta = typeof props.delta === "number" ? props.delta : props.delta[dir.toLowerCase()] || defaultProps.delta;
      if (absX < delta && absY < delta && !state.swiping) return state;
      const eventData = {
        absX,
        absY,
        deltaX,
        deltaY,
        dir,
        event,
        first: state.first,
        initial: state.initial,
        velocity,
        vxvy
      };
      eventData.first && props.onSwipeStart && props.onSwipeStart(eventData);
      props.onSwiping && props.onSwiping(eventData);
      let cancelablePageSwipe = false;

      if (props.onSwiping || props.onSwiped || `onSwiped${dir}` in props) {
        cancelablePageSwipe = true;
      }

      if (cancelablePageSwipe && props.preventDefaultTouchmoveEvent && props.trackTouch && event.cancelable) event.preventDefault();
      return _extends({}, state, {
        first: false,
        eventData,
        swiping: true
      });
    });
  };

  const onEnd = event => {
    set((state, props) => {
      let eventData;

      if (state.swiping && state.eventData) {
        eventData = _extends({}, state.eventData, {
          event
        });
        props.onSwiped && props.onSwiped(eventData);
        const onSwipedDir = props[`onSwiped${eventData.dir}`];
        onSwipedDir && onSwipedDir(eventData);
      } else {
        props.onTap && props.onTap({
          event
        });
      }

      return _extends({}, state, initialState, {
        eventData
      });
    });
  };

  const cleanUpMouse = () => {
    document.removeEventListener(mouseMove, onMove);
    document.removeEventListener(mouseUp, onUp);
  };

  const onUp = e => {
    cleanUpMouse();
    onEnd(e);
  };

  const attachTouch = (el, passive) => {
    let cleanup = () => {};

    if (el && el.addEventListener) {
      const tls = [[touchStart, onStart], [touchMove, onMove], [touchEnd, onEnd]];
      tls.forEach(([e, h]) => el.addEventListener(e, h, {
        passive
      }));

      cleanup = () => tls.forEach(([e, h]) => el.removeEventListener(e, h));
    }

    return cleanup;
  };

  const onRef = el => {
    if (el === null) return;
    set((state, props) => {
      if (state.el === el) return state;
      const addState = {};

      if (state.el && state.el !== el && state.cleanUpTouch) {
        state.cleanUpTouch();
        addState.cleanUpTouch = void 0;
      }

      if (props.trackTouch && el) {
        addState.cleanUpTouch = attachTouch(el, !props.preventDefaultTouchmoveEvent);
      }

      return _extends({}, state, {
        el
      }, addState);
    });
  };

  const output = {
    ref: onRef
  };

  if (handlerProps.trackMouse) {
    output.onMouseDown = onStart;
  }

  return [output, attachTouch];
}

function updateTransientState(state, props, attachTouch) {
  const addState = {};

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
  const {
    trackMouse
  } = options;
  const transientState = React.useRef(_extends({}, initialState));
  const transientProps = React.useRef(_extends({}, defaultProps));
  transientProps.current = _extends({}, defaultProps, options, {
    delta: options.delta === void 0 ? defaultProps.delta : options.delta,
    rotationAngle: options.rotationAngle === void 0 ? defaultProps.rotationAngle : options.rotationAngle,
    trackTouch: options.trackTouch === void 0 ? defaultProps.trackTouch : options.trackTouch
  });
  const [handlers, attachTouch] = React.useMemo(() => getHandlers(stateSetter => transientState.current = stateSetter(transientState.current, transientProps.current), {
    trackMouse
  }), [trackMouse]);
  transientState.current = updateTransientState(transientState.current, transientProps.current, attachTouch);
  return handlers;
}

export { DOWN, LEFT, RIGHT, UP, useSwipeable };
//# sourceMappingURL=react-swipeable.modern.js.map
