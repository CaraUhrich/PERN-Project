import './App.css'
import { useGetPaintingsQuery } from './redux/nonantumGalleryApi'
import { Routes, Route } from 'react-router-dom'

function App() {
  const paintings = useGetPaintingsQuery()

  console.log(paintings)
  

  return (
    <>
      <nav></nav>
      <div>
        <Routes>
          <Route path='/paintings' element={<p>Paintings</p>} />
          <Route path='/paintings/:id' element={<p>Single Painting</p>} />
          <Route path='/artists' element={<p>Artists</p>} />
          <Route path='/artints/:id' element={<p>Single Artist</p>} />
          <Route path='/collections' element={<p>Collections</p>} />
          <Route path='/collections/:id' element={<p>Single Collection</p>} />
          <Route path='/users/login' element={<p>Login</p>} />
          <Route path='/users/register' element={<p>Register</p>} />
          <Route path='/users/account' element={<p>Account</p>} />
          <Route path='paintings/search' element={<p>Filter</p>} />
        </Routes>
      </div>
    </>
  )
}

export default App
