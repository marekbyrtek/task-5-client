import React from "react";
import { Card } from "react-bootstrap";

const UserMessages = ({ loggedUserMessages }) => {
    if (!loggedUserMessages) {
        return (
            <h1>Loading</h1>
        )
    }
    return (
        <div>
            {loggedUserMessages.map((el, i) => {
                return (
                    <Card className="mt-3" key={i + 1}>
                        <Card.Body>
                            <Card.Title>{el.from}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{el.title}</Card.Subtitle>
                            <Card.Text>{el.content}</Card.Text>
                        </Card.Body>
                    </Card>
                )
            })}
        </div>
    )
}

export default UserMessages;
