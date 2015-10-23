import Dom from 'react-dom'
import React from 'react'
import injectTapEvent from 'react-tap-event-plugin'
import {Router} from 'react-router'
import createHistory from 'history/lib/createBrowserHistory'
import {Provider} from 'react-redux'

import AppRoutes from './app-routes'
import AppStore from './store'

window.React = React
injectTapEvent()

let history = createHistory()
let handleRouteUpdate = () => window.scrollTo(0, 0)
let store = AppStore()

Dom.render((
  <Provider store={store}>
    <Router history={history} onUpdate={handleRouteUpdate}>
      {AppRoutes}
    </Router>
  </Provider>
), document.querySelector("#app"))
