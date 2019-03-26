import React from 'react';
import { connect } from 'react-redux';
import {
    Container,
    Segment,
    Form,
    Button,
    Radio,
    GridColumn,
    GridRow,
    Grid
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const ReportArticle = props => {
    const { onSubmitHandler, onChangeHandler, slug, reason, loading } = props;
    const content = (
        <GridColumn width={8}>
            <Form onSubmit={onSubmitHandler}>
                <h3>Report Article</h3>
                <Form.Field>
                    <Radio
                        label='Spam'
                        name='spam'
                        value='spam'
                        checked={reason === 'spam'}
                        onChange={onChangeHandler}
                    />
                </Form.Field>
                <Form.Field>
                    <Radio
                        label='Harassment'
                        name='harassment'
                        value='harassment'
                        checked={reason === 'harassment'}
                        onChange={onChangeHandler}
                    />
                </Form.Field>
                <Form.Field>
                    <Radio
                        label='Rules Violation'
                        name='rules violation'
                        value='rules violation'
                        checked={reason === 'rules violation'}
                        onChange={onChangeHandler}
                    />
                </Form.Field>
                <Button basic color='teal' type='submit' loading={loading}>
                    Report
                </Button>
                <Link to={`/articles/${slug}`}>
                    <Button basic>Cancel</Button>
                </Link>
            </Form>
        </GridColumn>
    );

    return (
        <Container>
            <Grid>
                <GridRow>
                    <GridColumn width={4}></GridColumn>
                    <GridColumn width={8}>
                        <Segment padded='very' color='teal'>
                            <Grid>
                                <GridRow>
                                    <GridColumn width={4}></GridColumn>
                                    {content}
                                    <GridColumn width={4}></GridColumn>
                                </GridRow>
                            </Grid>
                        </Segment>
                    </GridColumn>
                    <GridColumn width={4}></GridColumn>
                </GridRow>
            </Grid>
        </Container>
    );
};

ReportArticle.propTypes = {
    onSubmitHandler: PropTypes.func.isRequired,
    onChangeHandler: PropTypes.func.isRequired,
    slug: PropTypes.string.isRequired,
    reason: PropTypes.string.isRequired
};

const mapStateToProps = state => {
    return {
        loading: state.reportArticle.loading
    };
};

export default connect(mapStateToProps)(ReportArticle);
