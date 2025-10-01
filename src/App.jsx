
import './App.css'
import { Routes,Route} from 'react-router-dom'
import Home from './Pages/Resources'
import Login from './Pages/Login'
import Articles from './Pages/Articles'
import AboutUs from './Pages/AboutUs'
import NotFound from './Pages/NotFound'
import LandingPage from './Pages/LandingPage'
import Resources from './Pages/Resources'
import SignUp from './Pages/SignUp'
import PrivateRoutes from './Component/PrivateRoutes'
import Saved from './Pages/Saved'

function App() {
  

  return (
    <>
      <Routes>
       <Route path='*' element={<NotFound />}/>
       <Route path='/' element={<LandingPage/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/signup' element={<SignUp/>}/>
       
      
       
       <Route element={<PrivateRoutes/>}>
           <Route path='/resources' element={<Resources />} />
           <Route path='/articles' element={<Articles/>}/>
           <Route path='/aboutus' element={<AboutUs/>}/>
           <Route path='/mysaved' element={<Saved/>}/>
       </Route>
      </Routes>
    </>
  )
}

export default App
