import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import configureStore from './store/configureStore'
import * as MouseActions from './actions/mouse'

const store = configureStore()

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

window.onmousewheel = function(event) {
	console.log(event);
	document.getElementById('root').dispatchEvent(MouseActions.scrollUp());
}
