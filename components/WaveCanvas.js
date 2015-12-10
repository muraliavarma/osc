import React, { Component, PropTypes } from 'react'
import BaseComponent from './BaseComponent'

class WaveCanvas extends BaseComponent {
	constructor(props, context) {
		super(props, context)
		this.state = {
			waveType: this.props.waveType || 'sine',
			isSelected: this.props.isSelected || false
		}
	}

	componentDidMount() {
		var canvas = this.refs.canvas
		var ctx = canvas.getContext('2d')

		ctx.fillStyle = '#FFFFFF';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		console.log(canvas.width, canvas.height)
		ctx.lineWidth = 1;
		ctx.strokeStyle = 'rgb(40, 95, 95)';
		ctx.beginPath();

		if (this.state.waveType == 'sine') {
			const offset = 2
			ctx.moveTo(offset, canvas.height / 2)
			for (var i = offset; i <= canvas.width - offset; i++) {
				ctx.lineTo(i, canvas.height / 2 - (canvas.height - 6 * offset) * Math.sin(2 * Math.PI * (i - offset) / (canvas.width - 2 * offset)))
			}
		}
		else if (this.state.waveType == 'square') {
			const offset = 3
			ctx.moveTo(offset, offset)
			ctx.lineTo(offset, canvas.height - offset)
			ctx.lineTo(canvas.width / 2, canvas.height - offset)
			ctx.lineTo(canvas.width / 2, offset)
			ctx.lineTo(canvas.width - offset, offset)
			ctx.lineTo(canvas.width - offset, canvas.height - offset)
		}
		else if (this.state.waveType == 'sawtooth') {
			const offset = 3
			ctx.moveTo(offset, offset)
			ctx.lineTo(offset, canvas.height - offset)
			ctx.lineTo(canvas.width - offset, offset)
			ctx.lineTo(canvas.width - offset, canvas.height - offset)
		}
		else if (this.state.waveType == 'triangle') {
			const offset = 3
			ctx.moveTo(offset, canvas.height - offset)
			ctx.lineTo(canvas.width / 2, offset)
			ctx.lineTo(canvas.width - offset, canvas.height - offset)
		}

		ctx.stroke()

		// var sliceWidth = canvas.width * 1.0 / this.bufferLength;
		// var x = 0;

		// for(var i = 0; i < this.bufferLength; i++) {

		// 	var v = this.dataArray[i] / 128.0;
		// 	var y = v * canvas.height/2;

		// 	if(i === 0) {
		// 		ctx.moveTo(x, y);
		// 	} else {
		// 		ctx.lineTo(x, y);
		// 	}

		// 	x += sliceWidth;
		// };

		// ctx.lineTo(canvas.width, canvas.height/2);
		// ctx.stroke();
	}

	componentWillReceiveProps(wave) {
		if (wave && wave.waveType == this.state.waveType && wave.isSelected) {
			this.setState({'isSelected': true})
		}
		else {
			this.setState({'isSelected': false})
		}
	}

	render() {
		return (
			<canvas ref="canvas" width="20" height="20" className={this.state.isSelected ? 'wavecanvas-selected' : 'wavecanvas'} onClick={() => this.props.onClick(this.state.waveType)}></canvas>
		)
	}
}

WaveCanvas.propTypes = {
	onClick: PropTypes.func.isRequired
}

export default WaveCanvas