export const INCREMENT_COUNTER = 'INCREMENT_COUNTER'
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER'
export const VOLUME_UP = 'VOLUME_UP'
export const VOLUME_DOWN = 'VOLUME_DOWN'

export function increment() {
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  // create Oscillator node
  var oscillator = audioCtx.createOscillator();

  oscillator.type = 'sine';
  oscillator.frequency.value = 2000; // value in hertz
  var g = audioCtx.createGain();
  g.gain.value = 1;

  oscillator.connect(g);
  g.connect(audioCtx.destination);

  oscillator.start(0);
  return {
    type: INCREMENT_COUNTER
  }
}

export function decrement() {
  return {
    type: DECREMENT_COUNTER
  }
}

export function incrementIfOdd() {
  return (dispatch, getState) => {
    const { oscillator } = getState()

    if (oscillator % 2 === 0) {
      return
    }

    dispatch(increment())
  }
}

export function incrementAsync(delay = 1000) {
  return dispatch => {
    setTimeout(() => {
      dispatch(increment())
    }, delay)
  }
}

export function volumeUp() {
  return {
    type: VOLUME_UP
  }
}

export function volumeDown() {
  return {
    type: VOLUME_DOWN
  }
}
