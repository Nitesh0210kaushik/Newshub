import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Logout from './components/Logout';
import ProtectedComponent from './components/ProtectedComponent';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            element={<ProtectedComponent />}
          >
            <Route path="/" element={<Homepage />} />
            <Route path="/logout" element={<Logout />} />
            
          </Route>

         
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;



