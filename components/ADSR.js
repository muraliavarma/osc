import React, { Component, PropTypes } from 'react'
import BaseComponent from './BaseComponent'
import Knob from './controls/knobs/Knob'

// Attack Decay Sustain Release
class ADSR extends BaseComponent {
	constructor(props, context) {
		super(props, context)
		this.state = {
			shouldShow: true,
			value: this.props.value || 0,
			attack: 20,
			hold: 30,
			decay: 30,
			sustain: 40,
			release: 40
		}
	}

	componentDidMount() {
		this.draw()
	}

	draw() {
		const canvas = this.refs.canvas
		const ctx = canvas.getContext('2d')
		const h = canvas.height
		const w = canvas.width
		const hMax = 100
		const wMax = 400
		ctx.fillStyle = 'rgb(20, 20, 20)'
		ctx.fillRect(0, 0, w, h)
		ctx.lineWidth = 2
		ctx.strokeStyle = 'rgb(140, 195, 95)'
		ctx.beginPath()

		ctx.moveTo(0, canvas.height)
		ctx.lineTo((w / wMax) * (this.state.attack), (h / hMax) * (100 - this.state.value))
		ctx.lineTo((w / wMax) * (this.state.attack + this.state.hold), (h / hMax) * (100 - this.state.value))
		ctx.lineTo((w / wMax) * (this.state.attack + this.state.hold + this.state.decay), (h / hMax) * (this.state.sustain + 100 - this.state.value))
		ctx.lineTo((w / wMax) * (this.state.attack + this.state.hold + this.state.decay + this.state.release), h)
		ctx.stroke()
		ctx.closePath()
		ctx.fillStyle = 'rgb(20, 30, 20)'
		ctx.fill()
	}

	onChange(type, val) {
		this.setState({[type]: val}, () => this.draw())
	}

	componentWillReceiveProps(data) {
		if (data.value && data.value != this.state.value) {
			console.log(data.value, this.state.value)
			this.onChange('value', data.value)
		}
	}


	render() {
		return (
			<div className="adsr-container">
				<canvas ref="canvas" className="adsr-canvas"
					style={{
						display: this.state.shouldShow ? 'inline' : 'none'
					}}>
				></canvas>
				<div className="adsr-controls">
					<Knob title="Attack" type="mini" value={this.state.attack} onChange={(val) => this.onChange('attack', val)}></Knob>
					<Knob title="Hold" type="mini" value={this.state.hold} onChange={(val) => this.onChange('hold', val)}></Knob>
					<Knob title="Decay" type="mini" value={this.state.decay} onChange={(val) => this.onChange('decay', val)}></Knob>
					<Knob title="Sustain" type="mini" value={this.state.sustain} onChange={(val) => this.onChange('sustain', val)}></Knob>
					<Knob title="Release" type="mini" value={this.state.release}  onChange={(val) => this.onChange('release', val)}></Knob>
				</div>
			</div>
		)
	}
}

export default ADSR