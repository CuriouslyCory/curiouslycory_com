import { Col, Container, Row } from "react-bootstrap";

export default function ProServices() {
    return (
      <Container>
        <Row>
          <Col>
            <h2>Standard Rates</h2>
            <ul>
              <li>Low Complexity (Basic NFT, ERC-20, frontend) - $95</li>
              <li>High Complexity (Solidity Development) - $130</li>
              <li>Consultation and Coaching - $150</li>
            </ul>

            <h2>Packages</h2>
            <ul>
              <li>Basic NFT Pack - $300 (plus contract deployment gas)</li>
              <ul>
                <li>Minting Site</li>
                <li>Github configuration</li>
                <li>Hosting up to 100GB/mo</li>
                <li>Contract Deployment</li>
              </ul>
              <li>Basic Token - $200 (plus contract deployment gas)</li>
              <ul>
                <li>Token Site</li>
                <li>Github configuration</li>
                <li>Hosting up to 100GB/mo</li>
                <li>Contract Deployment</li>
              </ul>
            </ul>
          </Col>
        </Row>
      </Container>
    );
  }