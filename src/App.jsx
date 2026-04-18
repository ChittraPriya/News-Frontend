import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Preferences from "./pages/Preference";
import AllNews from "./pages/AllNews";
import AlertsPage from "./pages/Alert";
import AdminLayout from "./components/AdminLayout";
import Dashboard2 from "./pages/admin/Dashboard";
import AddNews from './pages/admin/AddNews'
import Users from "./pages/admin/Users";
import Alerts from "./pages/admin/Alerts";
import Analytics from "./pages/admin/Analytics";
import Dashboard from "./pages/admin/Dashboard";
import UserDashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import { useEffect } from "react";
import socket from "./socket/socket";



const router = createBrowserRouter([
  {
    path:'/',
    element: <Home/>
  },
  {
  path: '/login',
  element:<Login />
  },
  {
    path: '/dashboard',
    element: <UserDashboard />
  },
  {
    path: '/all-news',
    element: <AllNews />
  },
  {
    path: '/preferences',
    element: <Preferences />
  },
  {
    path:'/alerts',
    element: <AlertsPage />
  },
  {
    path:'/settings',
    element: <Settings />
  },

  //ADmin Routes
  {
    path:'/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
      },
      {
        path: 'dashboard',
        element:<Dashboard />
      },
      {
        path: "news",
        element: <AddNews />
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "alerts",
        element: <Alerts />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
    ]
  }
])

const App = () => {
  useEffect(() => {

  const user = JSON.parse(localStorage.getItem("user"));

  if (user?._id) {
    socket.connect(); // optional if autoConnect false
    socket.emit("joinRoom", user._id);
  }

  socket.on("notification", (data) => {
    console.log("Notification:", data);

    //show toast
    // toast.info(data.title);
  });

  return () => {
    socket.off("notification");
  };

}, []);
  return (
    <>
  <RouterProvider router={router} />
  <ToastContainer position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick rtl={false}
  pauseOnFocusLoss draggable pauseOnHover theme="light" />
 </>
  )
}

export default App;