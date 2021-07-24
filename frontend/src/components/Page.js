import React, { useEffect } from 'react'
import Container from './Container'

const Page = (props) => {
  useEffect(() => {
    document.title = `Social App || ${props.title}`
    window.scrollTo(0,0)
  }, [])

  return <Container wide={props.wide}> {props.children} </Container>
}

export default Page