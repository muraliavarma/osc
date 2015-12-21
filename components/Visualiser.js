import React, { Component, PropTypes } from 'react'
import BaseComponent from './BaseComponent'

class Visualiser extends BaseComponent {
	constructor(props, context) {
		super(props, context)
		this.state = {
			shouldShow: false
		}
	}

	start(analyser) {
		this.setState({shouldShow: true})
		this.analyser = analyser
		this.bufferLength = this.analyser.frequencyBinCount
		this.dataArray = new Uint8Array(this.bufferLength)
		this.draw()
	}

	stop() {
		this.setState({shouldShow: false})
		cancelAnimationFrame(this.drawLoop)
		this.drawLoop = false
	}

	draw() {
		this.drawLoop = requestAnimationFrame(() => {
			this.draw()
		})
		this.analyser.getByteTimeDomainData(this.dataArray);
		var canvas = this.refs.canvas
		var ctx = canvas.getContext('2d')

		this.analyser.getByteTimeDomainData(this.dataArray);

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.lineWidth = 1;
		ctx.strokeStyle = 'rgb(40, 95, 95)';
		ctx.beginPath();

		var sliceWidth = canvas.width * 1.0 / this.bufferLength;
		var x = 0;

		for(var i = 0; i < this.bufferLength; i++) {

			var v = this.dataArray[i] / 128.0;
			var y = v * canvas.height/2;

			if(i === 0) {
				ctx.moveTo(x, y);
			} else {
				ctx.lineTo(x, y);
			}

			x += sliceWidth;
		};

		ctx.lineTo(canvas.width, canvas.height/2);
		ctx.stroke();
	}

	render() {
		return (
			<canvas ref="canvas" className="visualiser"
				style={{
					display: this.state.shouldShow ? 'inline' : 'none'
				}}>
			></canvas>
		)
	}
}

export default Visualiser