import React, { Component, PropTypes } from 'react'
import BaseComponent from './BaseComponent'
import Pattern from './Pattern'

class Song extends BaseComponent {
	constructor(props, context) {
		super(props, context)

		this.state = {
			song: [{
				patternIdx: 0,
				startBar: 0
			}],
			patterns: [{
				idx: 0,
				title: 'Piano 01',
				notes: ['3C3', '2D3', '2G3'],
				oscillators: [0, 1]
			}],
			oscillators: [{
				idx: 0,
				title: 'Triangle',
				volume: 40,
				pan: 30,
				waveType: 'triangle'
			}, {
				idx: 1,
				title: 'Square',
				volume: 50,
				pan: 30,
				waveType: 'square'
			}, {
				idx: 2,
				title: 'Sine',
				volume: 60,
				pan: 30,
				waveType: 'sine'
			}]
		}
	}

	render() {
		return (
			<div>
				<div className="song">
					{this.state.song.map((pattern, index) => 
						<Pattern
							key={index}
							title={this.state.patterns[pattern.patternIdx].title}
							notes={this.state.patterns[pattern.patternIdx].notes}
							oscillators={this.state.patterns[pattern.patternIdx].oscillators.map((oscillatorId, index) => this.state.oscillators[oscillatorId])}
						 />
					)}
				</div>
			</div>
		)
	}
}

Song.propTypes = {
	
}

export default Song