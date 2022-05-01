import { Button, Col, Container, Row } from "react-bootstrap";

export default function ProServices() {
    return (
      <Container>
        <Row>
          <Col>
            <h2>Standard Rates</h2>
            <ul>
              <li>Hourly Development - $130</li>
              <li>Consultation and Coaching - $150</li>
            </ul>

            <h2>Packages</h2>
            <ul>
              <li>Basic NFT Pack - $350 (plus contract deployment fees)</li>
              <ul>
                <li>Minting Site</li>
                <li>Github configuration</li>
                <li>Hosting up to 100GB/mo</li>
                <li>Contract Deployment</li>
              </ul>
              <li>Basic Token - $250 (plus contract deployment fees)</li>
              <ul>
                <li>Token Site</li>
                <li>Github configuration</li>
                <li>Hosting up to 100GB/mo</li>
                <li>Contract Deployment</li>
              </ul>
            </ul>
            <Button variant="primary" href="https://calendly.com/curiouslycory">Schedule a Consultation Now</Button>
          </Col>
        </Row>
      </Container>
    );
  }