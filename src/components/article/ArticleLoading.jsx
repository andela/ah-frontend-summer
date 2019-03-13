import {Card, Container, Grid, Header, Image, Placeholder} from 'semantic-ui-react';
import React from 'react';
import Thumbnail from '../../assets/images/thumbnail.jpg';

const ArticleLoading = () => {
    return (
        <Container>
            <Card fluid className="article-card">
                <Grid columns={2} stackable>
                    <Grid.Row stretched>
                        <Grid.Column width={6}>
                            <Image id="article-loading-image" src={Thumbnail} />
                        </Grid.Column>
                        <Grid.Column verticalAlign="middle" width={10}>
                            <Container>
                                <Placeholder fluid>
                                    <Placeholder.Header>
                                        <Placeholder.Line />
                                        <Placeholder.Line />
                                        <Placeholder.Line />
                                        <Placeholder.Line />
                                        <Placeholder.Line />
                                    </Placeholder.Header>
                                </Placeholder>
                            </Container>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Card>
        </Container>
    );
};

export default ArticleLoading;
