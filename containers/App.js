import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Oscillator from '../components/Oscillator'
import Toolbar from '../components/controls/Toolbar'

import * as OscillatorActions from '../actions/oscillator'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: {
				playback: {
					isPlaying: false
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
		if (this.state.isPlaying) {
			this.play()
		}
		document.addEventListener("keydown", this.onKeyDown, false);
	}

	onKeyDown(event) {

	}

	onPlayPause(isPlaying) {
		let data = Object.assign({}, this.state.data)
		data.oscillators.map((item) => {
			item.isPlaying = isPlaying
			return item
		})
		this.setState({'data': data})
	}

	render() {
		return (
			<div>
				<Toolbar isPlaying={this.state.data.playback.isPlaying} onPlayPause={(val) => this.onPlayPause(val)}></Toolbar>
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
