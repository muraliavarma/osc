import React, { Component, PropTypes } from 'react'
import BaseComponent from './BaseComponent'
import Oscillator from './Oscillator'

class Pattern extends BaseComponent {
	constructor(props, context) {
		super(props, context)

		this.state = {
			oscillators: this.props.oscillators || [],
			notes: this.props.notes || [],
			title: this.props.title || 'Osc'
		}
	}

	render() {
		return (
			<div>
				<div className="pattern-list">
					{this.state.notes.map((note, index) => 
						<span key={index}>{note}</span>
					)}
				</div>
				<div className="oscillator-list">
					{this.state.oscillators.map((oscillator, index) => 
						<Oscillator
							key={index} {...oscillator}
						 />
					)}
				</div>
			</div>
		)
	}
}

Pattern.propTypes = {
	
}

export default Pattern