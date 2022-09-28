import Axios from "axios";
import React, { useRef, useState } from "react";
import { Form, Button, Alert, Card } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";

const SendForm = ({ listOfUsers, loggedUser }) => {
    // const emailRef = useRef();
    const titleRef = useRef();
    const contentRef = useRef();
    const [emailRef, setEmailRef] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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
                    <Form.Group id="RecipientEmail">
                        <Typeahead id="typeahea" type="email" onChange={setEmailRef} selected={emailRef} options={listOfUsers} placeholder="Recipient email" required />
                    </Form.Group>
                    <Form.Group id="title">
                        <Form.Control type="text" ref={titleRef} placeholder="Title" required />
                    </Form.Group>
                    <Form.Group id="content">
                        <Form.Control as="textarea" rows={3} ref={contentRef} placeholder="Your message" required />
                    </Form.Group>
                    <Button disabled={loading} variant="outline-primary" type="submit">Send message</Button>
                </Form>
            </Card.Body>
        </Card>
        
    )
}

export default SendForm;
