import React, { Component, PropTypes } from 'react'
import BaseComponent from './BaseComponent'

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
		this.setState({'value': Math.min(Math.max(this.state.minValue, this.state.value - event.deltaY), this.state.maxValue)})
		this.props.onChange(this.state.value)
		event.preventDefault()
	}

	render() {
		const { title } = this.props
		return (
			<div className="knob-container" onWheel={(e) => this.onWheel(e)}>
				<div className="knob-circle"
					style={{
						transform: 'rotate(' + (270.0 * (this.state.value - this.state.minValue) / (this.state.maxValue - this.state.minValue) - 135) + 'deg)'
					}}>
					<div className="knob-needle">
					</div>
				</div>
				<div className="knob-title">{title}<br/>{this.state.value}</div>
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