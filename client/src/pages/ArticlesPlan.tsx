import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Button } from "react-bootstrap";
import styled from "styled-components";

const CardsContainer = styled.div`
    display: flex;
    height: 75vh;
    align-items: center;
    justify-content: center;
`;

const CardHeader = styled.div`
    height: 10rem;
    background-color: blue;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const PriceCircle = styled.div`
    border: 0.2rem solid white;
    width: 7rem;
    height: 7rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0.1rem 0.1rem 0.8rem rgba(19, 20, 19, 0.342);
`;

const PriceText = styled.p`
    font-size: 1.5rem;
    color: white;
    text-shadow: 0.1rem 0.1rem 0.8rem rgba(19, 20, 19, 0.342);
`;

const ArticlesPlan = () => {
    const [prices, setPrices] = useState<any>([]);

    useEffect(() => {
        fetchPrices();
    }, []);

    const fetchPrices = async () => {
        const {data: response} = await axios.get("http://localhost:8080/subs/prices");
        setPrices(response.data);
    };

    const createSession = async (priceId: string) => {
        const { data: response } = await axios.post("http://localhost:8080/subs/session", {priceId});

        window.location.href = response.url;
    }

    const backgroundColors: any = {
        Basic: "rgb(204, 204, 0)",
        Standard: "rgb(204, 102, 0, 0.835)",
        Premium: "rgb(255, 51, 153)"
    };

    return <Container>
        <CardsContainer>
            {prices.map((price: any) => {
                return (
                    <Card style={{width: "9rem", marginRight: "1rem"}}>
                        <CardHeader 
                            style={{backgroundColor: backgroundColors[price.nickname]}}
                        >
                            <PriceCircle>
                                <PriceText>Rs.{price.unit_amount / 100}</PriceText>
                            </PriceCircle>
                        </CardHeader>
                        <Card.Body>
                            <Card.Title>{price.nickname}</Card.Title>
                            <Button variant="outline-dark" size="sm" className="mt-2" onClick={() => createSession(price.id)}>Buy Now</Button>
                        </Card.Body>
                    </Card>
                )
            })}
        </CardsContainer>
    </Container>
};

export default ArticlesPlan;