import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PortfolioLayout from './layouts/PortfolioLayout'
import Home from './pages/Home'
import Tools from './pages/Tools'

function App() {
  return (
    <Router>
      <Routes>
        {/* Portfolio Routes */}
        <Route element={<PortfolioLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* Standalone Tools Route (No Header/Background) */}
        <Route path="/tools" element={<Tools />} />
      </Routes>
    </Router>
  )
}

export default App