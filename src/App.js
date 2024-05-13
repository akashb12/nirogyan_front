import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './Pages/RegisterPage';
import './App.css';
import LoginPage from './Pages/LoginPage';
import DashBoardPage from './Pages/DashBoardPage';
import ProtectedRoute from './utils/ProtectedRoute';
import { MyContext } from './MyContext';
import { useState } from 'react';
import ReportPage from './Pages/ReportPage';

function App() {
  const [loader, setLoader] = useState(false);
  return (
    <div className="App">
      <MyContext.Provider value={{ loader, setLoader }}>
        {loader ? <div className='fullscreen-load'>
        <span className="loader"></span>
        Loading...
        </div> : <Router>
          <Routes>
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path="/" element={
              <ProtectedRoute>
                <DashBoardPage />
              </ProtectedRoute>
            } />
            <Route path="/report/:id" element={
              <ProtectedRoute>
                <ReportPage />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>}
      </MyContext.Provider>
    </div>
  );
}

export default App;
