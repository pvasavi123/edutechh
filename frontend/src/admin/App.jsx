import { Routes, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Tenants from './pages/Tenants'; // Create similar to Users
import Settings from './pages/Settings'; // Create simple div\
import ClassManagement from './pages/ClassManagement';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="registerUser" element={<Tenants />} />
        <Route path="settings" element={<Settings />} />
        <Route path="broadcast" element={<ClassManagement />} />
      </Route>
    </Routes>
  );
}

export default App;