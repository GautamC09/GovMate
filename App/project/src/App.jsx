import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Hero, Services as LandingServices, Footer } from "./LandingPage";
import { Header } from "./header.jsx"; // Import the correct Header
import ServicesPage from "./ServicesPage";
import ServiceChatPage from "./ServiceChatPage";
import Login from "./Login";
import Signup from "./Signup";
import ContactUs from "./ContactUs";
import AboutUs from "./AboutUs";
import { auth } from "./firebase";

function App() {
  const [user, setUser] = useState(null);

  // Track authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user); // User is logged in
      } else {
        setUser(null); // User is logged out
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  return (
    <Router>
      <Header user={user} /> {/* Use the updated Header */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <LandingServices />
            </>
          }
        />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/service-chat/:serviceTitle" element={<ServiceChatPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;