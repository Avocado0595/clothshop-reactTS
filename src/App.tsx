import { useState } from 'react'
import './App.css'
import Homepage from './pages/homepage/Homepage'
import {
  Link,
  PathMatch,
  Route, RouteMatch, Routes, useLocation, useMatch, useNavigate, useParams, useRoutes, useSearchParams
} from "react-router-dom";
import ShopPage from './pages/shoppage/ShopPage';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Homepage />}/>
        <Route path="/shop" element={<ShopPage />}/>
      </Routes>
    </div>
  )
}

export default App
