import React from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import { Provider } from "react-redux";
import Home from './pages/Home'
import DisplayJobs from './pages/DisplayJobs'
import store from '../src/redux/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<DisplayJobs />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
