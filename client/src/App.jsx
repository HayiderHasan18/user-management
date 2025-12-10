import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthMode from "./components/AuthMode";
import PostsPage from "./posts/PostsPage";
import ProtectedRoute from "./routes/ProtectedRoutes";
import Navbar from "./Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<AuthMode />} />
        <Route path="/signup" element={<AuthMode />} />

        {/* Protected route */}
        <Route
          path="/posts"
          element={
            <ProtectedRoute>
              <Navbar />
              <PostsPage />
            </ProtectedRoute>
          }
        />

        {/* Default redirect */}
        <Route path="*" element={<AuthMode />} />
      </Routes>
    </Router>
  );
}

export default App;
