
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './pages/Home/home';
import Signup from './pages/signupPage/signup';
import Login from './pages/LoginPage/Login';
function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/Login' element={<Login />} />  
      </Routes>
    </Router>
    </div>
  );
}

export default App;
