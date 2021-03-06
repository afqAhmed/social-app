import React, { useState, useContext } from 'react'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'
import DispatchContext from '../DispatchContext'
import Page from './Page'

const CreatePost = (props) => {
  const appDispatch = useContext(DispatchContext)
  const [title, setTitle] = useState()
  const [body, setBody] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await Axios.post('/create-post', { title, body, token: localStorage.getItem('appToken') })
      appDispatch({ type: 'flashMessages', value: 'Congrats! Post successfully created.' })
      props.history.push(`/post/${response.data}`)
      console.log('Congrats! Post created successfully.')
    } catch (error) {
      console.log('Oops! Something went wrong.')
    }
  }

  return (
    <Page title="Create-post">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input onChange={(e) => setTitle(e.target.value)} autoFocus name="title" id="post-title" className="form-control form-control-lg form-control-title" type="text" placeholder="" autoComplete="off" />
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea onChange={(e) => setBody(e.target.value)} name="body" id="post-body" className="body-content tall-textarea form-control" type="text"></textarea>
        </div>
        <button className="btn btn-primary">Save New Post</button>
      </form>
    </Page>
  )
}

export default withRouter(CreatePost)
