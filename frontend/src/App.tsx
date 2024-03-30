import './App.css'
import { Layout } from './layouts/Layout'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'

function App() {

  return (

    <Routes>
      <Route element={<Layout >
        <p>Home Page</p>
      </Layout>} path='/' />
      <Route path='/register' element={
        <Layout ><Register /> </Layout>} />
    </Routes>
  )
}

export default App
