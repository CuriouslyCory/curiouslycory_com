import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Schedule } from '../views';
import { Footer, Header } from './components';

function App() {
  return (
    <div className="view-root">
      <Header></Header>
      <div className="content-wrapper">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="schedule" element={<Schedule />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
