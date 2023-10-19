import './App.css';

import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import { Home } from './home';
import Sebibox from './pages/sebibox';
import { Login } from './pages/Login';

function App() {
  
  return (
    <Router>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sebibox' element={<Sebibox />} />
          <Route path='/sebibox/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
