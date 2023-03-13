import React, { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Dropzone from "./Dropzone";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/features/authSlice";
import FormData from "form-data";
import { Formik } from "formik";
import * as yup from "yup";

const signupSchema = yup.object().shape({
  name: yup.string().required("required"),
  surname: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  address: yup.string().required("required"),
  contact: yup.number().required("required"),
  image: yup.string().required("required"),
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
  contact: 1,
  image: "",
};

const initialValuesSignin = {
  email: "",
  password: "",
};

const SigninForm = () => {
  const [pageType, setPageType] = useState("signin");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSignin = pageType === "signin";
  const isSignup = pageType === "signup";

  const signup = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("imagePath", values.image.name);

    const savedUserResponse = await fetch("http://localhost:3001/auth/signup", {
      method: "POST",
      body: formData,
    });
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("signin");
    }
  };

  const signin = async (values, onSubmitProps) => {
    const signedInResponse = await fetch("http://localhost:3001/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const signedIn = await signedInResponse.json();
    onSubmitProps.resetForm();
    if (signedIn) {
      dispatch(
        setCredentials({
          user: signedIn.user,
          token: signedIn.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isSignin) await signin(values, onSubmitProps);
    if (isSignup) await signup(values, onSubmitProps);
  };

  return (
    <>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={isSignin ? initialValuesSignin : initialValuesSignup}
        validationSchema={isSignin ? signinSchema : signupSchema}
      >
        {(formik) => {
          const {
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            handleBlur,
            setFieldValue,
          } = formik;
          return (
            <>
              <Form onSubmit={handleSubmit} style={{ width: "500px" }}>
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
                              type="text"
                              name="name"
                              value={values.name}
                              onChange={handleChange}
                              placeholder="Password"
                              onBlur={handleBlur}
                              className={
                                errors.name && touched.name
                                  ? "input-error"
                                  : null
                              }
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group className="mb-1">
                          <Form.Label column sm="2">
                            Contact
                          </Form.Label>
                          <Col>
                            <Form.Control
                              type="text"
                              name="contact"
                              value={values.contact}
                              onChange={handleChange}
                              placeholder="Contact"
                              onBlur={handleBlur}
                              className={
                                errors.contact && touched.contact
                                  ? "input-error"
                                  : null
                              }
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
                              type="text"
                              name="surname"
                              value={values.surname}
                              onChange={handleChange}
                              placeholder="Surname"
                              onBlur={handleBlur}
                              className={
                                errors.surname && touched.surname
                                  ? "input-error"
                                  : null
                              }
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group className="mb-1">
                          <Form.Label column sm="2">
                            Address
                          </Form.Label>
                          <Col>
                            <Form.Control
                              type="text"
                              name="address"
                              value={values.address}
                              onChange={handleChange}
                              placeholder="Address"
                              onBlur={handleBlur}
                              className={
                                errors.address && touched.address
                                  ? "input-error"
                                  : null
                              }
                            />
                          </Col>
                        </Form.Group>
                      </Col>
                    </Row>
                    {/* <Form.Group controlId="formFileLg" className="mb-1">
                      <Form.Label column>Add Profile Image</Form.Label>
                      <Container
                        style={{
                          border: "1.5px dashed gray",
                          borderRadius: "10px",
                          textAlign: "center",
                          height: "70px",
                          width: "100%",
                          margin: "auto",
                        }}
                        onDrop={(acceptedFiles) =>
                          setFieldValue("picture", acceptedFiles[0])
                        }
                      >
                        <Dropzone
                          name="image"
                          value={values.image}
                          onChange={handleChange}
                          placeholder="Image"
                          onBlur={handleBlur}
                        />
                      </Container>
                    </Form.Group> */}
                  </>
                )}
                <Form.Group className="mb-1">
                  <Form.Label column sm="2">
                    Email
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      placeholder="Email"
                      onBlur={handleBlur}
                      className={
                        errors.email && touched.email ? "input-error" : null
                      }
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
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      placeholder="Password"
                      onBlur={handleBlur}
                      className={
                        errors.password && touched.password
                          ? "input-error"
                          : null
                      }
                    />
                  </Col>
                </Form.Group>

                <Button
                  type="submit"
                  variant="info"
                  style={{
                    width: "10rem",
                    marginTop: "1.5rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  Submit
                </Button>
                <p onClick={() => setPageType(isSignin ? "signup" : "signin")}>
                  {isSignin
                    ? "Don't have an account? Sign Up here."
                    : "Already have an account? Sign In here."}
                </p>
              </Form>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default SigninForm;
