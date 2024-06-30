import React from 'react'
import logo from "../assets/logo-interpaul.png" 

export default function Header() {
  return (
    <>
    <div className="header">

    <div>
    <h1>INTERPAUL</h1>
    <p>UI version of Interpol WebPage with the UX Pablo Riveiro imagines, just like on the movies</p>
    </div>
    <div>

    <img className='logo' src={logo} />
    </div>
    </div>
    </>
  )
}
