import './App.css';

import { Routes, Route, HashRouter }
    from 'react-router-dom';
import { Home } from './home';
import Sebibox from './pages/sebibox';
import { Login } from './pages/Login';

function App() {
  
  return (
    <HashRouter>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sebibox' element={<Sebibox />} />
          <Route path='/sebibox/login' element={<Login />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
