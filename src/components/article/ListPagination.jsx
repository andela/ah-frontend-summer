import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination, Grid } from 'semantic-ui-react';
import '../../styles/Articles.scss';


class ListPagination extends Component {
    static currentLocalStorage = (localStorage) => {
        const initialPage = 1;
        let currentPage = localStorage.getItem('page');
        if (currentPage !== null) {
            return currentPage;
        } else {
            return currentPage = initialPage;
        }
    }
    maxPageCount = 10;
    onPageChange = (event, data) => {
        const { fetchArticles } = this.props;
        const url = 'https://ah-backend-summer-staging.herokuapp.com/api/v1/articles';
        const initialIndex = 0;
        const limit = (count, index) => 
            `limit=${count}&offset=${index ? index * count : initialIndex}`;
        const page = data.activePage;
        const startPage = 1;
        const pagination = `?${limit(this.maxPageCount, page - startPage)}`;
        fetchArticles(url + pagination);
        localStorage.setItem('page', page);
    };
    render() {
        const { articleCount } = this.props;
        const pageNumber = Math.ceil(articleCount / this.maxPageCount);
        const currentPage = ListPagination.currentLocalStorage(localStorage);
        localStorage.removeItem('page');
        return (
            <Grid>
                <Grid.Row columns={3}>
                    <Grid.Column width={3}></Grid.Column>
                    <Grid.Column width={10} textAlign="center" st>
                        <Pagination
                            boundaryRange={0}
                            activePage={currentPage}
                            ellipsisItem={null}
                            firstItem={null}
                            lastItem={null}
                            siblingRange={1}
                            totalPages={pageNumber}
                            onPageChange={this.onPageChange}
                        />
                    </Grid.Column>
                    <Grid.Column width={3}></Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

ListPagination.propTypes = {
    fetchArticles: PropTypes.func.isRequired,
    articleCount: PropTypes.number.isRequired
};

export default ListPagination;
