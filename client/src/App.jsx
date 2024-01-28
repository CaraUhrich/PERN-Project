import './App.css'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Users from './components/Users'
import Home from './components/Home'
import Artists from './components/Artists'
import Artist from './components/Artist'
import Collection from './components/Collection'
import Collections from './components/Collections'
import Filter from './components/Filter'
import Account from './components/Account'
import SinglePainting from './components/SinglePainting'

function App() {
  
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/paintings/:id' element={<SinglePainting />} />
          <Route path='/paintings/search/:search' element={<Filter />} />
          <Route path='/artists' element={<Artists />} />
          <Route path='/artists/:id' element={<Artist size='large' />} />
          <Route path='/collections' element={<Collections />} />
          <Route path='/collections/:id' element={<Collection size='large' />} />
          <Route path='/users' element={<Users />} />
          <Route path='/users/account' element={<Account />} />
        </Routes>
      </div>
    </>
  )
}

export default App
