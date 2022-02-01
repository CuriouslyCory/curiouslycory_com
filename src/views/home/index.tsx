import { Col, Container, Row } from "react-bootstrap";
import "./index.scss";

const links: Array<any> = [
  {title: 'Twitter', url: 'https://www.twitter.com/CuriouslyCory'},
  {title: 'YouTube', url: 'https://www.youtube.com/channel/UCASQA6u80u7Py_UHIGFYqVA?view_as=subscriber'},
  {title: 'LinkedIn', url: 'https://www.linkedin.com/in/corysougstad/'},
  {title: 'My Blog', url: 'https://blog.hau.me'},
  {title: 'Outdated Resume Site', url: 'https://cory.hau.me'},
  {title: 'e-Mail', url: 'mailto:cory@curiouslycory.com'},
];

const renderLink = (link: any) => {
  return (
    <li><a href={link.url}>{link.title}</a></li>
  )
}

export default function Home() {
    return (
      <Container>
        <Row>
          <Col></Col>
          <Col md={9} className="link-wrapper">
            <h2>Look for me on...</h2>
            <ul>
              {links.map((link) => renderLink(link))}
            </ul>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }