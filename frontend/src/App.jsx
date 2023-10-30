import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import Register from './pages/register.jsx';
import Login from './pages/login.jsx';
import Author from './pages/author.jsx';
import Scholar from './pages/scholar.jsx';
import Landing from './pages/landing'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='pages'>
          <Routes>
            <Route path="/register" element={<Register />}>
            </Route>
            <Route path="/login" element={<Login />}>
            </Route>
            <Route path="/author" element={<Author />}></Route>
            <Route path="/scholar" element={<Scholar />}></Route>
            <Route path="/landing" element={<Landing />}>
            <Route path="*" element={<Landing />}>
            </Route>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
