import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { CounterContext } from "./Context"
import SendForm from "./SendForm";
import UserMessages from "./UserMessages";

const HomePage = () => {
    const [listOfUsers, setListOfUsers] = useState([]);
    const [loggedUser, setLoggedUser] = useState({});
    const [loggedUserMessages, setLoggedUserMessages] = useState([]);
    const [counter, setCounter] = useState(1);
    const { authState, setAuthState } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem("accessToken")) navigate("/login");

        Axios.get("https://task-5-backend.herokuapp.com/auth", {
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
        Axios.get(`https://task-5-backend.herokuapp.com/users/${authState.id}`).then((res) => {
            setLoggedUser(res.data);
            setLoggedUserMessages(res.data.messages);
        })
    },[authState, counter]);

    useEffect(() => {
        Axios.get("https://task-5-backend.herokuapp.com/users").then((res) => {
            const usersEmail = res.data.map((el) => {
                return el.email
            });
            setListOfUsers(usersEmail);
        })
    }, []);

    return (
        <CounterContext.Provider value={setCounter}>
            <div className="w-100">
                <div className="d-flex justify-content-between mb-3">
                    <h1>{loggedUser.email}</h1>
                    <Button onClick={handleLogout} variant="secondary" className="pt-0 pb-0">Log out</Button>
                </div>
                <SendForm listOfUsers={listOfUsers} loggedUser={loggedUser} />
                <UserMessages loggedUserMessages={loggedUserMessages} />
            </div>
        </CounterContext.Provider>
        
    )
}

export default HomePage;
