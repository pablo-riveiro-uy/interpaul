import { useState } from 'react'
import GetProfiles from './Components/GetProfiles'
import './App.css'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Login from './Components/login'

function App() {

  const [rightAnswer, setRightAnswer] = useState(false);

  return (
    <>
  <Header />
    <main>
      {console.log('rightanswe', rightAnswer)}
      {rightAnswer === false ? <Login answer={setRightAnswer}/> : <GetProfiles/>}
     
    </main>
    <Footer/>
    </>
  )
}

export default App
