import React from 'react';
import { Container, Button, Header, Image, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html';

import '../../../assets/styles/Article.scss';

const article = (props) => {
    const {
        title,
        author,
        dateCreated,
        readTime,
        isAuthor,
        deleteArticle,
        slug,
        loading,
        image,
        body,
        facebook,
        twitter,
        email
    } = props;
    const renderedBody = renderHTML(body)
    const defautImage = 'https://images.pexels.com/photos/1591057/pexels-photo-1591057.jpeg?cs=srgb&dl=buttons-characters-concept-1591057.jpg&fm=jpg';
    const isLoggedIn = localStorage.getItem('token');

    return (
        <div>
            <Container>
                <Header as='h1' padded="very">
                    {title}
                </Header>
            </Container>
            <Container>
                {author}
                <Container>
                    {dateCreated}
                    <p>{readTime}</p>
                </Container>
            </Container>
            {isAuthor ? (
                <div className="actionButtons">
                    <Container textAlign='right'>
                        <Button
                            color="red"
                            basic
                            onClick={deleteArticle}>
                            Delete
                        </Button>
                        <Link className="article-card-title" to={`/articles/update/${slug}`}>
                            <Button color="teal" basic loading={loading}>Update</Button>
                        </Link>
                    </Container>
                </div>
            ) : null
            }
            <Container textAlign='justified'>
                <Image src={image ? image : defautImage} />
                <div className="ArticleBody">
                    {renderedBody}
                </div>
            </Container>
            {isLoggedIn ? (
                <Container textAlign="center">
                    <a href={facebook} className="facebook"><Icon name="facebook f" /></a>
                    <a href={twitter} className="twitter"><Icon name="twitter" /></a>
                    <a href={email} className="email"><Icon name="mail" /></a>
                </Container>
            ) : ""}
        </div>
    );
};

export default article;
