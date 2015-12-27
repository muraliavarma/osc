import React, { Component, PropTypes } from 'react'
import BaseComponent from '../BaseComponent'

class PlayPause extends BaseComponent {
	constructor(props, context) {
		super(props, context)
		this.state = {
			isPlaying: this.props.isPlaying || false,
			isHovering: false
		}
	}

	componentDidMount() {
		this.draw()
	}

	draw() {
		let canvas = this.refs.canvas
		let ctx = canvas.getContext('2d')
		ctx.clearRect(0, 0, canvas.width, canvas.height)

		ctx.lineWidth = 1
		ctx.fillStyle = this.state.isHovering ? 'rgb(240, 240, 220)' : 'rgb(200, 200, 200)'
		ctx.strokeStyle = this.state.isHovering ? 'rgb(240, 240, 220)' : 'rgb(200, 200, 200)'
		ctx.strokeRect(1, 1, canvas.width - 1, canvas.height - 1)

		const centerX = canvas.width / 2
		const centerY = canvas.height / 2

		ctx.lineWidth = 2
		ctx.beginPath()
		if (this.state.isPlaying) {
			ctx.moveTo(centerX - 2, centerY - 4)
			ctx.lineTo(centerX - 2, centerY + 4)
			ctx.moveTo(centerX + 2, centerY - 4)
			ctx.lineTo(centerX + 2, centerY + 4)
		}
		else {
			ctx.moveTo(centerX + 3, centerY)
			ctx.lineTo(centerX - 2, 6)
			ctx.lineTo(centerX - 2, canvas.height - 6)
		}

		ctx.closePath()
		ctx.stroke()
		ctx.fill()
	}

	onMouseOver(e) {
		this.setState({'isHovering': true}, () => this.draw())
	}

	onMouseOut(e) {
		this.setState({'isHovering': false}, () => this.draw())
	}

	onPlayPause() {
		this.setState({'isPlaying': !this.state.isPlaying}, () => {
			this.draw()
			this.props.onChange(this.state.isPlaying)
		})
	}

	render() {
		return (
			<div onMouseOver={(e) => this.onMouseOver(e)} onMouseOut={(e) => this.onMouseOut(e)} onClick={() => this.onPlayPause()}>
				<canvas ref="canvas" width="20" height="20" className={this.state.isPlaying ? 'playpause-selected' : 'playpause'}></canvas>
			</div>
		)
	}
}

PlayPause.propTypes = {
	onChange: PropTypes.func.isRequired
}

export default PlayPause