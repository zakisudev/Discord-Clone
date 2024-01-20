import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Register from './pages/authPages/Register';
import Login from './pages/authPages/Login';
import ForgotPassword from './pages/authPages/ForgotPassword';
import Dashboard from './pages/protectedPages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="" element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="*" element={<h1>404</h1>} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
