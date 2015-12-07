import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Oscillator from '../components/Oscillator'

import * as OscillatorActions from '../actions/oscillator'

class App extends Component {
	constructor(props) {
		super(props)
	}

	render() {

		return (
			<div>
				<Oscillator volume={20} pan={30}/>
				<Oscillator/>
			</div>
		);
	}
}

function mapStateToProps(state) {
  return {
    oscillator: state.oscillator
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, OscillatorActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
