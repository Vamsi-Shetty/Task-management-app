import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Tasks from './Pages/Tasks';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Signup />}/>
        <Route path="login" element={<Login />} />
        <Route path="tasks" element={<Tasks />} />
      </Routes>
    </div>
  );
}

export default App;
