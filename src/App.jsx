
import {BrowserRouter,Routes,Route} from 'react-router-dom' 
import Add from './Component/Add'
import View from './Component/View'
import './style.css'
import Edit from './Component/Edit'

function App() {


  return (
  <>
 <div align="center">
 <BrowserRouter>
  <Routes>
    <Route path='/' element={<Add/>}/>
    <Route path='/View' element={ <View/>}/>
    <Route path='/Edit' element={ <Edit/>}/>
  </Routes>
  </BrowserRouter>
 </div>
  </>
  )
}

export default App
