import './App.css'
import { Layout } from './layouts/Layout'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import { useAppContext } from './contexts/AppContext'
import AddHotel from './pages/AddHotels'
import MyHotels from './pages/MyHotels'
import EditHotel from './pages/EditHotel'
import Search from './pages/Search'
import Details from './pages/Details'
import Booking from './pages/Booking'
import MyBookings from './pages/MyBooking'

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
          <Route path='/edit-hotel/:hotelId' element={<Layout> <EditHotel /> </Layout>} />

          <Route path='/hotel/:hotelId/booking' element={<Layout><Booking /></Layout>} />
          <Route path='/my-bookings' element={<Layout><MyBookings /></Layout>} />
        </>

      )}
      <Route path='/register' element={<Layout ><Register /> </Layout>} />
      <Route path='/search' element={<Layout><Search /></Layout>} />
      <Route path='/details/:id' element={<Layout><Details /></Layout>} />

      <Route path='/sign-in' element={<Layout><SignIn /></Layout>} />

    </Routes>
  )
}

export default App
