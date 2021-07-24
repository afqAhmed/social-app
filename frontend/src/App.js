import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Axios from 'axios'

// Import App Components
import Header from './components/Header'
import HomeGuest from './components/HomeGuest'
import Home from './components/Home'
import FlashMessages from './components/FlashMessages'
import CreatePost from './components/CreatePost'
import SinglePost from './components/SinglePost'
import Footer from './components/Footer'
import About from './components/About'
import Terms from './components/Terms'

import AppContext from './AppContext'

Axios.defaults.baseURL = 'http://localhost:8080'

const App = () => {
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem('appToken')))
  const [flashMessages, setFlashMessages] = useState([])

  const addFlashMessages = (msg) => {
    setFlashMessages((prev) => prev.concat(msg))
  }

  return (
    <AppContext.Provider value={{ flashMsg: addFlashMessages, login: setLoggedIn }}>
      <BrowserRouter>
        <Header loggedIn={loggedIn} />
        <Route>
          <FlashMessages flashMessages={flashMessages} />
        </Route>
        <Switch>
          <Route path="/" exact> {loggedIn ? <Home /> : <HomeGuest />}</Route>
          <Route path="/create-post"><CreatePost /></Route>
          <Route path="/post/:id"><SinglePost /></Route>
          <Route path="/about-us" exact><About /></Route>
          <Route path="/terms" exact><Terms /></Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App