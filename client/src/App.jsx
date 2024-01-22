import './App.css'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'

function App() {
  
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path='/' element={<p>Paintings</p>} />
          <Route path='/paintings/:id' element={<p>Single Painting</p>} />
          <Route path='/artists' element={<p>Artists</p>} />
          <Route path='/artints/:id' element={<p>Single Artist</p>} />
          <Route path='/collections' element={<p>Collections</p>} />
          <Route path='/collections/:id' element={<p>Single Collection</p>} />
          <Route path='/users/login' element={<p>Login</p>} />
          <Route path='/users/register' element={<p>Register</p>} />
          <Route path='/users/account' element={<p>Account</p>} />
          <Route path='paintings/:search' element={<p>Filter</p>} />
        </Routes>
      </div>
    </>
  )
}

export default App
