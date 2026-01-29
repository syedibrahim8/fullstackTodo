import React from 'react'
import {Routes,Route} from "react-router"
import Home from './pages/Home'
import Add from './pages/Add'
import Edit from './pages/Edit'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/add' element={<Add/>} />
      <Route path='/edit/:id' element={<Edit/>} />
    </Routes>
  )
}

export default App