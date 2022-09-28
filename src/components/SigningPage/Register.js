import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

const Register = () => {
    const emailRef = useRef();
    const [error, setError] = useState("");
    const [loading, setLoadnig] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: emailRef.current.value
        };
        setError("");
        setLoadnig(true);
        Axios.post("http://localhost:3001/register", data)
            .then(() => {
                navigate("/login");
            })
            .catch((err) => {
                setError(err.response.data.message);
                console.log(err)
            })
        setLoadnig(false);
    };

    return (
        <div className="w-100" style={{ maxWidth: "400px" }}>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Button disabled={loading} variant="outline-primary" className="w-100" type="submit">
                            Register
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account <Link to="/login">Sign in</Link>
            </div>
        </div>
    )
}

export default Register;
