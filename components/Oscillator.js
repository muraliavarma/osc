import React, { Component, PropTypes } from 'react'
import Knob from './Knob'

class Oscillator extends Component {
	constructor(props, context) {
		super(props, context)
		this.state = {
			volume: this.props.volume || 75,
			pan: this.props.pan || 0,
			frequency: this.props.frequency || 100,
			isPlaying: false
		}
	}

	onVolumeChange(value) {
		this.state.volume = value
		if (this.gainNode)
			this.gainNode.gain.value = this.state.volume/100
	}

	onPanChange(value) {
		this.state.pan = value
	}

	onFrequencyChange(value) {
		this.state.frequency = value
		if (this.oscillator)
			this.oscillator.frequency.value = this.state.frequency
	}

	onPlayPause(event) {
		if (this.state.isPlaying) {
			this.state.isPlaying = false
			if (this.oscillator) {
				this.oscillator.stop(0)
			}

			return
		}

		this.state.isPlaying = true

		this.audioCtx = new (window.AudioContext || window.webkitAudioContext)()
		this.oscillator = this.audioCtx.createOscillator()
		this.oscillator.type = 'sine'
		this.oscillator.frequency.value = this.state.frequency // in hertz

		this.gainNode = this.audioCtx.createGain()
		this.gainNode.gain.value = this.state.volume/100

		this.oscillator.connect(this.gainNode)
		this.gainNode.connect(this.audioCtx.destination)

		this.oscillator.start(0)

	}

	render() {
		const { volume, pan, frequency, isPlaying } = this.props
		return (
			// <p>
			//   Clicked: {oscillator} times
			//   {' '}
			//   <button onClick={increment}>+</button>
			//   {' '}
			//   <button onClick={decrement}>-</button>
			//   {' '}
			//   <button onClick={incrementIfOdd}>Increment if odd</button>
			//   {' '}
			//   <button onClick={() => incrementAsync()}>Increment async</button>
			// </p>
			<div className="oscillator">
				<div className="oscillator-titlebar">
					<span className="oscillator-title">Oscillator</span>
					<button onClick={(e) => this.onPlayPause(e)}>Play/Pause</button>
				</div>
				<hr/>
				<div className="oscillator-container">
					<Knob title="Volume" type="percent" value={volume} onChange={(e) => this.onVolumeChange(e)}></Knob>
					<Knob title="Pan" type="percent" value={pan} minValue={-100} maxValue={100} onChange={(e) => this.onPanChange(e)}></Knob>
					<Knob title="Frequency" type="percent" value={frequency} minValue={0} maxValue={2000} onChange={(e) => this.onFrequencyChange(e)}></Knob>
				</div>
			</div>
			)
	}
}

Oscillator.propTypes = {
	// increment: PropTypes.func.isRequired,
	// incrementIfOdd: PropTypes.func.isRequired,
	// incrementAsync: PropTypes.func.isRequired,
	// decrement: PropTypes.func.isRequired,
	// oscillator: PropTypes.number.isRequired,
	// volumeUp: PropTypes.func.isRequired,
	// volumeDown: PropTypes.func.isRequired
}

export default Oscillator
