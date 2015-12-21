import React, { Component, PropTypes } from 'react'
import BaseComponent from './BaseComponent'

class WaveCanvas extends BaseComponent {
	constructor(props, context) {
		super(props, context)
		this.state = {
			waveType: this.props.waveType || 'sine',
			isSelected: this.props.isSelected || false,
			isHovering: false
		}
	}

	componentDidMount() {
		this.draw()
	}

	draw() {
		let canvas = this.refs.canvas
		let ctx = canvas.getContext('2d')
		const h = canvas.height
		const w = canvas.width

		ctx.fillStyle = this.state.isSelected ? '#444444' : '#666666';
		ctx.fillRect(0, 0, w, h);
		ctx.lineWidth = this.state.isSelected || this.state.isHovering ? 2 : 1;
		ctx.strokeStyle = 'rgb(200, 200, 200)';
		ctx.beginPath();

		if (this.state.waveType == 'sine') {
			const offset = 2
			ctx.moveTo(offset, h / 2)
			for (var i = offset; i <= w - offset; i++) {
				ctx.lineTo(i, h / 2 - (h - 6 * offset) * Math.sin(2 * Math.PI * (i - offset) / (w - 2 * offset)))
			}
		}
		else if (this.state.waveType == 'square') {
			const offset = 3
			ctx.moveTo(offset, offset - 1)
			ctx.lineTo(offset, h - offset)
			ctx.lineTo(w / 2, h - offset)
			ctx.lineTo(w / 2, offset)
			ctx.lineTo(w - offset, offset)
			ctx.lineTo(w - offset, h - offset + 1)
		}
		else if (this.state.waveType == 'sawtooth') {
			const offset = 3
			ctx.moveTo(offset, offset)
			ctx.lineTo(offset, h - offset)
			ctx.lineTo(w - offset, offset)
			ctx.lineTo(w - offset, h - offset)
		}
		else if (this.state.waveType == 'triangle') {
			const offset = 3
			ctx.moveTo(offset, h - offset)
			ctx.lineTo(w / 2, offset)
			ctx.lineTo(w - offset, h - offset)
		}

		ctx.stroke()
	}

	componentWillReceiveProps(wave) {
		if (wave && wave.waveType == this.state.waveType && wave.isSelected != this.state.isSelected) {
			this.setState({'isSelected': wave.isSelected}, () => this.draw())
		}
	}

	onMouseOver(e) {
		this.setState({'isHovering': true}, () => this.draw())
	}

	onMouseOut(e) {
		this.setState({'isHovering': false}, () => this.draw())
	}

	render() {
		return (
			<div onMouseOver={(e) => this.onMouseOver(e)} onMouseOut={(e) => this.onMouseOut(e)}>
				<canvas ref="canvas" width="20" height="20" className={this.state.isSelected ? 'wavecanvas-selected' : 'wavecanvas'} onClick={() => this.props.onClick(this.state.waveType)}></canvas>
			</div>
		)
	}
}

WaveCanvas.propTypes = {
	onClick: PropTypes.func.isRequired
}

export default WaveCanvas