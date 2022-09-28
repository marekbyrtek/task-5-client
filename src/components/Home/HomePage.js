import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import SendForm from "./SendForm";

const HomePage = () => {
    const [listOfUsers, setListOfUsers] = useState([]);
    const [loggedUser, setLoggedUser] = useState({});
    const { authState, setAuthState } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem("accessToken")) navigate("/login");

        Axios.get("http://localhost:3001/auth", {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        })
        .then((response) => {
            if (response.data.error) {
                setAuthState({ ...authState, status: false });
            } else {
                setAuthState({
                    email: response.data.user.email,
                    id: response.data.user.id,
                    status: true
                });
            }
        })
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("accessToken");
        setAuthState({
            email: "",
            id: 0,
            status: false
        });
        navigate("/login");
    }

    useEffect(() => {
        Axios.get(`http://localhost:3001/users/${authState.id}`).then((res) => {
            setLoggedUser(res.data);
        })
    },[authState]);

    useEffect(() => {
        Axios.get("http://localhost:3001/users").then((res) => {
            const usersEmail = res.data.map((el) => {
                return el.email
            });
            setListOfUsers(usersEmail);
        })
    }, []);

    return (
        <div>
            <Alert variant="danger">{loggedUser.email}</Alert>
            <SendForm listOfUsers={listOfUsers} loggedUser={loggedUser} />
            <Button onClick={handleLogout} variant="outline-primary" style={{marginLeft: "auto"}}>Log out</Button>
        </div>
    )
}

export default HomePage;
