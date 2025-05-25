
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './pages/Register';
import UserHome from './pages/user/UserHome';
import LogIn from "./components/Login";
import SignUp from "./components/Signup";
import GuestPage from './pages/guest/GuestPage';
import GuestHome from './pages/guest/GuestHome';
import { GuestAbout } from './pages/guest/GuestAbout';
import GuestPost from './pages/guest/GuestPost';
import UserProfile from './pages/user/UserProfile';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { Unauthorized } from './pages/Unauthorized';



function App() {
  return (
    <>
      <Routes>

        <Route path="/" element={<GuestPage />}>
          <Route index element={<GuestHome />} />
          <Route path="about" element={<GuestAbout />} />
          <Route path="post" element={<GuestPost />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['user', 'admin']} />}>
          <Route path="/user" element={<UserHome />} />
          <Route path="/user/profile" element={<UserProfile />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/adminDashboard" element={<AdminDashboard />} />
        </Route>

        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route path="/auth" element={<Register />}>
          <Route index element={<LogIn />} />
          <Route path="login" element={<LogIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
