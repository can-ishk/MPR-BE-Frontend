import React, { useState, useEffect, useCallback } from "react";
import "./Login.css";
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard, 
    MDBCardBody,
    MDBInput,
    MDBIcon,
} from "mdb-react-ui-kit";

function Login2() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [listening, setListening] = useState(false);

   const startListening = useCallback(() => {
        if (window.SpeechRecognition) {
            const recognition = new window.SpeechRecognition();
            recognition.continuous = false;

            recognition.onstart = () => {
                setListening(true);
            };

            recognition.onend = () => {
                setListening(false);
            };

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                if (email && listening) {
                    setEmail(email + " " + transcript);
                } else if (password && listening) {
                    setPassword(password + " " + transcript);
                }
            };

            recognition.onerror = (error) => {
                console.error("Speech recognition error: ", error);
            };

            recognition.lang = "en-US"; // Set the desired language here

            const startListening = () => {
                if (!listening) {
                    recognition.start();
                }
            };

            return () => {
                recognition.stop();
            };
        }
    }, [email, password, listening]);

    return (
        <MDBContainer fluid className="p-4">
            <MDBRow>
                <MDBCol
                    md="6"
                    className="text-center text-md-start d-flex flex-column justify-content-center"
                >
                    <h1 className="my-5 display-3 fw-bold ls-tight px-3">
                        The best offer <br />
                        <span className="text-primary">for your business</span>
                    </h1>

                    <p
                        className="px-3"
                        style={{ color: "hsl(217, 10%, 50.8%)" }}
                    >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eveniet, itaque accusantium odio, soluta, corrupti
                        aliquam quibusdam tempora at cupiditate quis eum maiores
                        libero veritatis? Dicta facilis sint aliquid ipsum
                        atque?
                    </p>
                </MDBCol>

                <MDBCol md="6">
                    <MDBCard className="my-5">
                        <MDBCardBody className="p-5">
                            <MDBRow>
                            <MDBCol col="12">
                                <div classname="position-relative">
                            <MDBInput
                                wrapperClass="mb-4"
                                label="Email"
                                id="form1"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {window.SpeechRecognition && (
                                <MDBIcon
                                icon="microphone"
                                className="position-absolute top-50 end-0 translate-middle-y"
                                onClick={startListening}
                                style={{ cursor: "pointer", color: "#007bff" }}
                            />
                            )}
                            </div>
                            </MDBCol>
                            </MDBRow>

                            <MDBInput
                                wrapperClass="mb-4"
                                label="Password"
                                id="form1"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {window.SpeechRecognition && (
                                <MDBIcon
                                    icon="microphone"
                                    size="lg"
                                    onClick={startListening}
                                    className={`microphone-icon ${
                                        listening ? "active" : ""
                                    }`}
                                />
                            )}

                            <MDBBtn className="w-100 mb-4" size="md">
                                Login
                            </MDBBtn>

                            <div className="text-center">
                                <p>or sign up with:</p>

                                <MDBBtn
                                    tag="a"
                                    color="none"
                                    className="mx-3"
                                    style={{ color: "#1266f1" }}
                                >
                                    <MDBIcon fab icon="facebook-f" size="sm" />
                                </MDBBtn>

                                <MDBBtn
                                    tag="a"
                                    color="none"
                                    className="mx-3"
                                    style={{ color: "#1266f1" }}
                                >
                                    <MDBIcon fab icon="twitter" size="sm" />
                                </MDBBtn>

                                <MDBBtn
                                    tag="a"
                                    color="none"
                                    className="mx-3"
                                    style={{ color: "#1266f1" }}
                                >
                                    <MDBIcon fab icon="google" size="sm" />
                                </MDBBtn>

                                <MDBBtn
                                    tag="a"
                                    color="none"
                                    className="mx-3"
                                    style={{ color: "#1266f1" }}
                                >
                                    <MDBIcon fab icon="github" size="sm" />
                                </MDBBtn>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Login2;