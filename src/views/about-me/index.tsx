import { Col, Container, Row } from "react-bootstrap";
import './index.scss';

export default function AboutMe() {
    return (
      <Container>
        <Row>
          <Col></Col>
          <Col md={9} className="about-wrapper">
            <h2>About Me</h2>
            <p>I'm CuriouslyCory and I'm curious about your project and how I can help you bring it to life. I bring a wide range of technical skills from enterprise level full stack development, to project management, product ownership, consulting, and process management.</p>
          </Col>
        <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col md={9} className="about-wrapper">
            <h3>Web3 dev</h3>
            <p>I've been building personal projects (ERC-20 & ERC-721), collaborating with other devs, consulting, and taking on contracts in the web3 space for the since early 2021. I have been active in the crypto community since 2017, and have a wide and deep understanding of the crypto space. Currently working part time for FortressDAO as a developer maintaining and adding features to an OHM fork, as well as taking on an ever growing number of additional contracts and collaberations.</p>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col md={9} className="about-wrapper">
            <h3>CTO</h3>
            <p>Three years leading all technical aspects for a small company including: hardware and software infrastructure, software architecture, hiring, mentoring, and project management. Leading daily standups with the development team, organizing and leading weekly meetings with the CEO and stakeholders.</p>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col md={9} className="about-wrapper">
            <h3>Team Lead & Lead/Sr Developer</h3>
            <p>For more than 7 years across 2 large organizations I’ve led development teams building enterprise level applications. Working with my peers we created effective processes and workflows to keep large, complex, interconnected teams organized and able to deliver quality work at a rapid pace. Beyond planning and team management I also spent a good deal of my time building software architecture capable of delivering scalable and highly available business critical applications.</p>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col md={9} className="about-wrapper">
            <h3>Product Ownership</h3>
            <p>During my time as a Lead/Sr. Developer I worked alongside a number of great product owners helping them develop product roadmaps, solutions to complicated client challenges, organize backlogs, prioritize work, and gather the information needed to make all of these decisions.</p>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col md={9} className="about-wrapper">  
            <h3>Project Management</h3>
            <p>Oftentimes my role as Lead developer required me to step back from the code to untangle and organize a “simple project” that grew to an overwhelming goliath. Luckily I developed a large kit of tools and skills, and had great peers who were willing to point me in the right direction when I was running out of rope. Having worked on projects with such a wide array of complexities, I also know what tools to deploy and when, because sometimes over managing a project just slows it down, and other times one can hardly get started until everything is covered in post-it notes and highlighter marks.</p>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col md={9} className="about-wrapper">  
            <h3>Customer Service Rep</h3> 
            <p>Leadership is service. Early in my career I spent a lot of time on the phone helping people fix their internet connection. My time on the phone helped me hone the ability to listen to people and their problems, help those who are frustrated find a solution, and take a lot of heat from people who are angry at their situation without losing my cool. I’m still driven today by the desire to help people solve their problems and succeed wildly. </p>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }