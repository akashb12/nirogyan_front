import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './Pages/RegisterPage';
import './App.css';
import LoginPage from './Pages/LoginPage';
import DashBoardPage from './Pages/DashBoardPage';
import ProtectedRoute from './utils/ProtectedRoute';
import { MyContext } from './MyContext';
function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="App">
      <MyContext.Provider value={{user}}>
        <Router>
          <Routes>
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path="/" element={
          <ProtectedRoute>
          <DashBoardPage/>
          </ProtectedRoute>
      }/>
          </Routes>
        </Router>
      </MyContext.Provider>
    </div>
  );
}

export default App;
