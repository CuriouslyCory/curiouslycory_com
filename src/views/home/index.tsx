import { Col, Container, Row } from "react-bootstrap";
import "./index.scss";
import me from "../../assets/images/me.jpg";

const links: Array<any> = [
  { title: 'Schedule a Consultation', url: 'https://calendly.com/curiouslycory' },
  { title: 'Twitter', url: 'https://www.twitter.com/CuriouslyCory' },
  { title: 'YouTube', url: 'https://www.youtube.com/channel/UCASQA6u80u7Py_UHIGFYqVA?view_as=subscriber' },
  { title: 'LinkedIn', url: 'https://www.linkedin.com/in/corysougstad/' },
  { title: 'Dev Blog', url: 'https://mirror.xyz/curiouslycory.eth' },
  { title: 'Maker Blog', url: 'https://blog.hau.me' },
  { title: 'Outdated Resume Site', url: 'https://cory.hau.me' },
  { title: 'e-Mail', url: 'mailto:cory@curiouslycory.com' },
];

const renderLink = (link: any, index: number) => {
  return (
    <li key={index}><a href={link.url}>{link.title}</a></li>
  )
}

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
          <Col md={9} className="link-wrapper">
            <div className="profile-pic-wrapper d-none d-sm-flex">
              <img className="profile-pic" src={me} alt="Cory"/>
            </div>
            <h2>Look for me on...</h2>
            <ul>
              {links.map((link, index) => renderLink(link, index))}
            </ul>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }