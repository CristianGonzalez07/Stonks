import { Route, Routes, Navigate } from 'react-router-dom';
import { publicRoutes, protectedRoutes } from './pages/index'
import { ProtectedRoute } from './components/index';
import './App.css'

function App() {

  return (
    <Routes>
      <Route path="*" element={<Navigate to="/login" />} />
      <Route path="/*" element={<Navigate to="/" />} />
      {
        publicRoutes.map((data, index) => (
          <Route path={data.path} element={data.component} key={index} />
        ))
      }
      <Route element={<ProtectedRoute />}>
          {
            protectedRoutes.map((data, index) => (
              <Route path={data.path} element={data.component} key={publicRoutes.length + index}/>
            ))
          }
        </Route>
    </Routes>
  )
}

export default App