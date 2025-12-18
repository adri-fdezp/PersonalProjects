import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const PortfolioLayout = lazy(() => import('./layouts/PortfolioLayout'))
const Home = lazy(() => import('./pages/Home'))
const Tools = lazy(() => import('./pages/Tools'))

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="loading-screen">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Tools />} />
          
          <Route path="/portfolio" element={<PortfolioLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App