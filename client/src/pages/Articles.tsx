import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

interface ArticleType {
    id: string;
    title: string;
    imageUrl: string;
    content: string;
}

const CardsContainer = styled.div`
    padding: 2rem;
    display: flex;
`;

const Card = styled.div`
    height: 32rem;
    width: 25%;
    box-shadow: 0.1rem 0.1rem 0.8rem rgba(0, 0, 0, 0.2);
    padding: 1rem;
    border-radius: 1rem;
    margin-right: 2rem;
`;

const Image = styled.img`
    width: 100%;
    height: 15rem;
    border-radius: 1rem;
    margin-bottom: 1rem;
`;

const Header = styled.h2`
    margin-top: 0.5rem;
    font-size: 1rem;
`;

const NoArticlesContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 20rem 0;
    flex-direction: column;

    & a {
        font-size: 1rem;
        text-decoration: none;
    }
`;

const ErrorHeader = styled.h2`
    font-size: 1.5rem;
`;

const Content = styled.p`
    font-size: 0.8rem;
`;

const Articles = () => {
    const [articles, setArticles] = useState<ArticleType[]>([]);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        const { data: response } = await axios.get("http://localhost:8080/articles");
        setArticles(response);
    }

    return <Container>
        {articles.length ? (
            <CardsContainer>
                {articles.map(article => (
                    <Card key={article.id}>
                        <Image src={article.imageUrl}/>
                        <Header>{article.title}</Header>
                        <Content>{article.content}</Content>
                    </Card>
                ))}
            </CardsContainer>
        ) : (
            <NoArticlesContainer>
                <ErrorHeader>
                    You don't have access yet !
                </ErrorHeader>
                <Link to="/article-plans">Buy a plan</Link>
            </NoArticlesContainer>
        )}
    </Container>
};

export default Articles;