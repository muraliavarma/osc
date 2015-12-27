import React, { Component, PropTypes } from 'react'
import BaseComponent from '../BaseComponent'
import Knob from '../controls/knobs/Knob'
import PlayPause from '../controls/PlayPause'

class Toolbar extends BaseComponent {
	constructor(props, context) {
		super(props, context)
		this.state = {
			isPlaying: this.props.isPlaying || false,
			bpm: 120
		}
	}

	setBpm(val) {
		this.setState({'bpm': val})
	}

	render() {
		return (
			<div className="toolbar-container">
				<span className="toolbar-title">Osc</span>
				<div>
					<Knob type="toolbar" title={this.state.bpm+' bpm'} value={this.state.bpm} minValue={8} maxValue={256} onChange={(val) => this.setBpm(val)}></Knob>
				</div>
				<div className="toolbar-play">
					<PlayPause isPlaying={this.state.isPlaying} onChange={(val) => this.props.onPlayPause(val)}></PlayPause>
				</div>
			</div>
		)
	}
}

Toolbar.propTypes = {
	onPlayPause: PropTypes.func.isRequired
}

export default Toolbar