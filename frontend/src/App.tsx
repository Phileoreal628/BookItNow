import './App.css'
import { Layout } from './layouts/Layout'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import { useAppContext } from './contexts/AppContext'
import AddHotel from './pages/AddHotels'
import MyHotels from './pages/MyHotels'

function App() {

  const { isLoggedIn } = useAppContext();

  return (

    <Routes>
      <Route element={<Layout >
        <p>Home Page</p>
      </Layout>} path='/' />
      {isLoggedIn && (
        <>
          <Route path='/add-hotel' element={<Layout><AddHotel /></Layout>} />

          <Route path='/my-hotels' element={<Layout> <MyHotels /> </Layout>} />
        </>

      )}
      <Route path='/register' element={<Layout ><Register /> </Layout>} />

      <Route path='/sign-in' element={<Layout><SignIn /></Layout>} />

    </Routes>
  )
}

export default App
