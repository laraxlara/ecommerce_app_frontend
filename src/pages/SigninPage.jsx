import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import image from "../assets/images/signin.svg";
import SigninForm from "../components/SigninForm";

const SigninPage = () => {
  return (
    <>
      <Container
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          alignItems: "center",
        }}
      >
        <Row style={{ padding: "5rem" }}>
          <Col lg={6}>
            <img src={image} alt="skmke" style={{ width: "450px" }} />
          </Col>
          <Col lg={6}>
            <SigninForm />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SigninPage;
