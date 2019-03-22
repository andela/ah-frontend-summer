import React from 'react';
import PropTypes from 'prop-types';
import { Container, Divider, Grid, Header } from 'semantic-ui-react';
import TagCard from './TagCard';
import '../../styles/tags.scss';

const TagsList = (props) => {
    const {
        tags,
    } = props;
    return(
        <Container>
            <div className="article-list">
                <Header color="teal" as="h1">
                    Tags
                </Header>
                
                <Grid stackable divided="vertically">
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <Divider />
                            <div className="tags-container">
                                {tags.map(tag => (
                                    <TagCard
                                        key={tag}
                                        tag={tag}
                                    />
                                ))}
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        </Container>
    );
};

TagsList.propTypes = {
    tags: PropTypes.array.isRequired,
};

export default TagsList;
