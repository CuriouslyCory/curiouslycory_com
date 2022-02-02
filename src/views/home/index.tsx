import { Button, Col, Container, Row } from "react-bootstrap";
import "./index.scss";
import me from "../../assets/images/me.jpg";


export default function Home() {
    return (
      <Container>
        <Row>
          <Col className="d-flex justify-content-center d-sm-none">
            <img className="profile-pic-sm" src={me} alt="Cory"/>
          </Col>
        </Row>
        <Row>
          <Col></Col>
          <Col md={9} >
            <div className="schedule-wrapper">
              <div className="profile-pic-wrapper d-none d-sm-flex">
                <img className="profile-pic" src={me} alt="Cory"/>
              </div>
              <h2>Hi, I'm CuriouslyCory</h2>
              <p>I've been making ideas come to life on the web since 2005. Schedule a consultation now and let's start working on yours!</p>
              <ul>
                <li>Web3</li>
                <li>Solidity</li>
                <li>NFTs & Minting Sites</li>
                <li>Crypto Tokens</li>
                <li>Project Forks</li>
                <li>Coaching</li>
                <li>Consultation</li>
                <li>Project Managment</li>
              </ul>
              <Button href="https://calendly.com/curiouslycory">Schedule a Consultation Now</Button>
            </div>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }