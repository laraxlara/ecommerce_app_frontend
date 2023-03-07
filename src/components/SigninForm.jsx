import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";

const signupSchema = yup.object().shape({
  name: yup.string().required("required"),
  surname: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  address: yup.string().required("required"),
  contact: yup.string().required("required"),
  image: yup.string().required("required"),
  role: yup.string().required("required"),
});

const signinSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesSignup = {
  name: "",
  surname: "",
  email: "",
  password: "",
  address: "",
  contact: "",
  image: "",
  role: "",
};

const initialValuesSignin = {
  email: "",
  password: "",
};

const SigninForm = () => {
  const [pageType, setPageType] = useState("signin");
  const navigate = useNavigate();
  const isSignin = pageType === "signin";
  const isSignup = pageType === "signup";

  const handleSubmit = async (values, onSubmitProps) => {
    navigate("/");
  };

  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        initialValues={isSignin ? initialValuesSignin : initialValuesSignup}
        validationSchema={isSignin ? signinSchema : signupSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <Form style={{ width: "500px" }}>
            {isSignup && (
              <>
                <Row>
                  <Col>
                    <Form.Group className="mb-1">
                      <Form.Label column sm="2">
                        Name
                      </Form.Label>
                      <Col>
                        <Form.Control
                          type="password"
                          value={values.name}
                          onChange={handleChange}
                          placeholder="Password"
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="mb-1">
                      <Form.Label column sm="2">
                        Contact
                      </Form.Label>
                      <Col>
                        <Form.Control
                          type="password"
                          value={values.email}
                          onChange={handleChange}
                          placeholder="Password"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-1">
                      <Form.Label column sm="2">
                        Surname
                      </Form.Label>
                      <Col>
                        <Form.Control
                          type="password"
                          value={values.surname}
                          onChange={handleChange}
                          placeholder="Password"
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="mb-1">
                      <Form.Label column sm="2">
                        Address
                      </Form.Label>
                      <Col>
                        <Form.Control
                          type="password"
                          value={values.password}
                          onChange={handleChange}
                          placeholder="Password"
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="formFileLg" className="mb-1">
                  <Form.Label column>Add Profile Image</Form.Label>
                  <Form.Control type="file" size="sm" />
                </Form.Group>
              </>
            )}
            <Form.Group className="mb-1">
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <Col>
                <Form.Control
                  type="password"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </Col>
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label column sm="2">
                Password
              </Form.Label>
              <Col>
                <Form.Control
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </Col>
            </Form.Group>

            <Button variant="info" className="my-3" style={{ width: "10rem" }}>
              Submit
            </Button>
            <p onClick={() => setPageType(isSignin ? "signup" : "signin")}>
              {isSignin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Sign In here."}
            </p>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SigninForm;
