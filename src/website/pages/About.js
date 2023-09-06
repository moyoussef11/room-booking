import React from 'react'
import Header from '../../components/website/Header';
import Footer from '../../components/website/Footer';
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <>
      <Header />
      <div className="home">
        <div className="home-info py-5 w-100 text-white text-capitalize fs-2">
          <Container className="py-3">
            <h2 style={{ color: "#0194FE" }}>The great getaway, your way</h2>
            <p>
              Save at least 15% on stays worldwide, from relaxing retreats to
              off-grid adventures
            </p>
            <Row>
              <Col xs={6} md={4}>
                <Image src={require("./images/619932.webp")} />
              </Col>
              <Col xs={6} md={4}>
                <Image src={require("./images/644365.webp")} />
              </Col>
              <Col xs={6} md={4}>
                <Image src={require("./images/654659.webp")} />
              </Col>
            </Row>
            <Link to='/'>
              <Button className="all-btn">Find Getaway Deals</Button>
            </Link>
          </Container>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;