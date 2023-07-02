import styled from "styled-components";
import { Container } from "react-bootstrap";
import ModalComponent from "../Modal/Modal";

const HeroComponent = styled.header`
    padding: 4rem 15rem;
    height: 65vh;
    background-image: url("https://images.unsplash.com/photo-1687622960862-af0ddb7590ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8Ym84alFLVGFFMFl8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=60");
    background-size: cover;
    background-position: center;
`;

const HeaderContainer = styled.div`
    background-color: rgb(5, 148, 112);
    padding: 2rem;
    color: white;
    width: 18rem;
`;

const Heading = styled.h1`
    font-size: 2rem;
`;

const SubHeading = styled.h3`
    font-size: 1rem;
    margin: 1rem 0;
    font-weight: 400;
`;

const Hero = () => {
    return <HeroComponent>
        <Container>
            <HeaderContainer>
                <Heading>Nurture your intellect with excellence</Heading>
                <SubHeading>
                    Expand your horizons, acquire knowledge, and unlock your full potential by delving into compelling articles penned by esteemed thought leaders.
                </SubHeading>
                <ModalComponent 
                    text="SignUp"
                    variant="primary"
                    isSignUpFlow={true}
                />
                <ModalComponent 
                    text="Login"
                    variant="danger"
                    isSignUpFlow={false}
                />
            </HeaderContainer>
        </Container>
    </HeroComponent>;
};

export default Hero;