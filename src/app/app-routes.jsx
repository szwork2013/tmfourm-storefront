import {Route, IndexRoute, Redirect} from 'react-router'
import React from 'react'

import Module from './pages/module'
import MainPage from './pages/main'
import OffersPage from './pages/offers'
import OfferPage from './pages/offer'
import ShoppingcartPage from './pages/shoppingcart'
import OrdersPage from './pages/orders'

let Home = props => (
  <div>Home</div>
)

let Notfound = props => (
  <div> Not found </div>
)

let AppRoutes = (
  <Route path="/" component={MainPage}>
    <IndexRoute component={Home}/>
    <Route path="home" component={Home}/>
    <Route path="offers" component={Module}>
      <IndexRoute component={OffersPage}/>
      <Route path=":id" component={OfferPage}/>
    </Route>
    <Route path="shoppingcart" component={ShoppingcartPage}/>
    <Route path="orders" component={OrdersPage}/>
    <Route path="*" component={Notfound}/>
  </Route>
)

export default AppRoutes