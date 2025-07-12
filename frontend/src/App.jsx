
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import Landing from './pages/Landing';
import AdminRoute from './routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import { Toaster } from 'sonner';
import { Footer, } from 'flowbite-react';
import 'flowbite';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Landing';
import ServiceDetails from './pages/ServiceDetails';
import PaymentPage from './pages/PaymentPage';
import DeliveryPage from './pages/DeliveryPage';
import OrderStatus from './pages/OrderStatus';
import AdminOrderStatusControl from './pages/Admin/AdminStatusControl';
import SummaryPage from './pages/SummaryPage';
import ViewOrderPage from './pages/ViewOrderPage';
import RegisterPage from './pages/Signup';
import OrdersPage from './pages/Admin/OrdersPage';
import UsersPage from './pages/Admin/UsersPage';
import ServicesPage from './pages/Admin/ServicesPage';





function Layout() {
  const {user}= useSelector((state)=> state.auth)

  const location = useLocation();

  return user ? (
    <div className="w-full min-h-screen flex flex-col md:flex-row ">
      <div className="flex-1 overflow-y-auto">
        {<Navbar/>}

        <div className="flex-grow overflow-y-auto md:p-4 2xl:px-10 overflow-x-hidden ">
          {<Outlet/>}
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/log-in" state={{ from: location }} replace />
  );
}

function App() {
  const user = { name: 'David' };

  return (
    <main className="w-full min-h-screen bg-white">
      <Routes>
        <Route element={<Layout />}>
         <Route path="/" element={<Dashboard user={user} />} />
         <Route path="/service/:serviceId" element={<ServiceDetails />} />
         <Route path="/payment" element={<PaymentPage />} />
         <Route path="/delivery" element={<DeliveryPage />} />
         <Route path="/status" element={<OrderStatus />} />
         <Route path="/summary" element={<SummaryPage />} />
         <Route path="/order/:id" element={<ViewOrderPage />} />


        </Route>
        {/* <Route path="/admin/*" element={user?.isAdmin ? <AdminDashboard /> : <Navigate to="/" />} /> */}
        <Route path="/log-in" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />

      <Route path="/admin" element={<AdminDashboard />}>
        <Route path="status" element={<AdminOrderStatusControl />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="services" element={<ServicesPage />} />
          
     </Route>

     {/* <Route path="/admin/product/:id" element={<ProductManagement />} /> */}




      </Routes>

      <Toaster richColors />
    </main>
    
  );
}

export default App
