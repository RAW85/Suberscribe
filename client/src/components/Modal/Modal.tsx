import { Modal, Button, InputGroup, FormControl } from "react-bootstrap"
import { useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context";

interface ModalProps {
    text: string;
    variant: "primary" | "secondary" | "danger";
    isSignUpFlow: boolean;
}

const ErrorMessage = styled.p`
    color: red;
`;

const ModalComponent = ({ text, variant, isSignUpFlow }: ModalProps) => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleClose = () => {
        setShow(false);
        setEmail("");
        setPassword("");
        setErrorMsg("");
    };
    const handleShow = () => setShow(true);

    const navigate = useNavigate();

    const [state, setState] = useContext(UserContext);

    const handleClick = async () => {
        let response;
        if(isSignUpFlow) {
            const {data: signUpData} = await axios.post("http://localhost:8080/auth/signup", {
                email,
                password
            });
            response = signUpData;
        } else {
            const {data: loginData} = await axios.post("http://localhost:8080/auth/login", {
                email,
                password
            });
            response = loginData;
        }

        if(response.errors.length) {
            setErrorMsg(response.errors[0].msg)
        } else {
            setState({
                data: {
                    id: response.data.user.id,
                    email: response.data.user.email,
                    stripeCustomerId: response.data.user.stripeCustomerId
                },
                loading: false,
                error: null
            });
            localStorage.setItem("token", response.data.token);
            axios.defaults.headers.common["authorization"] = `Bearer ${response.data.token}`;
            navigate("/articles");
        }
    };

    return (
        <>
            <Button onClick={handleShow} variant={variant} style={{ marginRight: (text === "SignUp") ? "2rem" : "0", padding: "0.25rem 1rem"}}>{text}</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>{text}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Email</InputGroup.Text>
                        <FormControl
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Password</InputGroup.Text>
                        <FormControl
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </InputGroup>
                    {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleClick}>{text}</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


export default ModalComponent;