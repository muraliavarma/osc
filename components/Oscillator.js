import React, { Component, PropTypes } from 'react'
import Knob from './Knob'

class Oscillator extends Component {
	constructor(props, context) {
		super(props, context)
		this.state = {
			volume: this.props.volume || 75
		}
	}

	render() {
		const { increment, incrementIfOdd, incrementAsync, decrement, oscillator, volume } = this.props
		return (
			// <p>
			//   Clicked: {oscillator} times
			//   {' '}
			//   <button onClick={increment}>+</button>
			//   {' '}
			//   <button onClick={decrement}>-</button>
			//   {' '}
			//   <button onClick={incrementIfOdd}>Increment if odd</button>
			//   {' '}
			//   <button onClick={() => incrementAsync()}>Increment async</button>
			// </p>
			<div className="oscillator">
				Oscillator
				<hr/>
				<Knob title="Volume" type="percent"></Knob>
			</div>
			)
	}
}

Oscillator.propTypes = {
	increment: PropTypes.func.isRequired,
	incrementIfOdd: PropTypes.func.isRequired,
	incrementAsync: PropTypes.func.isRequired,
	decrement: PropTypes.func.isRequired,
	oscillator: PropTypes.number.isRequired,
	volumeUp: PropTypes.func.isRequired,
	volumeDown: PropTypes.func.isRequired
}

export default Oscillator
