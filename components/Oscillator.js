import React, { Component, PropTypes } from 'react'
import Knob from './controls/knobs/Knob'
import WaveSelector from './WaveSelector'
import Visualiser from './Visualiser'
import ADSR from './ADSR'
import BaseAudioComponent from './BaseAudioComponent'

class Oscillator extends BaseAudioComponent {
	constructor(props, context) {
		super(props, context)
		this.state = {
			title: this.props.title || 'Oscillator',
			volume: {
				value: this.props.volume || 75
			},
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
			this.startWebAudio()
		}
	}

	componentWillReceiveProps(data) {
		if (data.isPlaying === true) {
			this.setState({'isPlaying': true})
			this.startWebAudio()
		}
		else if (data.isPlaying === false) {
			this.stopWebAudio()
		}
	}

	onVolumeChange(value) {
		let vol = this.state.volume
		vol.value = value
		const now = this.audioCtx.currentTime
		this.param.cancelScheduledValues(now)
		this.param.linearRampToValueAtTime(value/100, now)
		this.setState({'volume': vol})
		// this.gainNode.gain.value = this.state.volume.value/100
		console.log(this.gainNode.gain.value)
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
			this.stopWebAudio()
			return
		}

		this.setState({'isPlaying': true})
		this.startWebAudio()
	}

	startWebAudio() {
				console.log('123')
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
		this.gainNode.gain.value = this.state.volume.value / 100

		this.oscillator.connect(this.gainNode)
		this.gainNode.connect(this.analyser)
		// this.gainNode.connect(this.envelope)
		this.param = this.gainNode.gain
		const now = this.audioCtx.currentTime
		this.param.cancelScheduledValues(now)
		this.param.setValueAtTime(0, now)
		this.param.linearRampToValueAtTime(1, now + 1)
		this.param.linearRampToValueAtTime(0.8, now + 2)
		this.gainNode.connect(this.audioCtx.destination)

		this.oscillator.start(0)
		// this.stopWebAudio(1)
		this.refs.viz.start(this.analyser)
	}

	stopWebAudio(delay = 0) {
		if (this.oscillator) {
			this.oscillator.stop(delay)
			setTimeout(() => {
				console.log(delay, 'delay')
				this.oscillator = undefined
				this.refs.viz.stop()
				this.setState({'isPlaying': false})
			}, delay * 1000)
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
			<div className={this.state.isSelected? 'oscillator oscillator-hover' : 'oscillator'} ref="container"
				onMouseOver={(e) => this.onMouseOver(e)}
				onMouseOut={(e) => this.onMouseOut(e)}>
				<div className="oscillator-titlebar">
					<span className="oscillator-title">{this.state.title}</span>

					<div onClick={() => this.onPlayPause()} className={this.state.isPlayPauseHovering? 'oscillator-play-pause-hover' : 'oscillator-play-pause'} ref="playPause"
						onMouseOver={() => this.setState({isPlayPauseHovering: !this.state.isPlayPauseHovering})}
						onMouseOut={() => this.setState({isPlayPauseHovering: !this.state.isPlayPauseHovering})}>
						<div className={this.state.isPlaying ? 'control-pause' : 'control-play'}></div>
					</div>
				</div>
				<br/>
				<div className="oscillator-container">
					<Knob title="Volume" type="minimal" value={this.state.volume.value} onChange={value => this.onVolumeChange(value)}></Knob>
					<Knob title="Pan" type="minimal" value={this.state.pan} minValue={-100} maxValue={100} onChange={value => this.onPanChange(value)}></Knob>
					<Knob title="Freq" type="minimal" value={this.state.frequency} minValue={0} maxValue={4000} onChange={value => this.setFrequency(value)}></Knob>
					<WaveSelector value={this.state.waveType} onChange={(waveType) => this.onWaveSelect(waveType)}></WaveSelector>
					<ADSR value={this.state.volume}></ADSR>
					<Visualiser ref="viz"></Visualiser>
				</div>
			</div>
		)
	}
}

export default Oscillator
