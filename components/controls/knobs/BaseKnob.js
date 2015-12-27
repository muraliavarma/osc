import React, { Component, PropTypes } from 'react'
import BaseComponent from '../../BaseComponent'

class BaseKnob extends BaseComponent {
	constructor(props, context) {
		super(props, context)
		this.state = {
			value: this.props.value,
			minValue: this.props.minValue || 0,
			maxValue: this.props.maxValue || 100
		}
	}

	onWheel(event) {
		event.preventDefault()
		this.setState({'value': Math.min(Math.max(this.state.minValue, this.state.value - event.deltaY), this.state.maxValue)}, () => this.notifyChange())
	}
}

export default BaseKnob