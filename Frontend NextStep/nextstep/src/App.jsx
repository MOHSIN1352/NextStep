import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/HomePage";
import Youngsters from "./components/Youngsters_Front";
import State from "./components/State_Front";
import AddInstitute from "./components/Profile";
import Login from "./components/Login";
import Signup from "./components/Signup";
import HealthcareSearch from "./components/HealthcareSearch";
import Institutes from "./components/institute_Front";
import GovernmentPolicies from "./components/GovernmentPolicies";
import JobListings from "./components/Migration_Front";
import ProfilePage from "./components/Profile";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/youngsters" element={<Youngsters />} />
          <Route path="/governmentPolicies" element={<GovernmentPolicies />} />
          <Route path="/states" element={<State />} />
          <Route path="/healthCareSearch" element={<HealthcareSearch />} />
          <Route path="/jobListings" element={<JobListings />} />
          <Route path="/institute" element={<Institutes />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
