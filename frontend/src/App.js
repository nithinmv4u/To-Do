import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import AuthContext, { AuthProvider } from './context/AuthContext';
import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <div className=''>
        <Router>
          <AuthProvider>
            <Header/>
            <PrivateRoute path="/" exact Component={HomePage} />
            <Routes>          
              <Route Component={LoginPage} path='/login'/>
              <Route Component={SignUpPage} path='/signup' />
            </Routes>
          </AuthProvider>
        </Router>
    </div>
    );
}

export default App;
