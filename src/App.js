import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";

import "./App.css";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Analytics from "./pages/Analytics";
import Complaints from "./pages/Complaints";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

import { getUserRole } from "./services/userService";

function App() {
  const [user, setUser] = useState(null);

  // ✅ Missing state
  const [role, setRole] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {
        setUser(currentUser);

        if (currentUser) {
          const userRole = await getUserRole(currentUser.uid);
          setRole(userRole);
        } else {
          setRole(null);
        }

        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <>
      <BrowserRouter>
        <Sidebar role={role} />

        <div className="content">
          <Navbar onLogout={handleLogout} />

          <Routes>
            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/complaints"
              element={<Complaints role={role} />}
            />

            <Route
              path="/analytics"
              element={
                role === "admin" ? (
                  <Analytics />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />
          </Routes>
        </div>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;