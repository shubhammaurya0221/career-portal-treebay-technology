import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux";
import Home from './pages/Home'
import DisplayJobs from './pages/DisplayJobs'
import store from '../src/redux/store';
import ApplyJob from "./pages/ApplyJob";
import HRDashboard from "./pages/HRDashboard";
import ApplicationDetail from "./pages/ApplicationDetail";
import DisplayJobsOnHr from './pages/DisplayJobsOnHr';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<DisplayJobs />} />
          <Route path="/apply/:jobId" element={<ApplyJob />} />

          {/* HR Panel — accessible at /hr or /hr/dashboard */}
          <Route path="/hr" element={<HRDashboard />} />
          <Route path="/hr/dashboard" element={<HRDashboard />} />
          <Route path="/hr/application/:id" element={<ApplicationDetail />} />
          <Route path="/hr/jobs" element={<DisplayJobsOnHr />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
