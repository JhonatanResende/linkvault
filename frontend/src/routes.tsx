import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import AddLink from './pages/AddLink'
import Categories from './pages/Categories'
import NotFound from './pages/NotFound'

export default function AppRoutes() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddLink />} />
          <Route path="/categories" element={<Categories />} />
          {/* O * pega qualquer rota que não existir */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}