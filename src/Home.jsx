import React from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'

function Home() {
  return (
    <div>
      <p>Hello World</p>
      <nav>
          <Link to="/register">Register</Link> <br />
          <Link to="/memodemo">Memo Demo</Link>
      </nav>
      <br /><br />
      <Outlet /> 
    </div>
  )
}

export default Home
