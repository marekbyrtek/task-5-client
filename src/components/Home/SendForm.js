import Axios from "axios";
import React, { useRef, useState, useContext } from "react";
import { Form, Button, Alert, Card } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { CounterContext } from "./Context";

const SendForm = ({ listOfUsers, loggedUser }) => {
    const titleRef = useRef();
    const contentRef = useRef();
    const [emailRef, setEmailRef] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const setCounter = useContext(CounterContext);

    const handleSend = (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        const data = {
            sendEmail: loggedUser.email,
            reciveEmail: emailRef[0],
            messageTitle: titleRef.current.value,
            messageContent: contentRef.current.value
        };
        Axios.put("http://localhost:3001/sendmessage", data)
            .then(() => {
                alert("Message send");
                setEmailRef([]);
                titleRef.current.value = "";
                contentRef.current.value = "";
                setCounter((prev) => prev + 1);
            })
            .catch((err) => {
                setError(err.response.data.message);
                console.log(err)
            })
        setLoading(false);
    }

    return (
        <Card>
            <Card.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSend}>
                    <Form.Group id="RecipientEmail" className="mb-2">
                        <Typeahead id="typeahea" type="email" onChange={setEmailRef} selected={emailRef} options={listOfUsers} placeholder="Recipient email" required />
                    </Form.Group>
                    <Form.Group id="title" className="mb-2">
                        <Form.Control type="text" ref={titleRef} placeholder="Title" required />
                    </Form.Group>
                    <Form.Group id="content" className="mb-2">
                        <Form.Control as="textarea" rows={3} ref={contentRef} placeholder="Your message" required />
                    </Form.Group>
                    <Button disabled={loading} variant="outline-primary" type="submit">Send message</Button>
                </Form>
            </Card.Body>
        </Card>
        
    )
}

export default SendForm;
