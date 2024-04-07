import './App.css'
import { Layout } from './layouts/Layout'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import SignIn from './pages/SignIn'

function App() {

  return (

    <Routes>
      <Route element={<Layout >
        <p>Home Page</p>
      </Layout>} path='/' />
      <Route path='/register' element={<Layout ><Register /> </Layout>} />

      <Route path='/sign-in' element={<Layout><SignIn /></Layout>} />

    </Routes>
  )
}

export default App
