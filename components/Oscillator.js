import React, { Component, PropTypes } from 'react'
import Knob from './Knob'
import Visualiser from './Visualiser'

class Oscillator extends Component {
	constructor(props, context) {
		super(props, context)
		this.state = {
			volume: this.props.volume || 75,
			pan: this.props.pan || 0,
			frequency: this.props.frequency || 100,
			isPlaying: false,
			isHovering: false
		}
	}

	onVolumeChange(value) {
		this.setState({'volume': value})
		if (this.gainNode)
			this.gainNode.gain.value = this.state.volume/100
	}

	onPanChange(value) {
		this.setState({'pan': value})
	}

	setFrequency(value) {
		this.setState({'frequency': value})
		if (this.oscillator) {
			this.oscillator.frequency.value = value
		}
	}

	onPlayPause(event) {
		if (this.state.isPlaying) {
			this.setState({'isPlaying': false})
			if (this.oscillator) {
				this.oscillator.stop(0)
			}

			this.refs.viz.stop()
			return
		}

		this.setState({'isPlaying': true})

		this.audioCtx = window.audioCtx || new (window.AudioContext || window.webkitAudioContext)()
		if (!window.audioCtx) {
			window.audioCtx = this.audioCtx
		}
		this.analyser = this.audioCtx.createAnalyser()
		this.analyser.fftSize = 2048
		this.bufferLength = this.analyser.frequencyBinCount
		this.dataArray = new Uint8Array(this.bufferLength)
		this.refs.viz.start(this.analyser)

		this.oscillator = this.audioCtx.createOscillator()
		this.oscillator.type = 'square'
		this.oscillator.frequency.value = this.state.frequency // in hertz

		this.gainNode = this.audioCtx.createGain()
		this.gainNode.gain.value = this.state.volume/100

		this.oscillator.connect(this.gainNode)
		this.gainNode.connect(this.analyser)
		this.analyser.connect(this.audioCtx.destination)

		this.oscillator.start(0)
	}

	render() {
		return (
			<div className="oscillator">
				<div className="oscillator-titlebar">
					<span className="oscillator-title">Oscillator</span>

					<div onClick={(e) => this.onPlayPause(e)} className={this.state.isHovering? 'oscillator-play-pause-hover' : 'oscillator-play-pause'}
						onMouseOver={() => this.setState({isHovering: !this.state.isHovering})}
						onMouseOut={() => this.setState({isHovering: !this.state.isHovering})}>
						<div className={this.state.isPlaying ? 'control-pause' : 'control-play'}></div>
					</div>
				</div>
				<hr/>
				<div className="oscillator-container">
					<Knob title="Volume" type="percent" value={this.state.volume} onChange={(value) => this.onVolumeChange(value)}></Knob>
					<Knob title="Pan" type="percent" value={this.state.pan} minValue={-100} maxValue={100} onChange={(value) => this.onPanChange(value)}></Knob>
					<Knob title="Frequency" type="percent" value={this.state.frequency} minValue={0} maxValue={2000} onChange={(value) => this.setFrequency(value)}></Knob>
					<Visualiser ref="viz"></Visualiser>
				</div>
			</div>
		)
	}
}

export default Oscillator
