import React, { Component, PropTypes } from 'react'
import Knob from './controls/knobs/Knob'
import WaveSelector from './WaveSelector'
import Visualiser from './Visualiser'

class Oscillator extends Component {
	constructor(props, context) {
		super(props, context)
		this.state = {
			volume: this.props.volume || 75,
			pan: this.props.pan || 0,
			frequency: this.props.frequency || 100,
			isPlaying: this.props.isPlaying || false,
			waveType: this.props.waveType || 'sine',
			isPlayPauseHovering: false,
			isSelected: false
		}
	}

	componentDidMount() {
		if (this.state.isPlaying) {
			this.startWebAudio();
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

	onPlayPause() {
		if (this.state.isPlaying) {
			this.setState({'isPlaying': false})
			this.stopWebAudio()
			return
		}

		this.setState({'isPlaying': true})
		this.startWebAudio()
	}

	startWebAudio() {
		this.audioCtx = window.audioCtx || new (window.AudioContext || window.webkitAudioContext)()
		if (!window.audioCtx) {
			window.audioCtx = this.audioCtx
		}
		this.analyser = this.audioCtx.createAnalyser()
		this.analyser.fftSize = 2048
		this.bufferLength = this.analyser.frequencyBinCount
		this.dataArray = new Uint8Array(this.bufferLength)

		this.oscillator = this.audioCtx.createOscillator()
		this.oscillator.type = this.state.waveType
		this.oscillator.frequency.value = this.state.frequency // in hertz

		this.gainNode = this.audioCtx.createGain()
		this.gainNode.gain.value = this.state.volume/100

		this.oscillator.connect(this.gainNode)
		this.gainNode.connect(this.analyser)
		this.analyser.connect(this.audioCtx.destination)

		this.oscillator.start(0)
		this.refs.viz.start(this.analyser)
	}

	stopWebAudio() {
		if (this.oscillator) {
			this.oscillator.stop(0)
			this.oscillator.disconnect()
			this.refs.viz.stop()
		}
	}

	restartWebAudio() {
		if (this.state.isPlaying) {
			this.stopWebAudio()
			this.startWebAudio()
		}
	}

	onWaveSelect(waveType) {
		this.setState({'waveType': waveType}, () => this.restartWebAudio())
	}

	onMouseOver(e) {
		if (e.target == this.refs.playPause) {
			this.setState({isPlayPauseHovering: true})
		}
		else if (!this.state.isSelected) {
			this.setState({isSelected: true})
		}
	}

	onMouseOut(e) {
		if (e.target == this.refs.playPause) {
			this.setState({isPlayPauseHovering: false})
		}
		else if (!this.refs.container.contains(e.relatedTarget)) {
			this.setState({isSelected: false})
		}
	}

	render() {
		return (
			<div className={this.state.isSelected? 'oscillator-hover' : 'oscillator'} ref="container"
				onMouseOver={(e) => this.onMouseOver(e)}
				onMouseOut={(e) => this.onMouseOut(e)}>
				<div className="oscillator-titlebar">
					<span className="oscillator-title">Oscillator</span>

					<div onClick={() => this.onPlayPause()} className={this.state.isPlayPauseHovering? 'oscillator-play-pause-hover' : 'oscillator-play-pause'} ref="playPause"
						onMouseOver={() => this.setState({isPlayPauseHovering: !this.state.isPlayPauseHovering})}
						onMouseOut={() => this.setState({isPlayPauseHovering: !this.state.isPlayPauseHovering})}>
						<div className={this.state.isPlaying ? 'control-pause' : 'control-play'}></div>
					</div>
				</div>
				<hr/>
				<div className="oscillator-container">
					<Knob title="Volume" type="plastic" value={this.state.volume} onChange={value => this.onVolumeChange(value)}></Knob>
					<Knob title="Pan" type="minimal" value={this.state.pan} minValue={-100} maxValue={100} onChange={value => this.onPanChange(value)}></Knob>
					<Knob title="Frequency" type="minimal" value={this.state.frequency} minValue={0} maxValue={2000} onChange={value => this.setFrequency(value)}></Knob>
					<WaveSelector value={this.state.waveType} onChange={(waveType) => this.onWaveSelect(waveType)}></WaveSelector>
					<Visualiser ref="viz"></Visualiser>
				</div>
			</div>
		)
	}
}

export default Oscillator
