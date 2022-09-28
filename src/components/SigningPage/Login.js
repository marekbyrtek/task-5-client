import React, { useState, useRef, useContext } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { AuthContext } from "../../AuthContext";

const Login = () => {
    const emailRef = useRef();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { setAuthState } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: emailRef.current.value
        };
        setError("");
        setLoading(true);
        Axios.post("http://localhost:3001/login", data)
            .then((resp) => {
                localStorage.setItem("accessToken", resp.data.token);
                setAuthState({
                    email: resp.data.user.email,
                    id: resp.data.user._id,
                    status: true
                });
                navigate("/");
            })
            .catch((err) => {
                setError(err.response.data.message);
                console.log(err);
            })
        setLoading(false);
    }

    return (
        <div className="w-100" style={{ maxWidth: "400px" }}>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign in</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Button disabled={loading} variant="outline-primary" className="w-100" type="submit">
                            Sign in
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Sign up <Link to="/register">Register</Link>
            </div>
        </div>
    )
}

export default Login;
