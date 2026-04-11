import React from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import { Provider } from "react-redux";
import Home from './pages/Home'
import DisplayJobs from './pages/DisplayJobs'
import store from '../src/redux/store';
import ApplyJob from "./pages/ApplyJob";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<DisplayJobs />} />
          <Route path="/apply/:jobId" element={<ApplyJob />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
