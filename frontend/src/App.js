import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Axios from 'axios'


// Import App Components
import Header from './components/Header'
import HomeGuest from './components/HomeGuest'
import Footer from './components/Footer'
import About from './components/About'
import Terms from './components/Terms'

Axios.defaults.baseURL = 'http://localhost:8080'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact> <HomeGuest /> </Route>
        <Route path="/about-us" exact> <About /> </Route>
        <Route path="/terms" exact> <Terms /> </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default App