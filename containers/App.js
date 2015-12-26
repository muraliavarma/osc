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
					title: 'Triangle',
					volume: 40,
					pan: 30,
					waveType: 'triangle',
					isPlaying: false
				},{
					volume: 20,
					pan: 40,
					frequency: 1000
				}, {
					isPlaying: false,
					waveType: 'triangle',
					frequency: 2000
				}, {
					isPlaying: false,
					waveType: 'square',
					frequency: 500
				}, {
					isPlaying: false,
					waveType: 'triangle',
					frequency: 200
				}, {
					isPlaying: false
				}, {
					isPlaying: false
				}]
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
				<div className="oscillator-list">
					{this.state.data.oscillators.map((oscillator, index) => 
						<Oscillator
							key={index} {...oscillator}
						 />
					)}
				</div>
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
