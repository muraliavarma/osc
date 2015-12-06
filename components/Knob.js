import React, { Component, PropTypes } from 'react'
import BaseComponent from './BaseComponent'
import * as MouseActions from '../actions/mouse'

class Knob extends BaseComponent {
	constructor(props, context) {
		super(props, context)
		this.state = {
			value: this.props.initialValue || 50,
			minValue: this.props.minValue || 0,
			maxValue: this.props.maxValue || 100
		}
	}

	componentDidMount() {
		addEventListener(MouseActions.SCROLL_UP, function(e) {
			console.log('murs1', e);
		})
		// if (!window.onmousewheel) {
	 //    	window.onmousewheel = this.handleScroll;
	 //    }
	}

	handleScroll(event) {
		// debugger;
	 //    let scrollTop = event.srcElement.body.scrollTop,
	 //        itemTranslate = Math.min(0, scrollTop/3 - 60);

	 //    this.setState({
	 //      transform: itemTranslate
	 //    });
	}

	render() {
		const { title } = this.props
		return (
			<div className="knob-container">
				<div className="knob-circle">
					<div className="knob-needle">
					</div>
				</div>
				<div className="knob-title">{title} : {this.state.value}</div>
			</div>
		)
	}
}

Knob.propTypes = {
	title: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired
}

export default Knob