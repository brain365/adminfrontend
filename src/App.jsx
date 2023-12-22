
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import UpdateUser from './components/UpdateUser'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Singleadmin from './pages/Singleadmin'
import AddLocation from './pages/AddLocation'
import EditLocation from './pages/EditLocation'
import AddMachine from './pages/AddMachine'
import EditMachine from './pages/EditMachine'

function App() {
  
  return (
    <>
      <div className='d-flex m-5'>


        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/update-user/:userId' element={<UpdateUser />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/user-details/:userId' element={<Singleadmin />} />
            <Route path='/addlocation' element={<AddLocation/>}/>
            <Route path='/edit-location/:userId/:locationId' element={<EditLocation/>}/>
            <Route path='/addmachine' element={<AddMachine/>}/>
            <Route path='/edit-machine/:userId/:machineId' element={<EditMachine/>}/>
          </Routes>
        </BrowserRouter>
      </div>

    </>
  )
}

export default App
