import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Tasks from './Pages/Tasks';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <h1>Task management App</h1>
      <Navbar/>
      <Routes>
        <Route path="/signup" element={<Signup />}/>
        <Route path="login" element={<Login />} />
        <Route path="tasks" element={<Tasks />} />
      </Routes>
    </div>
  );
}

export default App;
