import React, { Component, PropTypes } from 'react'
import * as MouseActions from '../actions/mouse'

class BaseComponent extends Component {
	constructor(props, context) {
		super(props, context)
		if (!window.onmousewheel) {
	    	window.onmousewheel = this.onMouseWheel;
	    }
	}

	componentDidMount() {
		addEventListener(MouseActions.SCROLL_UP, function(e) {
			console.log('murs1', e);
		})
		console.log('murs2', this.props);
	}

	onMouseWheel(event) {
		debugger;
		dispatch(MouseActions.scrollUp())
	    // let scrollTop = event.srcElement.body.scrollTop,
	    //     itemTranslate = Math.min(0, scrollTop/3 - 60);

	    // this.setState({
	    //   transform: itemTranslate
	    // });
	}
}

export default BaseComponent