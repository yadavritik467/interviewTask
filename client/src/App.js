
import { Route, Routes } from 'react-router-dom';
import {Toaster} from "react-hot-toast";
import './App.css';
import Register from './component/auth/Register';
import Login from './component/auth/Login';
import ProfileCreator from './component/auth/ProfileCreator';
import { useAuth } from './contextApi/auth';
import Myprofile from './component/auth/MyProfile';




function App() {
   const [auth] = useAuth();
  return (
    <div className='App'>
      <Toaster/>
      <Routes>

        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/' element={<Login/>} />
        <Route path='/Profilecreator' element={ auth.user !==null ? <ProfileCreator/> : <Login/> } />
        <Route path='/myProfile' element={ auth.user !==null ? <Myprofile/> : <Login/> } />
      </Routes>
     
    </div>
     
  );
}

export default App;
