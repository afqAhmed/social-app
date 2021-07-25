import React, { useReducer } from 'react'
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
  const init = {
    loggedIn: Boolean(localStorage.getItem('appToken')),
    flashMessages: [],
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'login':
        return { loggedIn: true, flashMessages: state.flashMessages}
      case 'logout':
        return { loggedIn: false, flashMessages: state.flashMessages}
      case 'flashMessages':
        return { loggedIn: state.loggedIn, flashMessages: state.flashMessages.concat(action.value)}
    }
  }

  const [state, dispatch] = useReducer(reducer, init)

  /*
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem('appToken')))
  const [flashMessages, setFlashMessages] = useState([])

  const addFlashMessages = (msg) => {
    setFlashMessages((prev) => prev.concat(msg))
  }
  */

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