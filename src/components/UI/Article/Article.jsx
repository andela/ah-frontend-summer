import React from 'react';
import { 
    Container, 
    Button, 
    Header, 
    Image, 
    Icon, 
    Popup, 
    Grid 
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html';
import TagCard from '../../tags/TagCard';

import '../../../assets/styles/Article.scss';
import BookmarkContainer from "../../../containers/Articles/Article/Bookmark";

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
        email,
        tags,
        handleOnClick,
        likes,
        dislikes,
        likeArticle,
        userLikesArticle,
        userDislikesArticle,
        dislikeArticle,
        hasReported,
    } = props;
    const renderedBody = renderHTML(body);
    const defautImage = 'https://images.pexels.com/photos/1591057/pexels-photo-1591057.jpeg?cs=srgb&dl=buttons-characters-concept-1591057.jpg&fm=jpg';
    const isLoggedIn = localStorage.getItem('token');

    const reportBtn = hasReported || isAuthor ? null : (
        <Popup 
            trigger={
                <Link to={`/articles/${slug}/report`}>
                    <Icon size="large" name="flag" />
                </Link>
            }
            content="Report"
        /> 
    );

    return ( 
        <div>
            <Container>
                <Header as="h1" padded="very">
                    {title}
                </Header>
            </Container>
            <Container>
                {author}
                <Container>
                    {dateCreated} 
                    {' '}
                    <p>{readTime}</p>
                </Container>
            </Container>

            <div className="actionButtons">
                <Container textAlign="right">
                    <BookmarkContainer slug={slug} />
                    { isAuthor ? (
                        <span>
                            <Button
                                color="red"
                                basic
                                onClick={deleteArticle}>
                                Delete
                            </Button>
                            <Link className="article-card-title" to={`/articles/update/${slug}`}>
                                <Button color="teal" basic loading={loading}>Update</Button>
                            </Link>
                        </span>
                    ): null
                    }
                </Container>
            </div>
            <Container textAlign="justified">
                <Image src={image ? image : defautImage} />
                <div className="ArticleBody">
                    {renderedBody}
                    <Container>
                        {tags.map(tag => (
                            <TagCard
                                key={tag.index}
                                tag={tag}
                                onClick={handleOnClick}
                            />
                        ))}
                    </Container>
                </div>
                <Grid columns={3} stackable>
                    <Grid.Column>
                        <Container textAlign='left'>
                            <button
                                className="LikeDislikeButton"
                                onClick={likeArticle}>
                                { userLikesArticle ?  
                                    <Icon size='large' name='thumbs up' color='teal'/>
                                    : <Icon size='large' name='thumbs up outline'/>
                                }
                                
                            </button> <span>{likes}</span>
                            <button
                                className="LikeDislikeButton"
                                onClick={dislikeArticle}>
                                { userDislikesArticle ?  
                                    <Icon size='large' name='thumbs down' color='teal'/>
                                    : <Icon size='large' name='thumbs down outline'/>
                                }
                            </button>
                            <span>{dislikes}</span>
                        </Container>
                    </Grid.Column>
                    <Grid.Column>
                        {isLoggedIn ? (
                            <Container textAlign="center">
                                <a href={facebook} className="facebook"><Icon name="facebook f" /></a>
                                <a href={twitter} className="twitter"><Icon name="twitter" /></a>
                                <a href={email} className="email"><Icon name="mail" /></a>
                            </Container>
                        ) : ""}
                    </Grid.Column>
                    <Grid.Column>
                        {reportBtn} 
                    </Grid.Column>
                </Grid>
            </Container>
        </div>
    );
};

export default article;
