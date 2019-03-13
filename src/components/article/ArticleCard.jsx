import React from 'react';
import {Card, Container, Grid, Header, Image} from "semantic-ui-react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import Thumbnail from "../../assets/images/thumbnail.jpg";

const ArticleCard = (props) => {
    const { article } = props;
    let name = article.author.first_name + " " + article.author.last_name;
    name = article.author.first_name && article.author.last_name ? name : article.author.username;
    const created_at = article.created_at.substr(0, article.created_at.indexOf('T'));
    return (
        <Link className="black" to={"/articles/" + article.slug}>
            <Card fluid className="article-card">
                <Grid columns={2} stackable>
                    <Grid.Row stretched>
                        <Grid.Column width={6}>
                            {article.image ?
                                <Image className="article-thumbnail" size="medium" src={article.image} /> :
                                <Image className="article-thumbnail" size="medium" src={Thumbnail} />
                            }
                        </Grid.Column>
                        <Grid.Column verticalAlign="middle" width={10}>
                            <Container>
                                <Grid stackable>
                                    <Grid.Row>
                                        <Grid.Column width={5}>
                                            {created_at}
                                        </Grid.Column>
                                        <Grid.Column width={5}>
                                            {article.read_time}
                                        </Grid.Column>
                                        <Grid.Column id="article-author-name" width={5}>
                                            {name}
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <Header className="article-header" as="h2">
                                                {article.title}
                                            </Header>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row fluid>
                                        <Grid.Column>
                                            {article.description}
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Container>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Card>
        </Link>
    );
};

ArticleCard.propTypes = {
    article: PropTypes.object.isRequired
};

export default ArticleCard;
