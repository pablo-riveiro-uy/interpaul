import { useState } from 'react'
import GetProfiles from './Components/GetProfiles'
import './App.css'
import Header from './Components/Header'
import Footer from './Components/Footer'

function App() {


  return (
    <>
  <Header />
    <main>
      <GetProfiles />
    </main>
    <Footer/>
    </>
  )
}

export default App
