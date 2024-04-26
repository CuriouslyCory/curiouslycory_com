import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Schedule } from '../views';
import { Footer, Header } from './components';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div className="view-root">
      <Header></Header>
      <Container className="content-wrapper">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="schedule" element={<Schedule />} />
          </Routes>
        </BrowserRouter>
      </Container>
      <Footer></Footer>
    </div>
  );
}

export default App;
