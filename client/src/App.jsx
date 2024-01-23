import './App.css'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Users from './components/Users'
import Home from './components/Home'
import Artists from './components/Artists'
import Artist from './components/Artist'
import Collection from './components/Collection'
import Collections from './components/Collections'

function App() {
  
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/paintings/:id' element={<p>Single Painting</p>} />
          <Route path='/artists' element={<Artists />} />
          <Route path='/artists/:id' element={<Artist size='large' />} />
          <Route path='/collections' element={<Collections />} />
          <Route path='/collections/:id' element={<Collection size='large' />} />
          <Route path='/users' element={<Users />} />
          <Route path='/users/account' element={<p>Account</p>} />
          <Route path='paintings/:search' element={<p>Filter</p>} />
        </Routes>
      </div>
    </>
  )
}

export default App
