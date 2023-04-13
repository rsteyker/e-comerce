import './App.css'
import { HashRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import ProductsDetails from './pages/ProductsDetails'
import Login from './pages/Login'
import Purchases from './pages/Purchases'
import Loader from './components/Loader'
import { useSelector } from 'react-redux'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {

  //Guardar el valor de slice  isLoading en la variable isLoading
  const isLoading = useSelector( state => state.isLoading );

  return (
    <HashRouter>
      <div className="App">
        {
          isLoading && <Loader/>
        }
        <NavBar/>
        <Routes>
          <Route
            path='/'
            element={ <Home/> }
          />
            
          <Route
            path='/products/:id'
            element={ <ProductsDetails/> }
          />
          <Route
            path='/login'
            element={ <Login/> }
          />
          
          {/* Protección de rutas */}
          <Route element={<ProtectedRoutes/>}>
            <Route
              path='/purchases'
              element={ <Purchases/> }
            />
          </Route>

        </Routes>
      </div>
    </HashRouter>
  )
}

export default App
