import { useState } from 'react'
import './App.css'
import { Header } from './Conponents/Header'
import { Footer } from './Conponents/Footer'
import { SearchPage } from './Pages/SearchPage'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import { SchemeDetailContent } from './Pages/SchemeDetailContent'
import { SavedSchemesPage } from './Conponents/SavedSchemesPage'
import HelpPage from './Pages/HelpPage'
import { AboutPage } from './Pages/AboutPage'
// import SchemeDetailContent from './Pages/SchemeDetailContent'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Header />
        <Routes>
       <Route path="/" element={<Dashboard />} />
       <Route path="/search" element={<SearchPage />} />
       <Route path="/search/:slug" element={<SchemeDetailContent />} />
       <Route path='/saved' element={<SavedSchemesPage />} />
       <Route path='/help' element={<HelpPage />} />
       <Route path='/about' element={<AboutPage />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App
