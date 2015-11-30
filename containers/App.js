import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Oscillator from '../components/Oscillator'
import Knob from '../components/Knob'

import * as OscillatorActions from '../actions/oscillator'
import * as KnobActions from '../actions/knob'

function mapStateToProps(state) {
  return {
    oscillator: state.oscillator
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(OscillatorActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Oscillator)
