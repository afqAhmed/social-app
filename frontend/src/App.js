import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Axios from 'axios'
import { useImmerReducer } from 'use-immer'

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

// Import Context API
import StateContext from './StateContext'
import DispatchContext from './DispatchContext'

Axios.defaults.baseURL = 'http://localhost:8080'

const App = () => {
  const init = {
    loggedIn: Boolean(localStorage.getItem('appToken')),
    flashMessages: [],
  }

  const reducer = (draft, action) => {
    switch (action.type) {
      case 'login':
        draft.loggedIn = true
        return
      case 'logout':
        draft.loggedIn = false
        return
      case 'flashMessages':
        draft.flashMessages.push(action.value)
        return
    }
  }

  const [state, dispatch] = useImmerReducer(reducer, init)

  return (
    <StateContext.Provider value={ state }>
      <DispatchContext.Provider value={ dispatch }>
        <BrowserRouter>
          <Header />
          <Route><FlashMessages flashMessages={state.flashMessages} /></Route>
          <Switch>
            <Route path="/" exact> {state.loggedIn ? <Home /> : <HomeGuest />}</Route>
            <Route path="/create-post"><CreatePost /></Route>
            <Route path="/post/:id"><SinglePost /></Route>
            <Route path="/about-us"><About /></Route>
            <Route path="/terms"><Terms /></Route>
          </Switch>
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export default App