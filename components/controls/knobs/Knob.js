import React, { Component, PropTypes } from 'react'
import BaseComponent from '../../BaseComponent'

class Knob extends BaseComponent {
	constructor(props, context) {
		super(props, context)
		this.state = {
			value: this.props.value || 50,
			minValue: this.props.minValue || 0,
			maxValue: this.props.maxValue || 100
		}
	}

	onWheel(event) {
		event.preventDefault()
		this.setState({'value': Math.min(Math.max(this.state.minValue, this.state.value - event.deltaY), this.state.maxValue)}, () => this.notifyChange())
	}

	componentDidMount() {
		this.drawCanvas()
	}

	drawCanvas() {
		requestAnimationFrame(() => {
			this.drawCanvas()
		})

		if (this.props.type == 'minimal') {
			let canvas = this.refs.canvas
			let ctx = canvas.getContext('2d')
			ctx.clearRect(0, 0, canvas.width, canvas.height)

			ctx.lineWidth = 1
			ctx.strokeStyle = 'rgb(40, 95, 95)'
			const centerX = canvas.width / 2
			const centerY = canvas.height / 2
			const innerR = 15
			const outerR = 25
			const rootTwoInverse = 1 / Math.sqrt(2)
			const fillAngle = 135 + 270 * (this.state.value - this.state.minValue) / (this.state.maxValue - this.state.minValue)
			const angleOffset = 270

			// container
			ctx.beginPath()
			ctx.moveTo(centerX - innerR * rootTwoInverse, centerY + innerR * rootTwoInverse)
			ctx.arc(centerX, centerY, innerR, (-135 + angleOffset) * Math.PI / 180, (135 + angleOffset) * Math.PI / 180)
			ctx.lineTo(centerX + outerR * rootTwoInverse, centerY + outerR * rootTwoInverse)
			ctx.moveTo(centerX - innerR * rootTwoInverse, centerY + innerR * rootTwoInverse)
			ctx.arc(centerX, centerY, outerR, (-135 + angleOffset) * Math.PI / 180, (135 + angleOffset) * Math.PI / 180)
			ctx.moveTo(centerX - innerR * rootTwoInverse, centerY + innerR * rootTwoInverse)
			ctx.closePath()
			ctx.stroke()

			// fill
			ctx.beginPath()
			ctx.moveTo(centerX - innerR * rootTwoInverse, centerY + innerR * rootTwoInverse)
			ctx.arc(centerX, centerY, innerR, (-135 + angleOffset) * Math.PI / 180, fillAngle * Math.PI / 180)
			ctx.lineTo(centerX + outerR * Math.cos(fillAngle * Math.PI / 180), centerY + outerR * Math.sin(fillAngle * Math.PI / 180))
			ctx.arc(centerX, centerY, outerR, fillAngle * Math.PI / 180, (-135 + angleOffset) * Math.PI / 180, true)
			ctx.moveTo(centerX - innerR * rootTwoInverse, centerY + innerR * rootTwoInverse)
			ctx.closePath()
			ctx.fill()

			// show text value
			ctx.font = '10px Arial';
			ctx.textAlign = 'center';
			ctx.fillText(this.state.value, centerX, centerY)
		}
	}

	onClick(event) {
		let canvas = this.refs.canvas
		const x = event.pageX - canvas.offsetLeft
		const y = event.pageY - canvas.offsetTop
		const centerX = canvas.width / 2
		const centerY = canvas.height / 2
		const angle = 90 + (180/Math.PI) * Math.atan((y - canvas.height/2)/(x - canvas.width/2))
		let value = this.state.value || 0
		if (angle > 135 && x > centerX) {
			value = this.state.maxValue
		}
		else if (angle < 45 && x < centerX) {
			value = this.state.minValue
		}
		else if (x > centerX) {
			value = (this.state.maxValue + this.state.minValue) / 2 + parseInt((angle * (this.state.maxValue - this.state.minValue) / 270))
		}
		else {
			value = (this.state.maxValue + this.state.minValue) / 2 + parseInt(((angle - 180) * (this.state.maxValue - this.state.minValue) / 270))
		}

		this.setState({'value': value}, () => this.notifyChange())
	}

	notifyChange() {
		this.drawCanvas()
		this.props.onChange(this.state.value)
	}

	render() {
		const { title } = this.props
		if (this.props.type == 'minimal') {
			return (
				<div className="knob-container">
					<canvas ref="canvas" width="50" height="50" className="knob-minimal" onWheel={(e) => this.onWheel(e)} onClick={(e) => this.onClick(e)}></canvas>
					<div className="knob-title">{title}</div>
				</div>
			)
		}
		return (
			<div className="knob-container" onWheel={(e) => this.onWheel(e)}>
				<div className="knob-circle"
					style={{
						transform: 'rotate(' + (270.0 * (this.state.value - this.state.minValue) / (this.state.maxValue - this.state.minValue) - 135) + 'deg)'
					}}>
					<div className="knob-needle">
					</div>
				</div>
				<div className="knob-title">{this.state.value}<br/>{title}</div>
			</div>
		)
	}
}

Knob.propTypes = {
	title: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
}

export default Knob