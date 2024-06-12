import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Tasks from './Pages/Tasks';
import Navbar from './components/Navbar';
import LandingPage from './Pages/LandingPage';
import PageNotFound from './Pages/PageNotFound';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='*' element={<PageNotFound/>}/>
        <Route path='/' element={<LandingPage/>}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="login" element={<Login />} />
        <Route path="tasks" element={<Tasks />} />
      </Routes>
    </div>
  );
}

export default App;
