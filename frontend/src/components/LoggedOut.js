import React, { useState } from 'react'
import Axios from 'axios'

const LoggedOut = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await Axios.post('/login', { username, password })
      if (response.data) {
        localStorage.setItem('appToken', response.data.token)
        localStorage.setItem('appUsername', response.data.username)
        localStorage.setItem('appAvatar', response.data.avatar)
        props.setLoggedIn(true)
        console.log('Congrats! Login Susscessful')
      } else {
        console.log('Sorry! Invalid username/password')
      }
    } catch (error) {
      console.log('Oops! Server Error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-0 pt-2 pt-md-0">
      <div className="row align-items-center">
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input onChange={(e) => setUsername(e.target.value)} name="username" className="form-control form-control-sm input-dark" type="text" placeholder="Username" autoComplete="off" />
        </div>
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input onChange={(e) => setPassword(e.target.value)} name="password" className="form-control form-control-sm input-dark" type="password" placeholder="Password" />
        </div>
        <div className="col-md-auto">
          <button className="btn btn-success btn-sm">Sign In</button>
        </div>
      </div>
    </form>
  )
}

export default LoggedOut