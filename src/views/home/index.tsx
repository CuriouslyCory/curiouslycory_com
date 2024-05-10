import { Button, Col, Container, Row } from "react-bootstrap";
import "./index.scss";
import me from "../../assets/images/me.jpg";


export default function Home() {
    return (
      <Container fluid>
        <Row>
          <Col className="d-flex justify-content-center d-md-none">
            <img className="profile-pic-sm" src={me} alt="Cory"/>
          </Col>
        </Row>
        <Row className="hero">
          <Col md={8}>
            <h1 className="title">Hi, I'm CuriouslyCory!</h1>
            <p>I've been making ideas come to life on the web since 2005. <a href="https://calendly.com/curiouslycory">Schedule a consultation now</a> and let's start working on yours!</p>
          </Col>
          <Col sm={12} md={4} className="d-none d-md-flex profile-pic-wrapper">
            <img className="profile-pic-sm" src={me} alt="Cory"/>
          </Col>
        </Row>
        <Row>
          <Col className="schedule-wrapper">
            <h1 className="title">What can do for you?</h1>
              <ul>
                <li>Web3</li>
                <li>Solidity</li>
                <li>NFTs & Minting Sites</li>
                <li>Crypto Tokens</li>
                <li>Project Forks</li>
                <li>Coaching</li>
                <li>Consultation</li>
                <li>Project Managment</li>
                <li><a href="services">See More...</a></li>
              </ul>
              <Button variant="primary" href="https://calendly.com/curiouslycory">Book a Free Consultation Now</Button>
          </Col>
        </Row>
      </Container>
    );
  }