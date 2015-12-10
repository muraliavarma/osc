import React, { Component, PropTypes } from 'react'
import BaseComponent from './BaseComponent'
import WaveCanvas from './WaveCanvas'

class WaveSelector extends BaseComponent {
	constructor(props, context) {
		super(props, context)
		this.state = {
			waves: [{type: 'sine', selected: true}, {type: 'square'}, {type: 'sawtooth'}, {type: 'triangle'}]
		}
	}

	onWaveTypeSelect(waveType) {
		event.preventDefault()
		var waves = this.state.waves
		for (let i in waves) {
			if (waves[i].type == waveType) {
				waves[i].selected = true
			}
			else {
				waves[i].selected = false
			}
		}

		this.setState({'waves': waves})
		this.props.onChange(waveType)
	}

	render() {
		return (
			<div className="waveselector-container">
				<div>
					{this.state.waves.map((item, index) =>
						<WaveCanvas key={index} waveType={item.type} onClick={(waveType) => this.onWaveTypeSelect(waveType)} isSelected={item.selected}></WaveCanvas>
					)}
				</div>
			</div>
		)
	}
}

WaveSelector.propTypes = {
	onChange: PropTypes.func.isRequired
}

export default WaveSelector