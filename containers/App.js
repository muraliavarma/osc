import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Oscillator from '../components/Oscillator'

import * as OscillatorActions from '../actions/oscillator'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: {
				playback: {
					isPlaying: true
				},
				oscillators: [{
					volume: 40,
					pan: 30,
					waveType: 'triangle',
					isPlaying: false
				},{
					volume: 20,
					pan: 40,
					frequency: 1000
				},{},{}]
			}
		}
	}

	componentDidMount() {
		document.addEventListener("keydown", this.onKeyDown, false);
	}

	onKeyDown(event) {
		console.log(event.keyCode)
	}

	render() {
		return (
			<div>
				{this.state.data.oscillators.map((oscillator, index) => 
					<Oscillator
						key={index} {...oscillator}
					 />
				)}
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
