import './App.css'
import { Layout } from './layouts/Layout'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (

    <Routes>
      <Route element={<Layout >
        <p>Home Page</p>
      </Layout>} path='/' />
    </Routes>
  )
}

export default App
