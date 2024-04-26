import React from 'react';
import ReactDOM from 'react-dom';
import Favicon from 'react-favicon';
import favicon from './assets/images/favicon_032.png';
import App from './Root/App';
import { Container, Row } from 'react-bootstrap';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

ReactDOM.render(
  <Container fluid>
    <Row className="mx-0">
      <Favicon url={favicon} />
      <App></App>
    </Row>
  </Container>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
